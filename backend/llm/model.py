"""Sample answers from LLMs on QA task."""
import logging
from utils import utils
# from flask import Flask, request, jsonify

# app = Flask(__name__)

# set up
utils.setup_logger()
parser = utils.get_parser()
args, unknown = parser.parse_known_args()
logging.info('Starting new run with args: %s', args)

if unknown:
    raise ValueError(f'Unkown args: {unknown}')

# Initialize model.
model = utils.init_model(args)

# @app.route('/chat', methods=['POST'])
def chat(args):
    # user_input = request.json.get('message')
    local_prompt = "As Tarot Card expert, can you do a three-card reading for my past, present, and future?"

    predicted_answer, token_log_likelihoods, embedding = model.predict(
        local_prompt, args.temperature)
    embedding = embedding.cpu() if embedding is not None else None

    logging.info(f"predicted answer is {predicted_answer}")
    print(predicted_answer)
    # return jsonify({'response': predicted_answer})
    return 0

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000)
    chat(args)

del model
