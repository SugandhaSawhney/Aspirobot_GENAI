# React + Vite
# Aspirobot

Aspirobot is a personalized AI-powered platform designed to help students and professionals take control of their career and learning journey. It provides resume analysis, AI-generated career roadmaps, and a smart chatbot assistant (Skillbot) to give tailored advice based on individual goals.

This is an ongoing project and will continue to evolve with new features and enhancements.

---

## 🔧 Current Project Status

- This project is still under development.
- The platform is **not deployed yet**. A live preview link will be added here once deployment is complete.
- **Resume Analyzer** has been developed and is deployed separately. Link is provided below.
    -(https://sugandhasawhney-resume-analyser-app-t8k4uk.streamlit.app/)
- Firebase Authentication (Google Sign-In and Email/Password) is present in the source code but **not connected yet**.
- Firestore database setup is also included in the code but not yet used in the live app.
- Styling has been done using **custom CSS in `index.css`**, instead of Tailwind CSS.

---

## 🌟 Features

### 1. Resume Analyzer

- Upload your resume and get real-time AI generated suggestions and ATS Score.
- Detects formatting, keyword issues, and structure-related improvements.
- Helps improve your ATS (Applicant Tracking System) score.
- Gives instant feedback to improve your chances of shortlisting.

🔗 Resume Analyzer is in a separate repository:  
(https://github.com/SugandhaSawhney/resume-analyser)

---

### 2. Career Roadmap Generator

- You can enter any career or learning goal 
- Based on your goal, an AI-generated visual roadmap is created.
- Roadmap includes:
  - 3 to 5 stages like Basics, Core Concepts, Advanced Topics, etc.
  - Platform suggestions
- Flowchart is created using Mermaid.js and displayed in a clean format.

---

### 3. Skillbot (NOVA)

- A smart chatbot that acts as a guide.
- You can chat with it like a normal assistant.
- Based on your input, it can:
  - Suggest career options
  - Recommend courses and certifications
  - Help you decide what to learn next
  - Clear doubts about tools, skills, or future roles
- Speech to text feature available
- Saves the chat memory 

> Unlike simple static suggestions, it generates **dynamic, AI-based responses** according to your interests.

---

## 🛠️ Tech Stack

| Area       | Tools Used               |
|------------|--------------------------|
| Frontend   | React.js, CSS            |
| Styling    | CSS (index.css)          |
| Backend    | Python, Streamlit        |
| AI APIs    | Google Gemini (LLM)      |
| Database   | Firestore (planned)      |
| Auth       | Firebase Auth (planned)  |
| Deployment | Vercel (planned)         |
| Visuals    | Mermaid.js               |

---

## 📁 Folder Structure
Aspirobot_GENAI/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── NovaBot.jsx
│ └── App.jsx
├── resume_analyser/ # Separate project, linked repo
├── .env # Not committed
├── .gitignore
├── index.css
└── README.md

## 📸 PREVIEW

## LandingPage 

<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/aff248fb-5692-42a6-a08f-b754197532b1" />
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/08f92074-1aa4-49d6-8a5a-9438021b3804" />
<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/a39b1a98-2190-41c6-8b78-e6316aed5417" />

## Dashboard 

<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/42f9e32c-99b1-47d0-a71b-2f990950113a" />
<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/73e20dce-3d87-423d-a170-8bf0e049e268" />

## Resume Analyser
<img width="1919" height="878" alt="image" src="https://github.com/user-attachments/assets/9e92c9ff-029f-4b53-91dd-5c93991e5f16" />
<img width="1919" height="862" alt="image" src="https://github.com/user-attachments/assets/5cffbf3a-8037-4a18-9c37-08a3dca9fb98" />
<img width="1916" height="867" alt="image" src="https://github.com/user-attachments/assets/4179e961-061f-43ad-88e4-85aa04bbf61b" />

## Roadmap Generator
<img width="1917" height="873" alt="image" src="https://github.com/user-attachments/assets/ffcad696-a39d-43a8-a4f0-bf30992c3fba" />
<img width="1919" height="857" alt="image" src="https://github.com/user-attachments/assets/198056d7-15e3-43e7-9f5b-d36434b8ec85" />

## NOVA: Skill Bot
<img width="1918" height="873" alt="image" src="https://github.com/user-attachments/assets/327da585-0cf9-4afc-87f7-8b8c78f15dc0" />
<img width="1055" height="849" alt="image" src="https://github.com/user-attachments/assets/198bf1da-7102-40f5-a6e8-2f33d1b751c4" />
<img width="1116" height="839" alt="image" src="https://github.com/user-attachments/assets/f6752b75-39c0-4969-ace7-b5acde418814" />
<img width="1020" height="848" alt="image" src="https://github.com/user-attachments/assets/e9b2467f-5128-4500-9c93-e72e43699f09" />
<img width="941" height="851" alt="image" src="https://github.com/user-attachments/assets/ef66668a-5910-401b-a911-373577d4629a" />


'''''''

##  How to Run Locally

### ✅ Prerequisites
- Node.js + npm
- Python 3.x
- Virtualenv (recommended)

---

### 1. Clone the Repository

git clone https://github.com/SugandhaSawhney/Aspirobot_GENAI.git
cd Aspirobot_GENAI

### 2. Start Frontend (React)
   
npm install
npm run dev

### 3. Resume Analyzer (Streamlit)

cd resume_analyser
pip install -r requirements.txt
streamlit run resume.py

### 4. Roadmap Generator (Streamlit)

cd roadmap
pip install -r requirements.txt
streamlit run roadmap.py

### Use your API keys in env file

## 📌 Note

This is a collaborative project built with a strong focus on clean UI, user-centered design, and real-time AI integration. The project is currently under development and will be updated with deployment links soon.
........





