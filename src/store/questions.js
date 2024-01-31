import {create} from "zustand";

export const useQuestionStore = create((set) => ({
    questions: [],
    addQuestion: (newQuestion) => set((state) => {
        const existingIndex = state.questions.findIndex(question => question.id === newQuestion.id);
        if (existingIndex !== -1) {
            const updatedQuestions = [...state.questions];
            updatedQuestions[existingIndex] = newQuestion;
            return { questions: updatedQuestions };
        } else {
            return { questions: [...state.questions, newQuestion] };
        }
    }),
    getFinalScore: (state) => {
        return state.questions.reduce((count, question) => {
            if (question.isCorrect) {
                return count + 1;
            }
            return count;
        }, 0);
    }
}));