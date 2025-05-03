import os
import google.generativeai as genai
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import json
import re

load_dotenv()


app = Flask(__name__)
CORS(app)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


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
      Generate a learning roadmap for {keyword} in JavaScript object format, compatible with React Flow.

      Ensure the output includes two constants: `nodes` and `edges`, structured exactly like this:

      nodes = [
        {{
          id: '1',
          type: 'input',
          data: {{ label: 'input' }},
          position: {{ x: 0, y: 0 }},
        }},
        {{
          id: '2',
          data: {{ label: 'node 2' }},
          position: {{ x: 0, y: 100 }},
        }},
        {{
          id: '2a',
          data: {{ label: 'node 2a' }},
          position: {{ x: 0, y: 200 }},
        }},
        {{
          id: '2b',
          data: {{ label: 'node 2b' }},
          position: {{ x: 0, y: 300 }},
        }},
        {{
          id: '2c',
          data: {{ label: 'node 2c' }},
          position: {{ x: 0, y: 400 }},
        }},
        {{
          id: '2d',
          data: {{ label: 'node 2d' }},
          position: {{ x: 0, y: 500 }},
        }},
        {{
          id: '3',
          data: {{ label: 'node 3' }},
          position: {{ x: 200, y: 100 }},
        }},
      ];

      edges = [
        {{ id: 'e12', source: '1', target: '2', animated: true }},
        {{ id: 'e13', source: '1', target: '3', animated: true }},
        {{ id: 'e22a', source: '2', target: '2a', animated: true }},
        {{ id: 'e22b', source: '2', target: '2b', animated: true }},
        {{ id: 'e22c', source: '2', target: '2c', animated: true }},
        {{ id: 'e2c2d', source: '2c', target: '2d', animated: true }},
      ];

      Only output the two constants (`nodes`, `edges`) in valid JavaScript object format. Do not include any extra explanation or text.
      """

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response=model.generate_content(prompt)
        print("Response:", response)
        roadmap_data = response.text
        return jsonify(roadmap_data)
    
    except Exception as e:
        return jsonify({"error": "Failed to generate roadmap", "details": str(e)})


 

if __name__ == '__main__':
    app.run(debug=True)
