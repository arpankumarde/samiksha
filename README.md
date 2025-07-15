# Samiksha AI

**AI-Driven Presentation Evaluation Platform**  
Empowering students with instant, actionable feedback on presentations using cutting-edge Google technologies.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Evaluation Types & Criteria](#evaluation-types--criteria)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)

## Overview

**Samiksha AI** is a prototype web application designed to address the lack of detailed, consistent feedback on student presentations. Built for colleges and educational institutions, it employs Google’s AI and cloud platforms to automatically analyze uploaded presentations (slides, voiceovers, or videos) and generate comprehensive, constructive feedback based on a transparent rubric.

## Features

- **Automated Presentation Evaluation:**  
  Upload presentation videos or files (PPT/PDF), analyzed in real time by Google Gemini AI.

- **Detailed, Rubric-Based Reports:**  
  Feedback broken down by criteria like content, slide design, delivery, engagement, and more, with weighted scoring.

- **AI Chat Assistant:**  
  Integrated AI chat powered by Gemini, helping users better understand feedback and get presentation advice.

- **Progress Tracking:**  
  Dashboard visualizes improvement with history comparison and goal setting.

- **Secure Cloud Storage:**  
  User submissions and reports stored and managed securely in Firebase.

## System Architecture

- **Frontend:**  
  Modern web interface (React/Next).

- **Backend:**  
  Firebase for authentication, and Nextjs API orchestration.

- **AI Services:**  
  Google Gemini API & AI Studio for feedback generation and evaluation.

- **Cloud Storage & Database:**  
  Firebase Studio for file/data persistence.

- **Chat Functionality:**  
  Contextual chat powered by Gemini, accessible from the feedback and dashboard screens.

## Evaluation Types & Criteria

Presentation uploads are classified, each with tailored scoring:

| Enum                   | SLIDES_ONLY | VOICE_OVER | FACE_VISIBLE | FACE_PLUS_SCREEN |
| ---------------------- | :---------: | :--------: | :----------: | :--------------: |
| CONTENT_QUALITY        |     50      |     40     |      35      |        30        |
| SLIDE_DESIGN           |     30      |     20     |      15      |        15        |
| STRUCTURE_FLOW         |     20      |     15     |      10      |        10        |
| VOICE_CLARITY_DELIVERY |      —      |     25     |      20      |        15        |
| ENGAGEMENT_EXPRESSION  |      —      |     —      |      10      |        10        |
| BODY_LANGUAGE          |      —      |     —      |      10      |        10        |
| VISUAL_ENGAGEMENT      |      —      |     —      |      —       |        10        |
| TECHNICAL_QUALITY      |      —      |     —      |      —       |        10        |

_Scores are out of 100, adjusted to submission type. Feedback for each criterion is actionable and detailed._

## Technology Stack

- **Frontend:** React/Next.js
- **Backend:** Next Js/Firebase
- **AI/ML:** Google Gemini API, Google AI Studio
- **Storage & Database:** Firebase Studio
- **Development Environment:** Google IDX Studio

## Setup & Installation

> **Prerequisite:** Access to Google Cloud, Firebase project, Gemini API credentials, and IDX Studio.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/samiksha-ai.git
   cd samiksha-ai
   ```
2. **Configure environment variables:**

   - Add Firebase, Gemini, and other API keys in a `.env` file.

3. **Run App:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

Samiksha AI empowers learners by providing immediate, actionable, and unbiased feedback using the latest advances in Google's AI and cloud ecosystem.
