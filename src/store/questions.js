import { create } from "zustand";
const Question = {
    id: 0,
    question: '',
    alternatives: [],
    answer: 0,
    userSelectedAnswer: undefined,
    isCorrect: undefined
};
export const useCounterStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}));
