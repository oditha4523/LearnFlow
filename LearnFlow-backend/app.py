import os
import google.generativeai as genai
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import json
import re
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import users_collection
import re
import datetime

from langchain_community.document_loaders import UnstructuredPDFLoader
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"  # Change this in production!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=1)

jwt = JWTManager(app)

EMAIL_REGEX = r"[^@]+@[^@]+\.[^@]+"

def is_password_strong(password):
    """Validates password strength."""
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

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"username": username}):
        return jsonify({"message": "User already exists"}), 400

    # Validate password strength
    strong, msg = is_password_strong(password)
    if not strong:
        return jsonify({"message": msg}), 400

    hashed_pw = generate_password_hash(password)
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw
    })
    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({"message": "Login successful", "token": access_token}), 200

@app.route("/protected", methods=["GET"])
@jwt_required()

def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel('gemini-1.5-flash')

# ================API integration and RAG system=========================

def load_pdfs_from_folder(folder_path="data"):
    docs = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            loader = PyMuPDFLoader(os.path.join(folder_path, filename))
            docs.extend(loader.load())
    return docs

def load_vectorstore_from_pdfs():
    print("Loading PDFs for vector store...")
    docs = load_pdfs_from_folder("data")

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    split_docs = splitter.split_documents(docs)

    embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = Chroma.from_documents(split_docs, embedding=embedding)

    return vectorstore

# Create the vectorstore at app startup
vectorstore = load_vectorstore_from_pdfs()


@app.route('/generate_roadmap', methods=['POST'])
def generate_roadmap():
    data = request.get_json()
    print("Received data:", data)
    keyword = data.get('keyword')

    if not keyword:
        return jsonify({"error": "Keyword is required"}), 400
    
    #  Retrieve context using RAG
    try:
        results = vectorstore.similarity_search_with_score(keyword, k=4)
        # Set a similarity threshold (tune as needed, e.g., 0.7 for cosine similarity)
        SIMILARITY_THRESHOLD = 0.7
        relevant_docs = [doc for doc, score in results if score >= SIMILARITY_THRESHOLD]
    except AttributeError:
        # Fallback if method not available
        relevant_docs = vectorstore.similarity_search(keyword, k=4)

    if not relevant_docs:
        retrieved_context = "No relevant documents found in the knowledge base."
    else:
        retrieved_context = "\n".join([doc.page_content for doc in relevant_docs])

    prompt = f"""
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

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response=model.generate_content(prompt)
        print("Response:", response)
        print("Retrieved context:\n", retrieved_context)
        roadmap_data = response.text
        return jsonify(roadmap_data)
    
    except Exception as e:
        return jsonify({"error": "Failed to generate roadmap", "details": str(e)})
    
#====================Node description generation API=========================#
@app.route('/generate_node_description', methods=['POST'])
def generate_node_description():
    try:
        data = request.get_json()
        node_label = data.get('label')
        keyword = data.get('keyword', '')
        
        if not node_label:
            return jsonify({"error": "Node label is required"}), 400

        prompt = f"""
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
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        # Clean the response text
        response_text = response.text.strip()
        
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
            import json
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
            
            return jsonify(validated_data)
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"JSON parsing error: {e}")
            print(f"Raw response: {response_text}")
            
            # Fallback with structured data
            return jsonify({
                "description": f"Learn about {node_label} in the context of {keyword}. This is a fundamental concept that requires understanding and practice.",
                "key_concepts": [node_label, keyword, "fundamentals", "practice"],
                "resources": [
                    {"title": f"{node_label} Tutorial", "description": f"Basic tutorial covering {node_label}", "type": "tutorial"},
                    {"title": f"{node_label} Documentation", "description": f"Official documentation for {node_label}", "type": "documentation"}
                ],
                "tips": [
                    "Start with basic concepts",
                    "Practice with small examples",
                    "Build projects to reinforce learning"
                ]
            })
            
    except Exception as e:
        print(f"General error: {e}")
        return jsonify({"error": "Failed to generate description", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


# ===================dependencies for RAG=========================

# pip install langchain unstructured pdfminer.six chromadb sentence-transformers
# pip install onnxruntime==1.22.0
# pip install pi-heif
# pip install "unstructured[pdf]"