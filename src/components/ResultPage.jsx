import { useQuestionStore } from "../store/questions.js";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

export default function ResultPage() {
    const finalScore = useQuestionStore.getState().getFinalScore(useQuestionStore.getState());
    const totalOfQuestions = useQuestionStore.getState().questions.length;

    return (
        <>
            <p>SCORE</p>
            <p>{finalScore/totalOfQuestions}</p>
            <p>Acertaste {finalScore} de {totalOfQuestions} preguntas</p>
            <Button variant="outlined" sx={{ color: '#F2BC02', border: '1px solid #F2BC02', mt:2}}
                    component={NavLink}
                    to="/review"
            >VER RESPUESTAS</Button>
            <Button variant="outlined" sx={{ color: '#F2BC02', border: '1px solid #F2BC02', mt:2}}
                    component={NavLink}
                    to="/"
            >VOLVER AL INICIO</Button>
        </>
    );
}
