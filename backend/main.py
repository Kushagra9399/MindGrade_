import os
import json
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel

from groq import Groq

from schemas import Question, UserResponse, MarkingScheme, QuizResult

from mangum import Mangum

load_dotenv()

client = Groq(api_key=os.environ["GROQ_API_KEY"])

MODEL_NAME = "openai/gpt-oss-120b"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateQuizRequest(BaseModel):
    topic: str
    difficulty: str
    count: int = 5
    classLevel: str = "10"


class EvaluateQuizRequest(BaseModel):
    questions: List[Question]
    userResponses: List[UserResponse]
    markingScheme: MarkingScheme


def normalize_latex(text: str):
    text = text.replace("\\\\", "\\")
    text = text.replace("\\(", "$").replace("\\)", "$")
    text = text.replace("\\[", "$$").replace("\\]", "$$")
    return text


def normalize_json(obj):
    if isinstance(obj, dict):
        return {k: normalize_json(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [normalize_json(v) for v in obj]
    if isinstance(obj, str):
        return normalize_latex(obj)
    return obj


def call_groq(prompt: str):
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "Return strictly valid JSON only. Do not wrap in markdown. Use $...$ for inline LaTeX and $$...$$ for block LaTeX. Never use \\( \\) or \\[ \\].",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
    )

    content = response.choices[0].message.content.strip()

    print("\nRAW MODEL OUTPUT:\n", content)

    if content.startswith("```"):
        parts = content.split("```")
        if len(parts) >= 2:
            content = parts[1]

    content = content.replace("json", "").strip()

    parsed = json.loads(content)

    parsed = normalize_json(parsed)

    return parsed


@app.post("/generate-quiz", response_model=List[Question])
async def generate_quiz(request: GenerateQuizRequest):
    prompt = f"""
Generate {request.count} competitive multiple-choice questions.

Topic: {request.topic}
Difficulty: {request.difficulty}
Class Level: {request.classLevel}

Rules:

Use LaTeX compatible with MathJax.

All math expressions MUST be wrapped with $...$ for inline math or $$...$$ for block math.

NEVER use \\( \\) or \\[ \\].

Examples:
$\\sqrt{{3}}$
$\\frac{{a}}{{b}}$
$\\tan^{{-1}}(x)$

Use a SINGLE backslash for LaTeX commands.

Units must be outside math.

Correct: $30$ cm  
Wrong: $30\\text{{cm}}$

Each question must:
- require reasoning
- have 4 options
- exactly one correct answer
- include reasoning using LaTeX where needed

Return ONLY valid JSON.

Structure:

[
  {{
    "id": "Q1",
    "text": "question text",
    "options": [
      {{ "id": "A", "text": "option" }},
      {{ "id": "B", "text": "option" }},
      {{ "id": "C", "text": "option" }},
      {{ "id": "D", "text": "option" }}
    ],
    "correctOptionId": "A",
    "correctReasoning": "step-by-step reasoning"
  }}
]
"""

    try:
        parsed = call_groq(prompt)

        print("\nQuestions Generated:\n", parsed)
        questions = []

        for q in parsed:
            q["options"] = [
                {"id": opt["id"], "text": opt["text"]} for opt in q["options"]
            ]
            questions.append(Question(**q))

        return questions

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/evaluate-quiz", response_model=QuizResult)
async def evaluate_quiz(request: EvaluateQuizRequest):
    data_for_ai = []

    for q in request.questions:
        user_resp = next(
            (ur for ur in request.userResponses if ur.questionId == q.id), None
        )

        data_for_ai.append(
            {
                "questionId": q.id,
                "questionText": q.text,
                "options": [opt.dict() for opt in q.options],
                "correctOptionId": q.correctOptionId,
                "goldenReasoning": q.correctReasoning,
                "userSelectedOptionId": user_resp.selectedOptionId
                if user_resp
                else "NO_ANSWER",
                "userReasoning": user_resp.reasoning if user_resp else "NO_REASONING",
            }
        )

    prompt = f"""
Evaluate student responses.

Scoring Rules:

Correct Answer: +{request.markingScheme.answerPoints}  
Incorrect Answer: -{request.markingScheme.negativeMarking}  
Not Attempted: 0  

Max reasoning score: {request.markingScheme.reasonPoints}

Evaluation Instructions:

Compare the student's reasoning with the correct reasoning.

Give partial credit for correct intermediate logic.

Provide helpful feedback.

Use LaTeX compatible with MathJax.

All math expressions MUST use $...$ or $$...$$.

NEVER use \\( \\) or \\[ \\].

Examples:
$\\sqrt{{x}}$
$\\frac{{a}}{{b}}$
$\\tan^{{-1}}(x)$

Units must be outside math.

Correct: $30$ cm  
Wrong: $30\\text{{cm}}$

Return ONLY JSON.

Structure:

{{
  "evaluations": [
    {{
      "questionId": "string",
      "answerScore": number,
      "reasonScore": number,
      "totalScore": number,
      "isAnswerCorrect": boolean,
      "reasonFeedback": "string",
      "correctReasoning": "string",
      "correctOptionId": "string"
    }}
  ],
  "totalScore": number,
  "maxScore": number,
  "summary": "string"
}}

Data:
{json.dumps(data_for_ai, indent=2)}
"""

    try:
        parsed = call_groq(prompt)

        print("\nEvaluation Result:\n", parsed)

        return QuizResult(**parsed)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


handler = Mangum(app)
