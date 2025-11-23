"""
Simple CPU-Based TTS Voice Cloning API
Input: voice file (WAV) + text
Output: cloned voice audio (WAV)
"""

import os
import torch
import tempfile
import logging
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
from TTS.api import TTS

# Force CPU usage - prevents GPU/VRAM conflicts
os.environ["CUDA_VISIBLE_DEVICES"] = ""
torch.set_num_threads(4)  # Adjust based on your CPU cores

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global model instance
tts_model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model on startup"""
    global tts_model
    
    logger.info("=" * 60)
    logger.info("🚀 Starting TTS Voice Cloning API")
    logger.info("=" * 60)
    logger.info("📦 Loading Coqui XTTS-v2 model...")
    logger.info("⚙️  Device: CPU (VRAM-free)")
    logger.info("⏱️  First run: ~5 min (downloads ~2GB model)")
    logger.info("-" * 60)
    
    try:
        # Force CPU device
        tts_model = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to("cpu")
        
        logger.info("✅ Model loaded successfully!")
        logger.info("=" * 60)
        logger.info("🎯 API ready at: http://localhost:8000")
        logger.info("📖 Test with: curl -X POST http://localhost:8000/clone \\")
        logger.info("              -F 'text=Hello world' \\")
        logger.info("              -F 'voice_file=@sample_voice.wav' \\")
        logger.info("              --output result.wav")
        logger.info("=" * 60)
    except Exception as e:
        logger.error(f"❌ Failed to load model: {e}")
        raise
    
    yield
    
    logger.info("🛑 Shutting down...")
    del tts_model

app = FastAPI(
    title="TTS Voice Cloning API",
    description="CPU-based voice cloning: voice file + text → cloned audio",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/")
async def root():
    """Health check"""
    return {
        "status": "running",
        "model": "xtts_v2",
        "device": "cpu",
        "endpoints": {
            "clone": "POST /clone (text + voice_file)",
            "health": "GET /health"
        }
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model_loaded": tts_model is not None,
        "device": "cpu",
        "ready": True
    }

@app.post("/clone")
async def clone_voice(
    text: str = Form(..., description="Text to speak"),
    voice_file: UploadFile = File(..., description="Voice sample (WAV, 10-30 seconds)"),
    language: str = Form(default="en", description="Language code: en, es, fr, de, etc.")
):
    """
    Voice Cloning Endpoint
    
    Input:
    - text: Text to convert to speech (max 5000 chars)
    - voice_file: WAV/MP3 audio file (10-30 seconds of clear speech)
    - language: Language code (default: en)
    
    Output:
    - WAV audio file with cloned voice
    
    Example:
    curl -X POST http://localhost:8000/clone \
         -F "text=Hello, this is a test" \
         -F "voice_file=@sample_voice.wav" \
         -F "language=en" \
         --output output.wav
    """
    
    if tts_model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Validate inputs
    if not text or len(text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    if len(text) > 5000:
        raise HTTPException(status_code=400, detail="Text too long (max 5000 chars)")
    
    if not voice_file.filename.lower().endswith(('.wav', '.mp3', '.flac')):
        raise HTTPException(status_code=400, detail="Voice file must be WAV, MP3, or FLAC")
    
    logger.info(f"📝 Request: '{text[:60]}...' | Language: {language}")
    
    # Create temp files
    temp_voice_path = None
    temp_output_path = None
    
    try:
        # Save uploaded voice file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_voice:
            temp_voice_path = temp_voice.name
            content = await voice_file.read()
            temp_voice.write(content)
        
        # Create output file path
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_output:
            temp_output_path = temp_output.name
        
        logger.info("🎤 Generating speech (this may take 15-30 seconds)...")
        
        # Generate cloned speech
        tts_model.tts_to_file(
            text=text,
            file_path=temp_output_path,
            speaker_wav=temp_voice_path,
            language=language
        )
        
        logger.info("✅ Generation complete!")
        
        # Clean up input file
        os.unlink(temp_voice_path)
        
        # Return audio file (will auto-delete after sending)
        return FileResponse(
            temp_output_path,
            media_type="audio/wav",
            filename="cloned_voice.wav",
            headers={"X-Generation-Time": "15-30s"}
        )
        
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        
        # Clean up on error
        if temp_voice_path and os.path.exists(temp_voice_path):
            os.unlink(temp_voice_path)
        if temp_output_path and os.path.exists(temp_output_path):
            os.unlink(temp_output_path)
        
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    
    logger.info("Starting server...")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8001,  # Changed to 8001 to avoid conflict with Story API
        log_level="info"
    )

