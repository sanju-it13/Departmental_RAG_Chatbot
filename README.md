# 🎓 NIT Rourkela CS Department Chatbot

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Python](https://img.shields.io/badge/python-3.11%2B-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**An intelligent, RAG-powered conversational AI assistant for the Computer Science Department at NIT Rourkela**

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

Welcome to the **NIT Rourkela CS Department Chatbot** – a cutting-edge, conversational AI system built with modern technologies. This chatbot leverages **Retrieval-Augmented Generation (RAG)** to provide accurate, context-aware responses about faculty, courses, research areas, facilities, and more.

### Why This Chatbot?

- 🎯 **Instant Information Access**: Get answers about specializations, faculty, courses, and research instantly
- 🧠 **Smart & Accurate**: RAG architecture ensures responses are grounded in actual department data
- 📚 **Dynamic Knowledge Base**: Upload PDFs, DOCX, TXT files to continuously expand the knowledge base
- ⚡ **Lightning Fast**: Optimized with TF-IDF embeddings and phi3:3.8b model for quick responses
- 🔒 **Privacy-First**: Runs entirely locally – no data leaves your infrastructure

---

## ✨ Features

### 🤖 Core Capabilities

| Feature | Description |
|---------|-------------|
| **Natural Language Queries** | Ask questions naturally: "Who teaches Machine Learning?" or "What are the M.Tech specializations?" |
| **Faculty Information** | Get details about faculty members, their research areas, publications, and courses |
| **Course Details** | Information about courses, prerequisites, syllabus, and instructors |
| **Research Areas** | Explore research domains, ongoing projects, and publications |
| **Facilities & Labs** | Learn about available labs, equipment, and research centers |
| **Document Upload** | Dynamically add new information via PDF, DOCX, TXT, or JSON files |

### 🛠️ Technical Highlights

- **Hybrid Architecture**: Node.js/TypeScript backend + Python microservice for AI/ML operations
- **Vector Database**: ChromaDB for efficient semantic search
- **Lightweight LLM**: Ollama with phi3:3.8b(2.2GB) – perfect for MacBook Air
- **RAG Pipeline**: Retrieval-Augmented Generation ensures factual, grounded responses
- **TF-IDF Embeddings**: Fast, efficient text embeddings without GPU requirements
- **Type-Safe**: Full TypeScript implementation with Zod validation
- **Scalable Design**: Microservices architecture ready for production deployment

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Optional)                       │
│                  React / Next.js / Vue                       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Node.js/Express/TypeScript Backend              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Routes     │  │ Controllers  │  │  Middleware  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────┬────────────────────┬────────────────────────────┘
            │                    │
            ▼                    ▼
┌──────────────────┐   ┌─────────────────────────┐
│   ChromaDB       │   │  Python Microservice    │
│  Vector Store    │   │  ┌──────────────────┐   │
│                  │   │  │ Ollama (Phi-3)   │   │
│  - Embeddings    │   │  │ LLM Generation   │   │
│  - Semantic      │   │  └──────────────────┘   │
│    Search        │   │  ┌──────────────────┐   │
└──────────────────┘   │  │ TF-IDF Embedder  │   │
                       │  │ Text Processing  │   │
                       │  └──────────────────┘   │
                       │  ┌──────────────────┐   │
                       │  │ Doc Processors   │   │
                       │  │ PDF/DOCX/TXT     │   │
                       │  └──────────────────┘   │
                       └─────────────────────────┘
```

### Components

1. **Express Backend (Node.js/TypeScript)**
   - RESTful API endpoints
   - File upload handling
   - Request validation & error handling
   - Business logic orchestration

2. **Python Microservice**
   - Text embedding generation (TF-IDF)
   - LLM response generation (Ollama)
   - Document processing (PDF, DOCX, TXT)
   - Text chunking and preprocessing

3. **ChromaDB Vector Store**
   - Stores document embeddings
   - Performs similarity search
   - Retrieves relevant context

4. **Ollama + phi3:3.8b**
   - Lightweight language model
   - Context-aware response generation
   - Runs locally on CPU

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **Python** 3.11+ ([Download](https://www.python.org/downloads/))
- **Ollama** ([Install Guide](https://ollama.ai/))
- **Git** ([Download](https://git-scm.com/))

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/nit-rourkela-cs-chatbot.git
cd nit-rourkela-cs-chatbot
```

#### 2️⃣ Install Ollama and Download phi3:3.8b

```bash
# Install Ollama (macOS)
brew install ollama

# Start Ollama service
ollama serve

# In a new terminal, pull phi3:3.8b model
ollama pull phi3:3.8b
```

#### 3️⃣ Setup Python Microservice

```bash
cd python_service

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# OR
.\venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

cd ..
```

#### 4️⃣ Setup Node.js Backend

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration (optional)
```

#### 5️⃣ Add Knowledge Base

Create your department data file:

```bash
# Create knowledge base directory
mkdir -p knowledge_base

# Add your department_data.json file
# (See knowledge_base/department_data.json.example)
```

---

## 🎮 Running the Application

### Option 1: Automated Start (Recommended)

```bash
chmod +x start-all.sh
./start-all.sh
```

### Option 2: Manual Start (3 Terminals)

**Terminal 1 - Ollama:**
```bash
ollama serve
```

**Terminal 2 - Python Service:**
```bash
cd python_service
source venv/bin/activate
python app.py
```

**Terminal 3 - Node.js Backend:**
```bash
npm run dev
```

The API will be available at: **http://localhost:8000**

---

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "services": {
    "python": "healthy",
    "vectorStore": "healthy"
  },
  "vectorStore": {
    "documentsCount": 150
  },
  "model": "phi3:3.8b"
}
```

#### 2. Query Chatbot
```http
POST /query
Content-Type: application/json

{
  "query": "What are the M.Tech specializations available?"
}
```

**Response:**
```json
{
  "answer": "The M.Tech program offers three specializations: 1) Artificial Intelligence and Machine Learning (AIML), 2) Data Science and Analytics (DSA), and 3) Cybersecurity (CS). Each specialization has 20 seats available.",
  "sources": [
    {
      "text": "specializations: [{ name: 'Artificial Intelligence and Machine Learning'...",
      "metadata": {
        "source": "knowledge_base",
        "type": "json",
        "category": "programs.mtech"
      }
    }
  ],
  "processingTime": 1523
}
```

#### 3. Upload Document
```http
POST /upload
Content-Type: multipart/form-data

file: [PDF/DOCX/TXT/JSON file]
```

**Response:**
```json
{
  "success": true,
  "message": "Document uploaded and processed successfully",
  "filename": "faculty_details.pdf",
  "chunksCreated": 45
}
```

#### 4. Load Knowledge Base
```http
POST /load-knowledge-base
```

**Response:**
```json
{
  "success": true,
  "message": "Knowledge base loaded successfully",
  "documentsLoaded": 150
}
```

#### 5. Get Statistics
```http
GET /stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "count": 150
  }
}
```

#### 6. Clear Knowledge Base
```http
DELETE /knowledge-base
```

---

## 🧪 Testing

### Using cURL

```bash
# Test health
curl http://localhost:8000/api/v1/health

# Load knowledge base
curl -X POST http://localhost:8000/api/v1/load-knowledge-base

# Query the chatbot
curl -X POST http://localhost:8000/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Who teaches Machine Learning?"}'

# Upload a document
curl -X POST http://localhost:8000/api/v1/upload \
  -F "file=@/path/to/document.pdf"
```

### Example Queries

Try asking:
- "What are the research areas in the CS department?"
- "Who is Dr. Rajesh Kumar?"
- "List all faculty members specializing in AI"
- "What courses are offered in Cybersecurity?"
- "Tell me about the Data Science lab"
- "What is the placement record?"

---

## 📁 Project Structure

```
nit-rourkela-cs-chatbot/
├── src/                          # Node.js/TypeScript source
│   ├── config/                   # Configuration files
│   ├── controllers/              # Route controllers
│   ├── routes/                   # API routes
│   ├── services/                 # Business logic
│   │   ├── vectorStore.ts        # ChromaDB integration
│   │   ├── pythonService.ts      # Python service client
│   ├── middleware/               # Express middleware
│   ├── types/                    # TypeScript types
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── python_service/               # Python microservice
│   ├── venv/                     # Virtual environment
│   ├── app.py                    # Flask application
│   └── requirements.txt          # Python dependencies
├── knowledge_base/               # Department data
│   └── department_data.json      # Main knowledge base
├── uploads/                      # Uploaded documents
├── chroma_db/                    # ChromaDB storage
├── .env                          # Environment variables
├── package.json                  # Node.js dependencies
├── tsconfig.json                 # TypeScript configuration
├── start-all.sh                  # Startup script
└── README.md                     # This file
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=8080

# Service URLs
PYTHON_SERVICE_URL=http://localhost:5001

# Paths
UPLOAD_DIR=./uploads
KNOWLEDGE_BASE_DIR=./knowledge_base
CHROMA_DB_PATH=./chroma_db

# Ollama Configuration
OLLAMA_MODEL=phi3:3.8b
OLLAMA_BASE_URL=http://localhost:11434

# Vector Store Settings
CHUNK_SIZE=500
CHUNK_OVERLAP=50
TOP_K_RESULTS=5
EMBEDDING_MODEL=TF-IDF
```

---

## 🎯 Use Cases

### For Students
- Quick access to course information and prerequisites
- Find faculty expertise for project guidance
- Learn about available specializations and research areas
- Get information about labs and facilities

### For Faculty
- Share updated research information
- Provide course details and syllabi
- Announce office hours and availability

### For Administrators
- Maintain up-to-date department information
- Handle routine queries automatically
- Reduce administrative workload

### For Prospective Students
- Learn about programs and specializations
- Understand admission requirements
- Explore research opportunities

---

## 🚀 Deployment

### Docker (Coming Soon)

```bash
docker-compose up -d
```

### PM2 (Production)

```bash
# Build TypeScript
npm run build

# Start with PM2
pm2 start ecosystem.config.js
```

### Cloud Deployment

The chatbot can be deployed on:
- **AWS**: EC2, ECS, or Lambda
- **Google Cloud**: Compute Engine or Cloud Run
- **Azure**: Virtual Machines or Container Instances
- **DigitalOcean**: Droplets or App Platform

---

## 🔮 Roadmap

- [ ] Frontend web interface (React)
- [ ] User authentication and session management
- [ ] Conversation history and memory
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Admin dashboard for knowledge base management
- [ ] Analytics and usage statistics
- [ ] Integration with department website
- [ ] Mobile application (Flutter/React Native)
- [ ] Advanced semantic search with sentence-transformers

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow TypeScript/Python best practices
- Add tests for new features
- Update documentation
- Ensure code passes linting
- Write clear commit messages

---

## 🐛 Troubleshooting

### Common Issues

**1. Ollama not responding**
```bash
# Check if Ollama is running
ps aux | grep ollama

# Restart Ollama
killall ollama
ollama serve
```

**2. Python service fails to start**
```bash
# Check Python version
python3 --version  # Should be 3.11+

# Reinstall dependencies
cd python_service
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**3. ChromaDB errors**
```bash
# Clear ChromaDB database
rm -rf chroma_db
mkdir chroma_db
```

**4. Port already in use**
```bash
# Find process using port 8080
lsof -i :8000

# Kill the process
kill -9 <PID>
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Sanju Maity**
- M.Tech Computer Science Engineering
- National Institute of Technology Rourkela
- GitHub: [@sanju_it13](https://github.com/sanju_it13)

---

## 🙏 Acknowledgments

- **NIT Rourkela CS Department** for the inspiration
- **Ollama** for the amazing local LLM infrastructure
- **ChromaDB** for the efficient vector database
- **Anthropic** for Claude assistance in development
- Open-source community for the incredible tools

---

## 📞 Support

Having issues? Need help?

- 📧 Email: sanjumaity099@gmail.com

---

<div align="center">

**Made with ❤️ at NIT Rourkela**

⭐ Star this repo if you find it helpful!

[Back to Top](#-nit-rourkela-cs-department-chatbot)

</div>
