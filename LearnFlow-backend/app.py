import os
import google.generativeai as genai
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import json
from werkzeug.security import generate_password_hash, check_password_hash
from models import users_collection
import re

load_dotenv()


app = Flask(__name__)
CORS(app)

EMAIL_REGEX = r"[^@]+@[^@]+\.[^@]+"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    if not re.match(EMAIL_REGEX, email):
        return jsonify({"message": "Invalid email format"}), 400

    if users_collection.find_one({"$or": [{"username": username}, {"email": email}]}):
        return jsonify({"message": "Username or email already exists"}), 400

    hashed_pw = generate_password_hash(password)
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "User created"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful"}), 200


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure the API Key for the Google Generative AI
genai.configure(api_key=os.environ['GEMINI_API_KEY'])

model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/generate_roadmap', methods=['POST'])
def generate_roadmap():
    data = request.get_json()
    print("Received data:", data)
    keyword = data.get('keyword')

    if not keyword:
        return jsonify({"error": "Keyword is required"}), 400

    prompt = f"""
      Generate a comprehensive learning roadmap for {keyword} in valid JSON format.

      Ensure the JSON strictly follows this schema:
      {{
        "nodes": [
          {{
            "id": "1",
            "title": "Start Node"
          }}
        ],
        "edges": [
          {{
            "id": "1",
            "source": "1",
            "target": "2",
            "label": "Next"
          }}
        ]
      }}

      Output only the JSON—no explanations or other content.
      """

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response=model.generate_content(prompt)
        print("Response:", response)
        # Assuming the response has an attribute 'content'
        roadmap_data = response.text
        return jsonify(roadmap_data)
    except Exception as e:
        return jsonify({"error": "Failed to generate roadmap", "details": str(e)})


 

if __name__ == '__main__':
    app.run(debug=True)
