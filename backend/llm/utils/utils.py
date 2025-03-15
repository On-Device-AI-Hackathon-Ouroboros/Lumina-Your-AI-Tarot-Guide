"""Utility functions."""
import logging
import argparse
# import pickle
# import wandb
from models.huggingface_models import HuggingfaceModel

def get_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--random_seed', type=int, default=10)
    parser.add_argument(
        "--model_name", type=str, default="google/gemma-3-1b-it", help="Model name",
    )
    parser.add_argument(
        "--model_max_new_tokens", type=int, default=200,
        help="Max number of tokens generated.",
    )
    parser.add_argument(
        "--temperature", type=float, default=1.0,
        help="Temperature")
    return parser


def setup_logger():
    """Setup logger to always print time and level."""
    # logging.basicConfig(
    #     format='%(asctime)s %(levelname)-8s %(message)s',
    #     level=logging.INFO,
    #     datefmt='%Y-%m-%d %H:%M:%S')
    # logging.getLogger().setLevel(logging.INFO)  # logging.DEBUG
    logging.basicConfig(
        level=logging.DEBUG,  # Log everything DEBUG or higher
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler("app.log"),  # Write all logs to a file
            logging.StreamHandler()         # Print logs to the console
        ]
    )

def init_model(args):
    mn = args.model_name
    if 'llama' in mn.lower() or 'falcon' in mn or 'mistral' in mn.lower() or 'gemma' in mn.lower():
        model = HuggingfaceModel(
            mn,
            max_new_tokens=args.model_max_new_tokens)
    else:
        raise ValueError(f'Unknown model_name `{mn}`.')
    return model


# def save(object, file):
#     with open(f'{wandb.run.dir}/{file}', 'wb') as f:
#         pickle.dump(object, f)
#     wandb.save(f'{wandb.run.dir}/{file}')
