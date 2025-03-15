"""Sample answers from LLMs on QA task."""
import logging
from utils import utils
import atexit
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['ENV'] = 'development'
app.config['DEBUG'] = True

# set up
utils.setup_logger()
parser = utils.get_parser()
args, unknown = parser.parse_known_args()
logging.info('Starting new run with args: %s', args)

# if unknown:
#     raise ValueError(f'Unkown args: {unknown}')

# Initialize model.
model = utils.init_model(args)

@app.route('/chat', methods=['POST'])
def chat():
    # print("Request received!!!!!!!!!!!!!!!!")

    try:
        user_input = request.json.get('message')
        if not user_input:
            return jsonify({'error': 'No message provided'}), 400
        local_prompt = f"You are Nova, a wise tarot oracle. You specialize in providing insightful tarot readings and thoughtful guidance." \
        f"Based on the ${user_input}, greet the user and give a response for tarrot reading." \
        f"Do not ask more questions or personal information." 

        predicted_answer, token_log_likelihoods, embedding = model.predict(
            local_prompt, args.temperature)
        embedding = embedding.cpu() if embedding is not None else None

        # logging.info(f"predicted answer is {predicted_answer}")
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500
    return jsonify({'response': predicted_answer}), 200

def cleanup_model():
    # del model
    logging.info("Model deleted successfully")

if __name__ == '__main__':
    atexit.register(cleanup_model)
    app.run(host='127.0.0.1', port=5000)
