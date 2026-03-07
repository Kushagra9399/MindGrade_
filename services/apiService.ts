import { Question, UserResponse, QuizResult, MarkingScheme } from "../types";

// Use environment variable for backend URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const generateQuiz = async (
  topic: string,
  difficulty: string,
  count: number = 5,
  classLevel: string = "10"
): Promise<Question[]> => {
  try {
    const response = await fetch(`${BASE_URL}/generate-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic,
        difficulty,
        count,
        classLevel
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate quiz");
    }

    return (await response.json()) as Question[];

  } catch (error) {
    console.error("Quiz Generation Error:", error);
    throw error;
  }
};


/**
 * evaluateQuiz
 * Same function name
 * Same return type
 * Now calls backend
 */
export const evaluateQuiz = async (
  questions: Question[],
  userResponses: UserResponse[],
  markingScheme: MarkingScheme
): Promise<QuizResult> => {

  try {
    const response = await fetch(`${BASE_URL}/evaluate-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questions,
        userResponses,
        markingScheme
      })
    });

    if (!response.ok) {
      throw new Error("Failed to evaluate quiz");
    }

    return (await response.json()) as QuizResult;

  } catch (error) {
    console.error("Evaluation Error:", error);
    throw error;
  }
};