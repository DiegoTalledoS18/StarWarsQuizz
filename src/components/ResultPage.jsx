import { useQuestionStore } from "../store/questions.js";

export default function ResultPage() {
    const finalScore = useQuestionStore.getState().getFinalScore(useQuestionStore.getState());

    return (
        <>
            <p>{finalScore}</p>
        </>
    );
}
