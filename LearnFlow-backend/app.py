import os
import google.generativeai as genai
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


# Configure the API Key for the Google Generative AI
genai.configure(api_key=os.environ['GEMINI_API_KEY'])

# Define the model
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/generate_roadmap', methods=['POST'])
def generate_roadmap():
    data = request.get_json()
    print("Received data:", data)
    keyword = data.get('keyword')

    if not keyword:
        return jsonify({"error": "Keyword is required"}), 400

    prompt = f"""
    Generate a comprehensive learning roadmap for {keyword} in JSON format.
    Structure it with 'nodes' representing key topics and 'edges' to show relationships.

    Each node should have:
    - title: The topic name (e.g., "HTML Basics", "React Components")
    
    
    
    Ensure the output contains:
    1. Nodes: Key learning milestones from beginner to advanced levels.
    2. Edges: Define connections between nodes to represent learning flow.
    3. Format: Return the output as a valid JSON object.

    Example structure:
    {{
      nodes: [
        {{
          id: 1,
          title: "HTML Basics",
          
        }}
      ],
      edges: [
        {{source: 1, target: 2}}
      ]
    }}

    Now, generate the roadmap for: {keyword}.
    """

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response=model.generate_content(prompt)
        print("Response:", response)
        # Assuming the response has an attribute 'content'
        roadmap_data = response.text  # Access the content properly
        return jsonify(roadmap_data)
    except Exception as e:
        return jsonify({"error": "Failed to generate roadmap", "details": str(e)})


 

if __name__ == '__main__':
    app.run(debug=True)
