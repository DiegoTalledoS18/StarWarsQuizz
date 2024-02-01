import {NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Box, Button, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {createQuestion} from "../store/question.d.js"
import {useQuestionStore} from "../store/questions.js";

export default function QuestionPage() {
    const navigate = useNavigate();
    const { questionId } = useParams(); // Obtener el questionId de los parámetros de ruta
    const [answer, setAnswer] = useState(undefined);
    const [question, setQuestion] = useState(createQuestion);
    useEffect(() => {
        if (parseInt(questionId) > 5) {
            navigate('/score');

        }else{
            const fetchQuestion = async () => {
                try {
                    const response = await fetch(`https://my-json-server.typicode.com/DiegoTalledoS18/StarWarsQuizzJson/questions/${questionId}`);
                    if (!response.ok) {
                        throw new Error('No se pudo obtener la pregunta');
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    return error;
                }
            };

            fetchQuestion().then(r => {
                setQuestion(r);
            }); // Llamar a la función de fetch cuando cambie questionId
        }


    }, [questionId]);

    const evaluateAnswer = (index) => {
        if(question.userSelectedAnswer === undefined){
            setAnswer(index);

            setQuestion(prevQuestion => {
                const updatedQuestion = { ...prevQuestion };

                updatedQuestion.userSelectedAnswer = index;
                updatedQuestion.isCorrect = index === updatedQuestion.answer;

                return updatedQuestion;
            });
        }else {
            return 0
        }

    }
    const getNextPage=()=>{
        if(question.userSelectedAnswer !== undefined){
            useQuestionStore.getState().addQuestion(question)
            let pageId=parseInt(questionId)+1
            navigate("/question/"+pageId);
        }
    }
    const getButtonColor = (index,font) => {
        if (question.userSelectedAnswer !== undefined) {
            if (index === question.userSelectedAnswer) {
                if(font===true){
                    return '#FFFF'
                }
                if(question.userSelectedAnswer === question.answer){
                    return 'rgba(0, 255, 0, 0.5)'
                }else {
                    return 'rgba(255, 0, 0, 0.5)'
                }
            } else {
                return '';
            }
        } else {
            return '';
        }

    }
    const getLastPage=()=>{
        if(questionId>1){
            let pageId=parseInt(questionId)-1
            return "/question/"+pageId
        }else{
            return "/"
        }

    }
    return (
        <>
            <Typography variant="h4" component="h2" >{questionId}.{question.question}</Typography>
            <Box sx={{display:"flex",flexDirection:"column"}}>
                {question.alternatives.map((alternative, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        sx={{
                            cursor: (question.userSelectedAnswer === undefined) ? "pointer" : "default",
                            color: getButtonColor(index,true),
                            border: `1px ${getButtonColor(index,false)} solid`,
                            backgroundColor: getButtonColor(index,false),
                            mt: 2,
                        }}
                        onClick={() => evaluateAnswer(index)}
                    >
                        {alternative}
                    </Button>
                ))}
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                <Button variant="contained"
                        sx={{mt:2,width:"100%"}}
                        disabled={question.userSelectedAnswer === undefined}
                        onClick={ ()=>getNextPage()}>SIGUIENTE</Button>
            </Box>
        </>
    );
}