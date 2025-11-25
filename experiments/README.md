# Model Selection Experiments

This folder contains the experimental notebooks used to evaluate and select the optimal language model for story generation in Persona-Tales.

## Overview

We conducted comparative experiments between two model architectures to determine which would best serve our storytelling use case:

1. **DistilGPT-2** - A lightweight, efficient model (82M parameters)
2. **Meta Llama 3 8B Instruct** - A larger, instruction-tuned model (8B parameters)

**Final Selection:** Meta Llama 3 8B Instruct was chosen for production due to superior storytelling capabilities, coherence, and creative output quality.

---

## Experiments

### 1. DistilGPT-2 Fine-tuning (`DistilGPT_2.ipynb`)

**Model:** `distilgpt2` (82M parameters)

**Approach:**

- Full fine-tuning on custom story dataset
- Standard causal language modeling objective
- Max sequence length: 512 tokens
- Data format: `[GENRE] → [CHARACTERS] → [PROMPT] → [STORY]`

**Training Setup:**

- Train/eval split: 80/20
- Tokenization with truncation
- Data collator for language modeling
- Standard PyTorch training loop

**Key Findings:**

- ✅ **Pros:**

  - Fast training time (~1-2 hours on GPU)
  - Low memory footprint (2-3GB VRAM)
  - Quick inference (< 1 second per story)
  - Easy deployment on consumer hardware

- ❌ **Cons:**
  - Limited context understanding
  - Repetitive text generation
  - Struggles with long-form coherence
  - Poor genre adherence
  - Simplistic vocabulary and sentence structure

**Conclusion:** While efficient, DistilGPT-2 lacked the creative depth and narrative coherence required for engaging children's stories.

---

### 2. Meta Llama 3 8B Fine-tuning (`Meta_Llama.ipynb`)

**Model:** `meta-llama/Meta-Llama-3-8B-Instruct` (8B parameters)

**Approach:**

- **QLoRA** (Quantized Low-Rank Adaptation) fine-tuning
- 4-bit quantization using `bitsandbytes`
- LoRA adapters for parameter-efficient training
- Instruction-tuned base model

**Training Setup:**

**Quantization Config:**

```python
BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)
```

**LoRA Config:**

- Target modules: Query, Key, Value, Output projections
- Rank (r): 16-32
- Alpha: 32-64
- Dropout: 0.05-0.1

**Dataset:**

- Total: 100 curated story examples
- Train: 81 examples (81%)
- Validation: 9 examples (9%)
- Test: 10 examples (10%)
- Format: Structured prompt → story pairs

**Training Parameters:**

- Optimizer: AdamW with paged optimizers
- Learning rate: 2e-4 (with warmup)
- Batch size: 4-8 (gradient accumulation)
- Epochs: 3-5
- Max sequence length: 1024 tokens

**Key Findings:**

- ✅ **Pros:**

  - Excellent narrative coherence and flow
  - Strong genre-specific storytelling
  - Rich vocabulary and varied sentence structure
  - Maintains character consistency
  - Creative plot development
  - Age-appropriate content generation
  - Strong instruction following

- ⚠️ **Considerations:**
  - Requires 6-8GB VRAM (with 4-bit quantization)
  - Slower inference (~3-5 seconds per story)
  - Larger model size (~5GB on disk with adapters)
  - Initial download time (~15-20 minutes)

**Conclusion:** Llama 3 8B significantly outperformed DistilGPT-2 in story quality, making it the clear choice despite higher computational requirements.

---

## Comparative Results

| Metric                  | DistilGPT-2 | Llama 3 8B | Winner      |
| ----------------------- | ----------- | ---------- | ----------- |
| **Story Coherence**     | ⭐⭐        | ⭐⭐⭐⭐⭐ | Llama 3     |
| **Genre Adherence**     | ⭐⭐        | ⭐⭐⭐⭐⭐ | Llama 3     |
| **Creativity**          | ⭐⭐        | ⭐⭐⭐⭐⭐ | Llama 3     |
| **Vocabulary Richness** | ⭐⭐        | ⭐⭐⭐⭐   | Llama 3     |
| **Training Time**       | ⭐⭐⭐⭐⭐  | ⭐⭐⭐     | DistilGPT-2 |
| **Inference Speed**     | ⭐⭐⭐⭐⭐  | ⭐⭐⭐     | DistilGPT-2 |
| **Memory Efficiency**   | ⭐⭐⭐⭐⭐  | ⭐⭐⭐     | DistilGPT-2 |
| **Overall Quality**     | ⭐⭐        | ⭐⭐⭐⭐⭐ | **Llama 3** |

---

## Technical Innovations Used

### 1. QLoRA (Quantized Low-Rank Adaptation)

- Enabled training of 8B model on consumer GPU (RTX 4060 10GB)
- Reduced memory from ~16GB to ~6-8GB
- Maintained model quality with 4-bit precision
- **Paper:** [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)

### 2. Parameter-Efficient Fine-Tuning (PEFT)

- Only trained ~0.1% of model parameters (LoRA adapters)
- Faster training and lower storage requirements
- Preserved base model knowledge

### 3. Instruction Tuning

- Leveraged pre-trained instruction-following capabilities
- Better prompt adherence and structured output
- Reduced training data requirements

---

## Dataset

**Training Data:** Custom curated dataset of 100 children's stories

- **Source:** [Google Sheets Dataset](https://docs.google.com/spreadsheets/d/1fG7maZYAvMdhCTcasCjEYDaH6UMz8NrB0MaCbRq37dQ/edit?usp=sharing)
- **Genres:** Adventure & Exploration, Fantasy, Mystery, Mythology, Sci-Fi
- **Format:** Prompt, Characters, Genre → Story
- **Quality:** Manually curated for age-appropriateness and narrative structure

**Data Curation Strategy:**
Inspired by the [TinyStories](https://arxiv.org/abs/2305.07759) paper, which demonstrated that domain-specific fine-tuning with smaller, high-quality datasets can achieve excellent results for constrained tasks like children's storytelling.

---

## Running the Notebooks

### Prerequisites

- Google Colab (recommended for GPU access)
- Hugging Face account with Llama 3 access
- Google Drive for dataset storage

### DistilGPT-2 Experiment

```bash
# Open DistilGPT_2.ipynb in Colab
# Mount Google Drive
# Update dataset path
# Run all cells
```

### Llama 3 Experiment

```bash
# Open Meta_Llama.ipynb in Colab
# Login to Hugging Face (requires Llama 3 access)
# Mount Google Drive
# Update dataset path
# Run all cells (may take 2-4 hours)
```

---

## Key Takeaways

1. **Model size matters for creative tasks**: The 100x parameter increase (82M → 8B) resulted in dramatically better story quality.

2. **QLoRA makes large models accessible**: 4-bit quantization + LoRA enabled training Llama 3 on consumer hardware.

3. **Instruction tuning is powerful**: The pre-trained instruction-following capabilities of Llama 3 significantly reduced fine-tuning requirements.

4. **Quality over quantity**: 100 high-quality, curated stories were sufficient to fine-tune Llama 3 for our specific use case.

5. **Performance trade-offs are acceptable**: The slight inference delay (3-5s vs <1s) was worth the massive quality improvement.

---

## Future Work

- Experiment with smaller Llama variants (1B-3B) for better latency
- Explore distillation: compress fine-tuned Llama 3 into a smaller model
- Test non-autoregressive generation for faster inference
- Implement speculative decoding for 2-3x speedup
- Evaluate emerging models (Phi-3, Gemma-2)

---

## References

1. **QLoRA Paper**: [Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
2. **Llama 3**: [Meta-Llama-3-8B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct)
3. **TinyStories**: [How Small Can Language Models Be?](https://arxiv.org/abs/2305.07759)
4. **PEFT Library**: [Hugging Face PEFT](https://github.com/huggingface/peft)

---

**Conclusion:** The experimental validation clearly demonstrated that Meta Llama 3 8B Instruct, fine-tuned with QLoRA, provides the optimal balance of quality and feasibility for our storytelling application.
