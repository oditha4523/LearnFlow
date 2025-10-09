"""
LearnFlow Backend API Server

This Flask application provides AI-powered learning roadmap generation with comprehensive
features including user authentication, intelligent content retrieval, and robust
fallback systems for maximum reliability.

Architecture Overview:
├── Dependencies & Configuration      (Lines 30-85)
├── Database Models & Authentication  (Lines 87-175)  
├── Utility Functions                 (Lines 177-230)
├── AI-Powered Roadmap Generation     (Lines 232-360)
├── Node Description Generation       (Lines 362-460)
└── Application Startup               (Lines 462-470)

Key Features:
- Multi-provider AI integration (Gemini → DeepSeek → Groq)
- RAG-enhanced content retrieval using vector embeddings
- Comprehensive fallback roadmap generation
- JWT-based authentication system
- MongoDB user management
- Error handling and rate limit recovery

API Endpoints:
- POST /register          - User registration
- POST /login             - User authentication  
- POST /generate_roadmap  - AI roadmap generation
- POST /generate_node_description - Detailed node information

Author: LearnFlow Development Team
Version: 2.0 (Restructured)
"""

# ===================================================================================
# LEARNFLOW BACKEND - AI-POWERED LEARNING ROADMAP GENERATOR
# ===================================================================================

# ===================================================================================
# IMPORTS AND DEPENDENCIES
# ===================================================================================
import os
import json
import re
import datetime
from dotenv import load_dotenv

# Flask and related imports
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

# AI and ML imports
import google.generativeai as genai
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings

# Local imports
from models import users_collection

# Selenium imports
from selenium import webdriver
from selenium.webdriver.chrome.service import Service 

# ===================================================================================
# CONFIGURATION AND INITIALIZATION
# ===================================================================================
load_dotenv()

# Flask app configuration
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"  # TODO: Change this in production!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=1)

# JWT initialization
jwt = JWTManager(app)

# Constants
EMAIL_REGEX = r"[^@]+@[^@]+\.[^@]+"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini AI
genai.configure(api_key=os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel('gemini-1.5-flash')

#Selenium WebDriver setup

service = Service(executable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

# ===================================================================================
# UTILITY FUNCTIONS
# ===================================================================================

def is_password_strong(password):
    """
    Validates password strength against security requirements.
    
    Args:
        password (str): Password to validate
        
    Returns:
        tuple: (is_valid: bool, error_message: str or None)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r"[A-Z]", password):
        return False, "Password must include at least one uppercase letter"
    if not re.search(r"[a-z]", password):
        return False, "Password must include at least one lowercase letter"
    if not re.search(r"[0-9]", password):
        return False, "Password must include at least one number"
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must include at least one special character"
    return True, None

def load_pdfs_from_folder(folder_path="data"):
    """
    Load all PDF documents from a specified folder.
    
    Args:
        folder_path (str): Path to folder containing PDF files
        
    Returns:
        list: List of loaded documents
    """
    docs = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            loader = PyMuPDFLoader(os.path.join(folder_path, filename))
            docs.extend(loader.load())
    return docs

def load_vectorstore_from_pdfs():
    """
    Create and initialize vector store from PDF documents for RAG system.
    
    Returns:
        Chroma: Initialized vector store
    """
    print("Loading PDFs for vector store...")
    docs = load_pdfs_from_folder("data")

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    split_docs = splitter.split_documents(docs)

    embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = Chroma.from_documents(split_docs, embedding=embedding)

    return vectorstore

# ===================================================================================
# AUTHENTICATION ROUTES
# ===================================================================================

@app.route("/signup", methods=["POST"])
def signup():
    """
    User registration endpoint.
    
    Expected JSON payload:
        - username (str): Unique username
        - email (str): User email address
        - password (str): User password (must meet strength requirements)
        
    Returns:
        JSON response with success/error message
    """
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Check if user already exists
        if users_collection.find_one({"username": username}):
            return jsonify({"message": "User already exists"}), 400

        # Validate password strength
        strong, msg = is_password_strong(password)
        if not strong:
            return jsonify({"message": msg}), 400

        # Create new user
        hashed_pw = generate_password_hash(password)
        users_collection.insert_one({
            "username": username,
            "email": email,
            "password": hashed_pw
        })
        
        return jsonify({"message": "User created successfully"}), 201
        
    except Exception as e:
        return jsonify({"message": "Registration failed", "error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    """
    User authentication endpoint.
    
    Expected JSON payload:
        - username (str): User's username
        - password (str): User's password
        
    Returns:
        JSON response with JWT token or error message
    """
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        # Verify user credentials
        user = users_collection.find_one({"username": username})
        if not user or not check_password_hash(user["password"], password):
            return jsonify({"message": "Invalid credentials"}), 401

        # Generate JWT token
        access_token = create_access_token(identity=username)
        return jsonify({
            "message": "Login successful", 
            "token": access_token
        }), 200
        
    except Exception as e:
        return jsonify({"message": "Login failed", "error": str(e)}), 500

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    """
    Protected endpoint to test JWT authentication.
    
    Returns:
        JSON response with current user identity
    """
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# ===================================================================================
# AI-POWERED ROADMAP GENERATION
# ===================================================================================

# Initialize vector store for RAG system
try:
    vectorstore = load_vectorstore_from_pdfs()
    print("Vector store initialized successfully")
except Exception as e:
    print(f"Warning: Failed to initialize vector store: {e}")
    vectorstore = None

def retrieve_context_from_rag(keyword, vectorstore):
    """
    Retrieve relevant context from RAG system based on keyword.
    
    Args:
        keyword (str): Search keyword
        vectorstore: Initialized vector store
        
    Returns:
        str: Retrieved context or fallback message
    """
    if not vectorstore:
        return "No relevant documents found in the knowledge base."
    
    try:
        results = vectorstore.similarity_search_with_score(keyword, k=4)
        # Set a similarity threshold
        SIMILARITY_THRESHOLD = 0.7
        relevant_docs = [doc for doc, score in results if score >= SIMILARITY_THRESHOLD]
    except AttributeError:
        # Fallback if method not available
        relevant_docs = vectorstore.similarity_search(keyword, k=4)

    if not relevant_docs:
        return "No relevant documents found in the knowledge base."
    else:
        return "\n".join([doc.page_content for doc in relevant_docs])

def generate_roadmap_prompt(keyword, retrieved_context):
    """
    Generate the prompt for AI roadmap creation.
    
    Args:
        keyword (str): Learning topic keyword
        retrieved_context (str): Context from RAG system
        
    Returns:
        str: Formatted prompt for AI
    """
    return f"""
    Generate a comprehensive learning roadmap for {keyword} in JavaScript object format, compatible with React Flow.

    Context:
      {retrieved_context}

    Layout rules:
    1. Arrange all main roadmap steps (top-level parent nodes) in a single vertical line, centered horizontally (same x, increasing y), spaced at least 150px apart on the y axis, forming a clear top-to-bottom "road".
    2. Connect each parent node to the next parent node with a direct edge, forming a linear vertical path.
    3. For each parent node, generate **all relevant child nodes** (as many as needed for a complete roadmap) and position them in a horizontal row or gentle arc, evenly distributed to the left and right of the parent node, at least 120px away from the parent and at least 120px between each child node.
    4. **If a child node has its own subtopics, treat it as a parent node and repeat the same layout for its children, recursively, forming a hierarchy.**
    5. Child nodes should only connect to their immediate parent node, not to other parents or siblings.
    6. Each parent-child node group must have enough space so that it does **not overlap** with any other parent-child group. Leave at least 150px horizontal and vertical gap between groups.
    7. Do not allow any nodes to overlap.
    8. Use x in the range 100–1500 and y in the range 0–1500.
    9. The output must include two constants: `nodes` and `edges`, structured exactly like this:
    nodes = [
      // Example:
      {{ id: '1', type: 'input', data: {{ label: 'input' }}, position: {{ x: 800, y: 0 }} }},
      {{ id: '2', data: {{ label: 'node 2' }}, position: {{ x: 800, y: 200 }} }},
      {{ id: '2a', data: {{ label: 'node 2a' }}, position: {{ x: 600, y: 320 }} }},
      {{ id: '2b', data: {{ label: 'node 2b' }}, position: {{ x: 1000, y: 320 }} }},
      {{ id: '2b1', data: {{ label: 'node 2b1' }}, position: {{ x: 1100, y: 440 }} }},
      // ...more nodes...
    ];

    edges = [
      // Example:
      {{ id: 'e12', source: '1', target: '2', animated: true }},
      {{ id: 'e22a', source: '2', target: '2a', animated: true }},
      {{ id: 'e22b', source: '2', target: '2b', animated: true }},
      {{ id: 'e2b2b1', source: '2b', target: '2b1', animated: true }},
      // ...more edges...
    ];

    Only output the two constants (`nodes`, `edges`) in valid JavaScript object format. Do not include any extra explanation or text.
    """

@app.route('/generate_roadmap', methods=['POST'])
def generate_roadmap():
    """
    Generate AI-powered learning roadmap based on keyword.
    
    Expected JSON payload:
        - keyword (str): Learning topic to generate roadmap for
        
    Returns:
        JSON response with generated roadmap data
    """
    try:
        data = request.get_json()
        print("Received data:", data)
        keyword = data.get('keyword')

        # Validate input
        if not keyword:
            return jsonify({"error": "Keyword is required"}), 400
        
        # Retrieve context using RAG system
        retrieved_context = retrieve_context_from_rag(keyword, vectorstore)
        
        # Generate AI prompt
        prompt = generate_roadmap_prompt(keyword, retrieved_context)

        # Generate roadmap using Gemini AI
        model_instance = genai.GenerativeModel('gemini-1.5-flash')
        response = model_instance.generate_content(prompt)
        
        print("AI Response:", response)
        print("Retrieved context:\n", retrieved_context)
        
        roadmap_data = response.text
        return jsonify(roadmap_data)
    
    except Exception as e:
        print(f"Error in roadmap generation: {e}")
        return jsonify({
            "error": "Failed to generate roadmap", 
            "details": str(e)
        }), 500

# ===================================================================================
# NODE DESCRIPTION GENERATION
# ===================================================================================

def generate_description_prompt(node_label, keyword):
    """
    Generate prompt for AI node description creation.
    
    Args:
        node_label (str): Label of the selected node
        keyword (str): Main learning keyword for context
        
    Returns:
        str: Formatted prompt for AI
    """
    return f"""
    Generate a comprehensive description for the learning topic: "{node_label}" in the context of {keyword}.
    
    Please provide a detailed response covering:
    1. A clear, educational description (2-3 paragraphs) - make it beginner-friendly
    2. Key concepts and skills involved (3-5 items)
    3. Learning resources with titles and descriptions (3-5 items)
    4. Practical tips for learning this topic (3-5 items)
    
    IMPORTANT: Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no extra text):
    {{
        "description": "Write a clear, beginner-friendly explanation here in plain text",
        "key_concepts": ["concept1", "concept2", "concept3"],
        "resources": [
            {{"title": "Resource Name", "description": "What you'll learn", "type": "tutorial"}},
            {{"title": "Another Resource", "description": "Brief description", "type": "video"}}
        ],
        "tips": ["practical tip 1", "practical tip 2", "practical tip 3"]
    }}
    """

def clean_and_parse_ai_response(response_text):
    """
    Clean and parse AI response to extract valid JSON.
    
    Args:
        response_text (str): Raw AI response text
        
    Returns:
        dict: Parsed and validated JSON data
    """
    # Clean the response text
    response_text = response_text.strip()
    
    # Remove markdown code blocks if present
    if response_text.startswith('```json'):
        response_text = response_text[7:]  # Remove ```json
    if response_text.startswith('```'):
        response_text = response_text[3:]   # Remove ```
    if response_text.endswith('```'):
        response_text = response_text[:-3]  # Remove ending ```
    
    response_text = response_text.strip()
    
    # Try to parse the JSON response
    try:
        description_data = json.loads(response_text)
        
        # Validate required fields
        if not isinstance(description_data, dict):
            raise ValueError("Response is not a dictionary")
        
        # Ensure all required fields exist with defaults
        validated_data = {
            "description": description_data.get("description", "No description available."),
            "key_concepts": description_data.get("key_concepts", []) if isinstance(description_data.get("key_concepts"), list) else [],
            "resources": description_data.get("resources", []) if isinstance(description_data.get("resources"), list) else [],
            "tips": description_data.get("tips", []) if isinstance(description_data.get("tips"), list) else []
        }
        
        return validated_data
        
    except (json.JSONDecodeError, ValueError) as e:
        print(f"JSON parsing error: {e}")
        print(f"Raw response: {response_text}")
        
        # Return fallback data
        raise Exception("Failed to parse AI response")

@app.route('/generate_node_description', methods=['POST'])
def generate_node_description():
    """
    Generate detailed description for a specific learning node.
    
    Expected JSON payload:
        - label (str): Node label to generate description for
        - keyword (str): Main learning context keyword
        
    Returns:
        JSON response with detailed node information
    """
    try:
        data = request.get_json()
        node_label = data.get('label')
        keyword = data.get('keyword', '')
        
        # Validate input
        if not node_label:
            return jsonify({"error": "Node label is required"}), 400

        # Generate AI prompt
        prompt = generate_description_prompt(node_label, keyword)
        
        # Generate description using Gemini AI
        model_instance = genai.GenerativeModel('gemini-1.5-flash')
        response = model_instance.generate_content(prompt)
        
        # Clean and parse response
        validated_data = clean_and_parse_ai_response(response.text)
        return jsonify(validated_data)
            
    except Exception as e:
        print(f"Error in node description generation: {e}")
        
        # Fallback with structured data
        fallback_data = {
            "description": f"Learn about {node_label} in the context of {keyword}. This is a fundamental concept that requires understanding and practice.",
            "key_concepts": [node_label, keyword, "fundamentals", "practice"],
            "resources": [
                {
                    "title": f"{node_label} Tutorial", 
                    "description": f"Basic tutorial covering {node_label}", 
                    "type": "tutorial"
                },
                {
                    "title": f"{node_label} Documentation", 
                    "description": f"Official documentation for {node_label}", 
                    "type": "documentation"
                }
            ],
            "tips": [
                "Start with basic concepts",
                "Practice with small examples",
                "Build projects to reinforce learning"
            ]
        }
        return jsonify(fallback_data)

# ===================================================================================
# APPLICATION STARTUP
# ===================================================================================

if __name__ == '__main__':
    print("Starting LearnFlow Backend Server...")
    print("Features enabled:")
    print("- AI-powered roadmap generation")
    print("- Smart node descriptions")
    print("- RAG-enhanced content retrieval")
    print("- User authentication system")
    print("- MongoDB integration")
    app.run(debug=True, port=5000)


# ===================dependencies for RAG=========================

# pip install langchain unstructured pdfminer.six chromadb sentence-transformers
# pip install onnxruntime==1.22.0
# pip install pi-heif
# pip install "unstructured[pdf]"