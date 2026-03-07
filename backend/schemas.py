from pydantic import BaseModel
from typing import List, Optional


class Option(BaseModel):
    id: str
    text: str


class Question(BaseModel):
    id: str
    text: str
    options: List[Option]
    correctOptionId: str
    correctReasoning: str


class UserResponse(BaseModel):
    questionId: str
    selectedOptionId: Optional[str] = None
    reasoning: Optional[str] = None


class MarkingScheme(BaseModel):
    answerPoints: float
    negativeMarking: float
    reasonPoints: float


class Evaluation(BaseModel):
    questionId: str
    answerScore: float
    reasonScore: float
    totalScore: float
    isAnswerCorrect: bool
    reasonFeedback: str
    correctReasoning: str
    correctOptionId: str


class QuizResult(BaseModel):
    evaluations: List[Evaluation]
    totalScore: float
    maxScore: float
    summary: str
