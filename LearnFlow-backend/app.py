import os
import google.generativeai as genai
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import json

load_dotenv()


app = Flask(__name__)
CORS(app)
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
