import { useQuestionStore } from "../store/questions.js";

export default function ResultPage() {
    const finalScore = useQuestionStore.getState().getFinalScore(useQuestionStore.getState());
    const totalOfQuestions = useQuestionStore.getState().questions.length;

    return (
        <>
            <p>{finalScore}/{totalOfQuestions}</p>
        </>
    );
}
