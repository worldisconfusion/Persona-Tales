import os
from dotenv import load_dotenv

# Load .env file at the very top
load_dotenv() 

import torch
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, BitsAndBytesConfig, AutoModelForCausalLM
from peft import PeftModel
import uvicorn
from contextlib import asynccontextmanager

# --- 1. Define Request/Response data structures ---
# (MODIFIED: Removed 'characters')
class StoryRequest(BaseModel):
    genre: str
    summary: str

# --- 2. Create global dictionary to hold the model ---
ml_models = {}

# --- 3. Define the lifespan event handler ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Load the fine-tuned model and tokenizer into memory.
    """
    print("🚀 Loading fine-tuned Llama 3 model into GPU...")
    
    model_id = "meta-llama/Meta-Llama-3-8B-Instruct"
    ADAPTER_PATH = "./llama3_best_adapter" 

    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16
    )
    
    base_model = AutoModelForCausalLM.from_pretrained(
        model_id, 
        quantization_config=bnb_config, 
        device_map="cuda:0"
    )
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
        
    final_model = PeftModel.from_pretrained(base_model, ADAPTER_PATH)
    final_model.eval()
    
    ml_models["model"] = final_model
    ml_models["tokenizer"] = tokenizer
    
    print("✅ Model loaded successfully and is ready to serve requests.")
    
    yield
    
    print("Shutting down and clearing memory...")
    ml_models.clear()

# --- 4. Create the FastAPI app ---
app = FastAPI(lifespan=lifespan)

# --- 5. Define the API endpoint ---
@app.post("/generate-story")
def generate_story_endpoint(request: StoryRequest):
    """
    Receives a request with story details and returns a generated story.
    """
    model = ml_models["model"]
    tokenizer = ml_models["tokenizer"]
    
    # (MODIFIED: Prompt format updated to remove 'characters')
    # The training format had 'Characters', so we provide an empty one.
    prompt_text = (
        f"Genre: {request.genre}. "
        f"Summary: {request.summary}. "
        f"Characters: \n" # <-- Provide an empty Characters field
        f"\n\nStory:\n"
    )
                   
    messages = [{"role": "user", "content": prompt_text}]

    # Create the formatted prompt string
    formatted_prompt = tokenizer.apply_chat_template(
        messages, 
        tokenize=False,
        add_generation_prompt=True
    )

    # Pass the string to the tokenizer
    inputs = tokenizer(
        formatted_prompt, 
        return_tensors="pt"
    ).to("cuda")
    
    # Define a list of all possible "end of text" tokens
    stop_token_ids = [
        tokenizer.eos_token_id,  # This is 128001 (<|eot_id|>)
        128009                   # This is 128009 (<|end_of_text|>)
    ]
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=2048, 
            do_sample=True, 
            temperature=0.7, 
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=stop_token_ids # <-- Pass the list of stop tokens
        )
    
    generated_story = tokenizer.decode(
        outputs[0][inputs['input_ids'].shape[-1]:], 
        skip_special_tokens=True
    )
    
    return {"story": generated_story}

# --- 6. Run the API ---
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)