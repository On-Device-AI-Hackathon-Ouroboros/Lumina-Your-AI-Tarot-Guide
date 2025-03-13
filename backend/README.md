# Tarot Guide

## System Requirements

We here discuss hardware and software system requirements.

### Hardware Dependencies

Generally speaking, our experiments require modern computer hardware which is suited for usage with large language models (LLMs).

Requirements regarding the system's CPU and RAM size are relatively modest: any reasonably modern system should suffice, e.g. a system with an Intel 10th generation CPU and 16 GB of system memory or better.

More importantly, all our experiments make use of one or more Graphics Processor Units (GPUs) to speed up LLM inference.
Without a GPU, it is not feasible to reproduce our results in a reasonable amount of time.
The particular GPU necessary depends on the choice of LLM: LLMs with more parameters require GPUs with more memory.
For smaller models (7B parameters), desktop GPUs such as the Nvidia TitanRTX (24 GB) are sufficient.
For larger models (13B), GPUs with more memory, such as the Nvidia A100 server GPU, are required.
Our largest models with 70B parameters require the use of two Nvidia A100 GPUs (2x80GB) simultaneously.

One can reduce the precision to float16 or int8 to reduce memory requirements without significantly affecting model predictions and their accuracy.
We use float16 for 70B models by default, and int8 mode can be enabled for any model by suffixing the model name with `-int8`.


### Software Dependencies

Our code relies on Python 3.11 with PyTorch 2.1.

Our systems run the Ubuntu 20.04.6 LTS (GNU/Linux 5.15.0-89-generic x86_64) operating system.

In [environment_export.yaml](environment_export.yaml) we list the exact versions for all Python packages used in our experiments.
We generally advise against trying to install from this exact export of our conda environment.
Please see below for installation instructions.

Although we have not tested this, we would expect our code to be compatible with other operating systems, Python versions, and versions of the Python libraries that we use.


## Installation Guide


To install Python with all necessary dependencies, we recommend the use of conda, and we refer to [https://conda.io/](https://conda.io/) for an installation guide.


After installing conda, you can set up and activate a new conda environment with all required packages by executing the following commands from the root folder of this repository in a shell:


```
conda-env update -f environment.yaml
conda activate llm
```

The installation should take around 15 minutes.

Our experiments rely on Hugging Face for all LLM models.
It may be necessary to set the environment variable `HUGGING_FACE_HUB_TOKEN` to the token associated with your Hugging Face account.
Further, it may be necessary to [apply for access](https://huggingface.co/meta-llama) to use the official repository of Meta's LLaMa-2 models.
We further recommend setting the `XDG_CACHE_HOME` environment variable to a directory on a device with sufficient space, as models and datasets will be downloaded to this folder.


Nova can be configured to use GPT models from the OpenAI API.
Please set the environment variable `OPENAI_API_KEY` to your OpenAI API key in order to use these models.
Note that OpenAI charges a cost per input token and per generated token.
Costs for reproducing our results vary depending on experiment configuration, but, without any guarantee, should lie somewhere between 5 and 30 USD per run.

## Demo

Execute

```
python llm/model.py --model_name=Llama-2-7b-chat
```

to generate answers with LLaMa-2 Chat (7B).

## Further Instructions


### Repository Structure

We here give an overview of the various components of the code.

By default, a standard run executes the following three scripts in order:

* `$MODEL` is one of: `[Llama-2-7b, Llama-2-13b, Llama-2-70b, Llama-2-7b-chat, Llama-2-13b-chat, Llama-2-70b-chat, falcon-7b, falcon-40b, falcon-7b-instruct, falcon-40b-instruct, Mistral-7B-v0.1, Mistral-7B-Instruct-v0.1]`,

# SBATCH COMMAND
```
#!/bin/bash
#SBATCH --job-name=llama_generate
#SBATCH --partition=gpu
#SBATCH --nodes=1
#SBATCH --gres=gpu:v100-sxm2:1
#SBATCH --cpus-per-task=4
#SBATCH --mem=20GB
#SBATCH --time=01:00:00
#SBATCH --error=llm_error.log
#SBATCH --output=llm_output.log

# Load necessary modules
module load anaconda3/2022.05 cuda/11.8 gcc/8.1.0 singularity/3.10.3

# Activate Conda environment
source activate semantic_uncertainty

# Change to working directory
cd backend

# Start Singularity container with mounted environment
singularity shell -B /home/ma.yij/.conda/envs/semantic_uncertainty:/env /shared/container_repository/pytorch/pytorch_22.05-py3.sif <<EOF
export PATH=/env/bin:$PATH
export PYTHONPATH=/env/lib/python3.8/site-packages:$PYTHONPATH

python llm/model.py --model_name=Llama-2-7b-chat
```