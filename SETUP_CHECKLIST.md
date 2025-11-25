# 🔍 Complete Setup Verification Checklist

Use this checklist to ensure all components of Persona-Tales are properly set up.

> **Note:** Before starting setup, review the model selection experiments in `experiments/README.md` to understand why we chose Llama 3 8B for story generation.

## ✅ Prerequisites Checklist

### Software Requirements
- [ ] **Node.js 16+** installed
  - Check: `node --version`
  
- [ ] **Python 3.11** installed (NOT 3.12 or 3.10)
  - Check: `python --version` or `py --list`
  - Download: https://www.python.org/downloads/release/python-31110/
  
- [ ] **MongoDB** installed and running
  - Check: `mongod --version`
  - Windows: Install from https://www.mongodb.com/try/download/community
  
- [ ] **Git** installed
  - Check: `git --version`

### Windows-Specific
- [ ] **Microsoft C++ Build Tools** installed (for TTS service)
  - Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
  - Select: "Desktop development with C++"

### Accounts Required
- [ ] **Cloudinary account** created
  - Get API keys from: https://cloudinary.com/
  
- [ ] **Hugging Face account** with Llama 3 access
  - Create account: https://huggingface.co/
  - Request access: https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct
  - Get token: https://huggingface.co/settings/tokens

### Hardware Requirements
- [ ] **GPU with 6GB+ VRAM** (for Story Generation)
  - Your RTX 4060 10GB: ✅ Perfect
  
- [ ] **4-8GB free RAM** (for TTS on CPU)
  
- [ ] **~10GB free disk space** (for models and dependencies)

---

## 📦 Installation Steps

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd Persona-Tales
```

- [ ] Repository cloned successfully
- [ ] Can navigate to project root

---

### 2. Frontend Setup (Client)

```bash
cd client
npm install
```

**Create `.env` file:**
```env
VITE_APP_BACKEND_URL=http://localhost:4000/api/v1
```

**Checklist:**
- [ ] `client/` directory exists
- [ ] `npm install` completed without errors
- [ ] `.env` file created with correct backend URL
- [ ] `node_modules/` folder created

---

### 3. Backend Setup (Server)

```bash
cd ../server
npm install
```

**Create `.env` file:**
```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017/ai-story-generator
JWT_SECRET=your_jwt_secret_key_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME="YourFolderName"

# Python Services URLs
STORY_API_URL=http://localhost:8000
TTS_API_URL=http://localhost:8001
```

**Checklist:**
- [ ] `server/` directory exists
- [ ] `npm install` completed without errors
- [ ] `.env` file created with ALL required values
- [ ] MongoDB connection string is correct
- [ ] Cloudinary credentials added
- [ ] JWT_SECRET generated (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

---

### 4. Story Generation API Setup (GPU Service)

```bash
cd server/story_tts_service
```

**Download Model Adapters:**
- [ ] Downloaded model adapters from provided Drive link
- [ ] Extracted to: `story_api_service/llama3_best_adapter/`
- [ ] Contains: `adapter_config.json`, `adapter_model.safetensors`

**Create Virtual Environment:**
```bash
# Create venv for Story API (can use any Python 3.9+)
python -m venv venv_story

# Activate
venv_story\Scripts\activate  # Windows
source venv_story/bin/activate  # Linux/Mac

# Install dependencies
pip install -r story_api_service/requirements.txt
```

**Create `.env` in `story_api_service/`:**
```env
HF_TOKEN="your_hugging_face_token_here"
```

**Checklist:**
- [ ] `venv_story/` created
- [ ] Virtual environment activated (see `(venv_story)` in prompt)
- [ ] Dependencies installed successfully
- [ ] Model adapters in correct location
- [ ] `.env` file created with HuggingFace token
- [ ] Token has access to Llama 3 model

---

### 5. TTS Voice Cloning API Setup (CPU Service)

```bash
cd tts_cpu_service
```

**Verify Python 3.11:**
```bash
python --version  # Must show 3.11.x
# If not, use: py -3.11 --version
```

**Create Virtual Environment:**
```bash
# Create venv with Python 3.11 SPECIFICALLY
py -3.11 -m venv venv
# OR
python3.11 -m venv venv

# Activate
venv\Scripts\Activate.ps1  # Windows PowerShell
venv\Scripts\activate.bat  # Windows CMD
source venv/bin/activate   # Linux/Mac

# Install dependencies (takes 5-10 min first time)
pip install -r requirements.txt
```

**Checklist:**
- [ ] Python 3.11 confirmed (CRITICAL - won't work with 3.12)
- [ ] `venv/` created (separate from venv_story)
- [ ] Virtual environment activated (see `(venv)` in prompt)
- [ ] C++ Build Tools installed (Windows only)
- [ ] Dependencies installed without "Microsoft Visual C++" errors
- [ ] TTS model downloaded (~2GB) on first run

---

## 🚀 Running All Services

You need **4 terminals running simultaneously**.

### Terminal 1: Frontend (Port 5173)
```bash
cd Persona-Tales/client
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] Shows: "Local: http://localhost:5173"
- [ ] Can open in browser
- [ ] No port conflict errors

---

### Terminal 2: Backend (Port 4000)
```bash
cd Persona-Tales/server
npm run dev
```

**Verify:**
- [ ] MongoDB connects successfully
- [ ] Shows: "Server running on port 4000"
- [ ] No database connection errors
- [ ] No missing environment variable errors

---

### Terminal 3: Story Generation API (Port 8000)
```bash
cd Persona-Tales/server/story_tts_service

# Activate story venv
venv_story\Scripts\activate  # Windows
source venv_story/bin/activate  # Linux/Mac

cd story_api_service
python model_api.py
```

**Verify:**
- [ ] Correct venv activated (venv_story)
- [ ] HuggingFace token accepted
- [ ] Llama model loads successfully
- [ ] GPU detected and used
- [ ] Server running on port 8000
- [ ] No CUDA/GPU errors

---

### Terminal 4: TTS Voice Cloning API (Port 8001)
```bash
cd Persona-Tales/server/story_tts_service/tts_cpu_service

# Activate TTS venv (Python 3.11)
venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate  # Linux/Mac

python tts_server.py
```

**Verify:**
- [ ] Correct venv activated (Python 3.11 venv)
- [ ] Shows: "Device: CPU (VRAM-free)"
- [ ] Model downloads (first run ~2-5 min)
- [ ] Shows: "✅ Model loaded successfully!"
- [ ] Server running on port 8001
- [ ] No GPU warnings (CPU-only is correct)

---

## 🧪 Testing Each Service

### Test Frontend
```bash
# Open browser
http://localhost:5173
```
- [ ] Page loads without errors
- [ ] Can see login/signup page
- [ ] No console errors

---

### Test Backend
```bash
# Health check (if available)
curl http://localhost:4000/api/v1/health
```
- [ ] Backend responds
- [ ] MongoDB connected

---

### Test Story API
```bash
# Test endpoint (adjust based on your API)
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test story"}'
```
- [ ] Story generation works
- [ ] GPU is being used (check nvidia-smi)

---

### Test TTS API
```bash
# Health check
curl.exe http://localhost:8001/health

# Voice cloning test
curl.exe -X POST http://localhost:8001/clone `
  -F "text=Testing voice cloning" `
  -F "voice_file=@./sample_voice.wav" `
  --output test.wav
```
- [ ] Health check returns {"status": "healthy"}
- [ ] Voice cloning generates audio file
- [ ] test.wav file created and playable

---

## 🔌 Integration Test

### End-to-End Flow
1. [ ] Frontend loads at http://localhost:5173
2. [ ] User can sign up/login
3. [ ] Can enter story prompt
4. [ ] Backend receives request (check Terminal 2)
5. [ ] Story API generates text (check Terminal 3)
6. [ ] TTS API generates audio (check Terminal 4)
7. [ ] Audio plays in frontend
8. [ ] Story saves to database
9. [ ] Can view saved stories

---

## 🐛 Common Issues & Solutions

### Issue: "Port already in use"
**Solution:** Kill existing process
```bash
# Windows
netstat -ano | findstr :<port>
taskkill /PID <pid> /F

# Linux/Mac
lsof -i :<port>
kill -9 <pid>
```

### Issue: "MongoDB connection failed"
**Solution:**
- [ ] Start MongoDB: `mongod` or `net start MongoDB`
- [ ] Check connection string in `.env`
- [ ] Verify MongoDB is running: `mongo` or `mongosh`

### Issue: "Python 3.11 not found"
**Solution:**
- [ ] Install Python 3.11 specifically
- [ ] Use `py -3.11` launcher on Windows
- [ ] Verify: `py --list` shows 3.11

### Issue: "Microsoft Visual C++ 14.0 required"
**Solution:**
- [ ] Install C++ Build Tools
- [ ] Restart computer
- [ ] Retry: `pip install -r requirements.txt`

### Issue: "CUDA out of memory" (Story API)
**Solution:**
- [ ] Close other GPU-using applications
- [ ] Verify TTS is using CPU (not GPU)
- [ ] Check nvidia-smi for VRAM usage

### Issue: "TTS model not loading"
**Solution:**
- [ ] Wait longer (first download takes 2-5 min)
- [ ] Check internet connection
- [ ] Verify disk space (~2GB needed)

---

## 📊 Resource Monitoring

### Check GPU Usage (Story API)
```bash
# Windows/Linux
nvidia-smi

# Should show Llama model using ~6-8GB VRAM
```

### Check CPU Usage (TTS API)
```bash
# Windows
taskmgr

# Linux
htop

# Should show python using 80-100% CPU during generation
```

### Check Ports
```bash
# Windows
netstat -ano | findstr "4000 5173 8000 8001"

# Linux/Mac
lsof -i -P | grep LISTEN | grep "4000\|5173\|8000\|8001"

# Should show all 4 ports listening
```

---

## ✅ Final Verification

Before considering setup complete:

### All Services Running
- [ ] Terminal 1: Frontend on 5173
- [ ] Terminal 2: Backend on 4000
- [ ] Terminal 3: Story API on 8000 (GPU)
- [ ] Terminal 4: TTS API on 8001 (CPU)

### All Connections Work
- [ ] Frontend → Backend (API calls work)
- [ ] Backend → Story API (story generation)
- [ ] Backend → TTS API (voice cloning)
- [ ] Backend → MongoDB (data saves)
- [ ] Backend → Cloudinary (audio upload)

### Complete User Flow
- [ ] User can register
- [ ] User can login
- [ ] User can generate story
- [ ] Story displays with text
- [ ] Audio plays correctly
- [ ] Story saves to profile
- [ ] User can view history

---

## 📝 Environment Variables Summary

Double-check all `.env` files exist:

```
Persona-Tales/
├── client/.env
│   └── VITE_APP_BACKEND_URL=http://localhost:4000/api/v1
│
├── server/.env
│   ├── PORT=4000
│   ├── MONGODB_URL=mongodb://...
│   ├── JWT_SECRET=...
│   ├── CLOUD_NAME=...
│   ├── API_KEY=...
│   ├── API_SECRET=...
│   ├── FOLDER_NAME=...
│   ├── STORY_API_URL=http://localhost:8000
│   └── TTS_API_URL=http://localhost:8001
│
└── server/story_tts_service/
    └── story_api_service/.env
        └── HF_TOKEN=...
```

---

## 🎉 Setup Complete!

If all checkboxes are checked, your Persona-Tales project is fully set up and ready for development!

**Next Steps:**
1. Keep all 4 terminals running while developing
2. Test the complete user flow
3. Check logs for any errors
4. Monitor resource usage
5. Start building features!

**Need Help?**
- Check individual service READMEs
- Review troubleshooting sections
- Verify all environment variables
- Check that all dependencies installed correctly

---

## 📚 Additional Resources

### Project Documentation
- **Main README:** `README.md` - Complete project overview
- **Model Experiments:** `experiments/README.md` - DistilGPT-2 vs Llama 3 comparison
- **Dataset:** [Google Sheets](https://docs.google.com/spreadsheets/d/1fG7maZYAvMdhCTcasCjEYDaH6UMz8NrB0MaCbRq37dQ/edit?usp=sharing)

### Research Papers
1. **QLoRA:** [Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
2. **Tortoise TTS:** [Better Speech Synthesis through Scaling](https://arxiv.org/abs/2305.07243)
3. **TinyStories:** [How Small Can Language Models Be?](https://arxiv.org/abs/2305.07759)

### Technical References
- [Llama 3 Model Card](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct)
- [Coqui XTTS Documentation](https://docs.coqui.ai/)
- [PEFT Library](https://github.com/huggingface/peft)

---

**🎉 Setup Complete! You're ready to generate amazing stories with AI!**

