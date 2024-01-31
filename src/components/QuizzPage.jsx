import {useCounterStore} from "../store/questions.js";

export default function QuizPage(){
    const { count, increment } = useCounterStore();
    return(
        <>
            <p>{count}</p>
        </>
    )
}