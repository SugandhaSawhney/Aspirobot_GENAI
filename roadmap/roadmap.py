import os
import streamlit as st
from dotenv import load_dotenv
import google.generativeai as genai
from streamlit_mermaid import st_mermaid

# --- Page Settings ---
st.set_page_config(page_title="Aspirobot Goal Roadmap", layout="centered")

# --- Custom Styling ---
st.markdown("""
   <style>
    @import url(
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
    );
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
        background-color: #0f0e1f;
        color: white;
    }

    .title {
        text-align: center;
        font-size: 38px;
        font-weight: 700;
        margin-bottom: 5px;
        background: linear-gradient(to right, #d38bff, #533bea);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .subtitle {
        text-align: center;
        font-size: 16px;
        color: #cccccc;
        margin-bottom: 40px;
    }

    .card {
        background: rgba(28, 27, 58, 0.85);
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 0 30px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
    }

    .stTextInput > div > div > input {
        background-color: #25244a !important;
        color: white !important;
        border-radius: 10px !important;
        padding: 0.6rem 1rem;
        border: 1px solid #4f46e5 !important;
    }

    .stButton > button {
        background: linear-gradient(to right, #6a5af9, #8c3eff);
        color: white;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        border-radius: 10px;
        border: none;
        transition: all 0.3s ease;
    }

    .stButton > button:hover {
        filter: brightness(1.1);
        transform: scale(1.02);
    }

    .result-box {
        background-color: #1f1f3f;
        padding: 20px;
        margin-top: 20px;
        border-radius: 12px;
        color: #eee;
        white-space: pre-wrap;
        box-shadow: 0 0 15px rgba(0,0,0,0.4);
    }

    footer {
        text-align: center;
        color: #888;
        padding-top: 40px;
        font-size: 14px;
    }
    </style>
""", unsafe_allow_html=True)

# --- Load Gemini ---
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    st.error("GEMINI_API_KEY not found in .env file.", icon="🚨")
    st.stop()

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# --- Mermaid Sanitizer ---


def sanitize_mermaid_code(code: str) -> str:
    lines = code.strip().splitlines()
    clean_lines = []

    for line in lines:
        if not line.strip():
            continue
        if (
            line.startswith("graph")
            or "-->" in line
            or "subgraph" in line
            or line.strip() == "end"
        ):

            clean_lines.append(line)
        else:
            cleaned = line
            for ch in ['(', ')', '[', ']', ':', "'", '"', '*', '`']:
                cleaned = cleaned.replace(ch, '')
            clean_lines.append(cleaned)

    return "\n".join(clean_lines)

# --- Roadmap Generator ---


def generate_mermaid_roadmap(skill):
    prompt = (
        f"You are an expert career and exam roadmap designer. "
        f"Generate a valid Mermaid.js flowchart roadmap for the goal:"
        f"\"{skill}\".\n\n"

        "Instructions:\n"
        "1. Begin with graph TD to define a top-down roadmap.\n"
        "2. Divide the roadmap into 3–5 stages like: 'Getting Started', "
        "'Core Concepts', 'Advanced Skills', 'Revision', 'Final Prep'.\n"
        "3. Each stage should include 2–4 key steps or milestones.\n"
        "4. For each step, include a short label and "
        "suggest at least one platform "
        "in parentheses (e.g., \"Data Structures (GeeksforGeeks)\").\n"
        "5. Use top-down arrows: A --> B --> C.\n"
        "6. Enclose labels with spaces in double quotes.\n"
        "7. CRITICAL: Only return valid Mermaid code starting with graph TD. "
        "Do not include explanations or formatting.\n"
        "8. Output must be renderable in Mermaid with NO syntax errors.\n"
    )
    try:
        response = model.generate_content([prompt])
        mermaid_code = response.text.strip()

        if "```mermaid" in mermaid_code:
            mermaid_code = mermaid_code.split("```mermaid")[1].split("```")[0]
        elif "```" in mermaid_code:
            mermaid_code = mermaid_code.replace("```", "").strip()

        if not mermaid_code.startswith("graph"):
            mermaid_code = "graph TD\n" + mermaid_code.strip()

        return mermaid_code

    except Exception as e:
        st.error(f"Error generating roadmap: {e}", icon="🔥")
        return None

# --- UI ---


st.markdown("<div class='title'>Your Path, AI-Planned</div>",
            unsafe_allow_html=True)
st.markdown("<div class='subtitle'>Create custom roadmaps for exams, careers, "
            "or any goal in seconds!</div>", unsafe_allow_html=True)

with st.container():
    skill = st.text_input("💡 What's your goal? ",
                          key="skill_input")

    if st.button("Generate Roadmap"):
        if not skill.strip():
            st.warning("Please enter a skill to generate a roadmap.", icon="⚠")
        else:
            with st.spinner("Generating your personalized roadmap..."):
                raw_roadmap = generate_mermaid_roadmap(skill)
                if raw_roadmap:
                    cleaned_roadmap = sanitize_mermaid_code(raw_roadmap)
                    st.success("Here is your roadmap:")
                    st_mermaid(cleaned_roadmap, height="600px")

                    st.markdown("### 📋 Mermaid Code (for customization):")
                    st.markdown(
                        f"<div class='result-box'>"
                        f"{cleaned_roadmap}"
                        f"</div>",
                        unsafe_allow_html=True
                    )
                else:
                    st.error("Failed to generate a roadmap. Please try again.")

# --- Footer ---
st.markdown(
    "<footer>"
    "Made with 💜 by Aspirobot • Powered by Google Gemini"
    "</footer>",
    unsafe_allow_html=True
)
