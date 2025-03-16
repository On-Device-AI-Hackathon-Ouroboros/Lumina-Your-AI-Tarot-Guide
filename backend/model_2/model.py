"""Sample answers from LLMs on QA task."""
import logging
import time
# from utils import utils
import atexit
from flask import Flask, request, jsonify
from flask_cors import CORS
from src import chatbot


app = Flask(__name__)
CORS(app)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
logging.basicConfig(level=logging.INFO)


# set up
# utils.setup_logger()
# parser = utils.get_parser()
# args, unknown = parser.parse_known_args()
# logging.info('Starting new run with args: %s', args)

# if unknown:
#     raise ValueError(f'Unkown args: {unknown}')

# Initialize model.
# model = utils.init_model(args)
chatAgent = chatbot.Chatbot()

@app.route('/chat', methods=['POST'])
# def chat():
#     print("Request received!!!!!!!!!!!!!!!!")
#     try:
#         user_input = request.json.get('message')
#         if not user_input:
#             return jsonify({'error': 'No message provided'}), 400
#         predicted_answer = chatAgent.chat(user_input)
#         print(predicted_answer)
#         # logging.info(f"predicted answer is {predicted_answer}")
#     except Exception as e:
#         logging.error(f"Error during prediction: {e}")
#         return jsonify({'error': str(e)}), 500
#     return jsonify({'response': predicted_answer}), 200
def chat():
    print("Request received!!!!!!!!!!!!!!!!")
    try:
        # Parse JSON safely
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided in the request.'}), 400

        user_input = data['message']
        # chat_start = time.time()
        predicted_answer = chatAgent.chat(user_input)
        # chat_end = time.time()
        # logging.info(f"chatAgent.chat execution time: {chat_end - chat_start:.2f} seconds")

        print(f"Predicted answer: {predicted_answer}")
        
        # Ensure predicted_answer is valid
        if predicted_answer is None:
            return jsonify({'error': 'Failed to generate a response.'}), 500
        
        return jsonify({'response': predicted_answer}), 200

    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        # Do not expose internal error details to the user
        return jsonify({'error': 'An internal error occurred. Please try again later.'}), 500


def cleanup_model():
    # del model
    logging.info("Model deleted successfully")

if __name__ == '__main__':
    atexit.register(cleanup_model)
    app.run(host='127.0.0.1', port=5000)
