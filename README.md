# SCAI

**Where vision becomes understanding.**

SCAI is an Electron desktop assistant that captures your screen, runs OCR locally with Tesseract.js, and pipes extracted text to Groq for instant insights and actions. It transforms whatever is on your screen into something you can talk to—errors, logs, dashboards, docs, or any UI.

## What is SCAI?

SCAI is an AI-powered screen intelligence platform that helps you understand and interact with anything displayed on your screen. Whether you're debugging code, reading documentation, analyzing errors, or exploring dashboards, SCAI can capture, read, and explain what you're looking at.

## Features

### ⌨️ Global Hotkey Capture
Press `Ctrl/Cmd + Shift + X` from anywhere to capture your screen and run OCR instantly. Use `Ctrl/Cmd + Shift + P` to hide/show the window.

### 💬 Interactive Q&A Chat
Ask questions about your screen and get grounded answers using your capture as context. Quick action buttons for common queries.

### 💾 Persistent Chat History
All conversations are saved locally and persist across sessions. Search through chat names and message content instantly.

### 📋 Organize Your Chats
Drag-to-reorder chats, rename by double-clicking, and toggle sidebar visibility for more screen space.

### 🔍 Context-Aware Diagnostics
Automatic error detection with root cause analysis, actionable recommendations, and fix snippets you can paste directly.

### 📎 File Uploads & Previews
Upload files and see text/OCR previews before sending. Code copy buttons for one-click copying of code blocks.

### 🔒 Sensitive Data Redaction
Emails, API keys, JWTs, and private keys are automatically stripped before sending to AI.

### 📝 Smart Summarization
Long OCR text is summarized locally while preserving stack traces, errors, and code blocks.

### ✨ Markdown Rendering
Beautiful rendering of code blocks, headers, lists, and inline code with syntax highlighting and copy buttons.

## How It Works

1. **Capture your screen** - Press `Ctrl/Cmd + Shift + X`. SCAI captures your screen, renders it to a canvas, and passes it to Tesseract.js for OCR.

2. **Local OCR processing** - Text is extracted locally using Tesseract.js. OCR output appears instantly in the left panel with copy buttons.

3. **Ask questions & get insights** - Redacted text is sent to Groq. Get explanations, summaries, code fixes, and context-aware diagnostics in seconds.

4. **Manage your chats** - All conversations are saved locally. Search, reorder, rename, and organize your chats. Everything persists across sessions.

## Prerequisites

- **Node.js 18+** (for development)
- **Groq API Key** - Required for AI functionality

## Setup & Installation

### Development Setup

If you want to build from source:

1. Clone the repository:
   ```bash
   git clone https://github.com/Cmk31311/ScreenAI-app.git
   cd ScreenAI-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and set GROQ_API_KEY=your_real_key
   ```

4. Run in development mode:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Security & Privacy

- **Local OCR** - OCR runs on your machine. Only the cleaned-up text is sent to the AI API.
- **Redacted by default** - SCAI automatically scrubs emails, tokens, and private keys before sending anything over the wire.
- **Local storage & privacy** - All chat sessions are stored locally in your browser's storage. See exactly what's being sent to Groq so you stay in control of your data.

## Website

This repository contains the landing page for SCAI. The website is built with plain HTML, CSS, and vanilla JavaScript—no build tools required.
