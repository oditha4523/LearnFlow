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

      Follow these layout guidelines to create a clear tree structure with no overlapping:
      1. Use a hierarchical tree layout with diagonal branches
      2. Horizontal spacing between sibling nodes:
         - First level: 800 units between branches
         - Second level: 400 units between branches
         - Third level: 200 units between branches
      3. Vertical spacing (y) should be at least 200 units between levels
      4. Start the first node at (800, 0)
      5. Position child nodes diagonally below their parent:
         - First child: offset 300 units left from parent's x position
         - Second child: offset 150 units left from parent's x position
         - Third child: same x as parent
         - Fourth child: offset 150 units right from parent's x position
         - Fifth child: offset 300 units right from parent's x position
      6. For deeper levels, maintain the same offset pattern but reduce spacing by half

      Ensure the output includes two constants: `nodes` and `edges`, structured exactly like this:

      nodes = [
        {{
          id: '1',
          type: 'input',
          data: {{ label: 'input' }},
          position: {{ x: 800, y: 0 }},
        }},
        {{
          id: '2',
          data: {{ label: 'node 2' }},
          position: {{ x: 400, y: 200 }},
        }},
        {{
          id: '2a',
          data: {{ label: 'node 2a' }},
          position: {{ x: 200, y: 400 }},
        }},
        {{
          id: '2b',
          data: {{ label: 'node 2b' }},
          position: {{ x: 400, y: 400 }},
        }},
        {{
          id: '2c',
          data: {{ label: 'node 2c' }},
          position: {{ x: 600, y: 400 }},
        }},
        {{
          id: '3',
          data: {{ label: 'node 3' }},
          position: {{ x: 1200, y: 200 }},
        }},
        {{
          id: '3a',
          data: {{ label: 'node 3a' }},
          position: {{ x: 1000, y: 400 }},
        }},
        {{
          id: '3b',
          data: {{ label: 'node 3b' }},
          position: {{ x: 1200, y: 400 }},
        }},
        {{
          id: '3c',
          data: {{ label: 'node 3c' }},
          position: {{ x: 1400, y: 400 }},
        }},
      ];

      edges = [
        {{ id: 'e12', source: '1', target: '2', animated: true }},
        {{ id: 'e13', source: '1', target: '3', animated: true }},
        {{ id: 'e22a', source: '2', target: '2a', animated: true }},
        {{ id: 'e22b', source: '2', target: '2b', animated: true }},
        {{ id: 'e22c', source: '2', target: '2c', animated: true }},
        {{ id: 'e33a', source: '3', target: '3a', animated: true }},
        {{ id: 'e33b', source: '3', target: '3b', animated: true }},
        {{ id: 'e33c', source: '3', target: '3c', animated: true }},
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
