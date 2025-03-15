"""Sample answers from LLMs on QA task."""
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    return jsonify({'response': "request received"}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
