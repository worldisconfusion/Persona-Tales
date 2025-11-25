# Persona-Tales: Project Structure & Documentation Index

## 📁 Project Organization

```
Persona-Tales/
├── 📄 README.md                      # Main project documentation
├── 📋 SETUP_CHECKLIST.md            # Step-by-step setup verification
│
├── 📂 docs/                         # Documentation & assets
│   ├── screenshots/                 # Application screenshots
│   │   ├── img1.jpeg               # Landing page
│   │   ├── img2.jpeg               # Story generation
│   │   ├── img3.jpeg               # Dashboard
│   │   ├── img4.jpeg               # Audio features
│   │   └── img5.jpeg               # Achievements
│   └── PROJECT_STRUCTURE.md        # This file
│
├── 📂 experiments/                  # Model selection experiments
│   ├── DistilGPT_2.ipynb           # DistilGPT-2 experiment
│   ├── Meta_Llama.ipynb            # Llama 3 experiment
│   └── README.md                   # Detailed comparison & analysis
│
├── 📂 client/                       # React frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API integrations
│   │   └── slices/                 # Redux state management
│   ├── .env                        # Frontend config (create from template)
│   └── ENV_TEMPLATE.txt            # Environment variables template
│
└── 📂 server/                       # Backend services
    ├── controllers/                # API route handlers
    ├── models/                     # MongoDB schemas
    ├── routes/                     # Express routes
    ├── .env                        # Backend config (create from template)
    ├── ENV_TEMPLATE.txt            # Environment variables template
    │
    └── story_tts_service/          # Python AI services
        ├── story_api_service/      # Story generation (GPU)
        │   ├── llama3_best_adapter/# Fine-tuned model weights
        │   ├── model_api.py        # FastAPI server
        │   ├── .env                # HuggingFace token
        │   └── ENV_TEMPLATE.txt
        │
        └── tts_cpu_service/        # Text-to-speech (CPU)
            ├── tts_server.py       # FastAPI server
            ├── requirements.txt
            └── README.md           # Detailed TTS setup
```

---

## 📚 Documentation Guide

### Getting Started

**New to the project? Start here:**

1. **[README.md](../README.md)** - Complete project overview

   - Features and tech stack
   - Screenshots
   - Installation guide
   - Running instructions
   - Troubleshooting

2. **[SETUP_CHECKLIST.md](../SETUP_CHECKLIST.md)** - Step-by-step setup
   - Prerequisites verification
   - Installation checklist
   - Service startup verification
   - Common issues

### Technical Deep Dive

**Want to understand the technical decisions?**

3. **[experiments/README.md](../experiments/README.md)** - Model selection
   - DistilGPT-2 vs Llama 3 comparison
   - Performance metrics
   - QLoRA methodology
   - Training details
   - Why we chose Llama 3

### Research & Learning

**Interested in the science behind the project?**

4. **Research Papers** (linked in main README):

   - [QLoRA](https://arxiv.org/abs/2305.14314) - Efficient model fine-tuning
   - [Tortoise TTS](https://arxiv.org/abs/2305.07243) - Voice synthesis
   - [TinyStories](https://arxiv.org/abs/2305.07759) - Dataset curation

5. **Training Dataset**:
   - [Google Sheets](https://docs.google.com/spreadsheets/d/1fG7maZYAvMdhCTcasCjEYDaH6UMz8NrB0MaCbRq37dQ/edit?usp=sharing)
   - 100 curated children's stories
   - Multiple genres
   - Structured format

---

## 🏗️ Architecture Overview

### Service Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Persona-Tales Stack                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐         ┌──────────────┐         │
│  │   Frontend   │ ───────▶│   Backend    │         │
│  │ React (5173) │         │ Express(4000)│         │
│  └──────────────┘         └───────┬──────┘         │
│                                   │                 │
│                          ┌────────┴────────┐        │
│                          │                 │        │
│                   ┌──────▼──────┐  ┌──────▼──────┐ │
│                   │  Story API  │  │   TTS API   │ │
│                   │  Port 8000  │  │  Port 8001  │ │
│                   │  (GPU)      │  │  (CPU)      │ │
│                   └─────────────┘  └─────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

| Component            | Technology         | Purpose           |
| -------------------- | ------------------ | ----------------- |
| **Frontend**         | React 18 + Vite    | User interface    |
| **State Management** | Redux Toolkit      | Global state      |
| **Backend**          | Node.js + Express  | REST API          |
| **Database**         | MongoDB            | Data persistence  |
| **Story AI**         | Llama 3 8B + QLoRA | Text generation   |
| **Voice AI**         | Coqui XTTS-v2      | Speech synthesis  |
| **Optimization**     | 4-bit quantization | Memory efficiency |
| **Cloud**            | Cloudinary         | Audio storage     |

---

## 🔬 Key Technical Innovations

### 1. QLoRA Fine-Tuning

- Reduced VRAM from 16GB to 6-8GB
- Enabled consumer GPU training
- Maintained 99% of full fine-tuning quality
- **Implementation:** `experiments/Meta_Llama.ipynb`

### 2. Hybrid GPU/CPU Architecture

- **GPU (Story):** Llama 3 for high-quality generation
- **CPU (TTS):** XTTS-v2 for speech synthesis
- Optimal resource utilization
- Cost-effective deployment

### 3. Domain-Specific Fine-Tuning

- 100 curated stories > 10,000 web-scraped stories
- Inspired by TinyStories research
- Better quality with less data
- Faster training convergence

### 4. Zero-Shot Voice Cloning

- 6-10 seconds of audio needed
- No additional training required
- Real-time voice synthesis
- **Technology:** Coqui XTTS-v2

---

## 📊 Dataset Information

### Training Data

- **Size:** 100 stories
- **Source:** [Google Sheets](https://docs.google.com/spreadsheets/d/1fG7maZYAvMdhCTcasCjEYDaH6UMz8NrB0MaCbRq37dQ/edit?usp=sharing)
- **Genres:** 6 categories
- **Quality:** Manually curated

### Split

- Training: 81 stories
- Validation: 9 stories
- Test: 10 stories

### Format

```
[GENRE]: Adventure & Exploration
[CHARACTERS]: Hero, Guide, Creature
[PROMPT]: A quest to find the legendary artifact
[STORY]: Once upon a time...
```

---

## 🚀 Quick Start Paths

### For Users

1. Read [README.md](../README.md) - Overview
2. Follow [SETUP_CHECKLIST.md](../SETUP_CHECKLIST.md) - Setup
3. Run all 4 services
4. Access at `http://localhost:5173`

### For Developers

1. Review [experiments/README.md](../experiments/README.md) - Technical decisions
2. Study codebase structure (see above)
3. Check service-specific READMEs
4. Review research papers

### For Researchers

1. Read research papers (linked in main README)
2. Study [experiments/README.md](../experiments/README.md)
3. Access [training dataset](https://docs.google.com/spreadsheets/d/1fG7maZYAvMdhCTcasCjEYDaH6UMz8NrB0MaCbRq37dQ/edit?usp=sharing)
4. Review notebooks: `experiments/*.ipynb`

---

## 🎯 Future Scope

### Short-Term (3-6 months)

- Model optimization (speculative decoding)
- Multi-language support
- Mobile app development
- Illustration generation

### Medium-Term (6-12 months)

- Model distillation to 1B parameters
- Edge device deployment
- Advanced TTS features
- Educational modules

### Long-Term (1-2 years)

- Multimodal storytelling
- Video generation
- VR/AR experiences
- Platform expansion

**Full details:** See [README.md](../README.md) - Future Scope section

---

## 📞 Support & Resources

### Documentation

- Main README: [README.md](../README.md)
- Setup Guide: [SETUP_CHECKLIST.md](../SETUP_CHECKLIST.md)
- Experiments: [experiments/README.md](../experiments/README.md)

### External Resources

- [Hugging Face Llama 3](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct)
- [Coqui TTS Docs](https://docs.coqui.ai/)
- [PEFT Library](https://github.com/huggingface/peft)

### Contributors

- [Anshul Kansal](https://github.com/anshulkansal04)
- [Lov Kumar Kumawat](https://github.com/Lovkumawat)
- [Vishwas Mishra](https://github.com/CyberMage7)
- [Satwik Pandey](https://github.com/worldisconfusion)

---

**Last Updated:** November 2025  
**Project Status:** ✅ Active Development
