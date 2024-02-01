import { useQuestionStore } from "../store/questions.js";
import {Box, Button, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

export default function ReviewQuestions() {
    const questions = useQuestionStore().questions;
    const getButtonColor = (index,font,question) => {
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
    return (
        <>
            {questions.map((itemQuestion, index) => (
                <Box>
                    <Typography variant="h4" component="h2" >{itemQuestion.id}.{itemQuestion.question}</Typography>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                        {itemQuestion.alternatives.map((alternative, itemQuestionIndex) => (
                            <Button
                                key={itemQuestionIndex}
                                variant="outlined"
                                sx={{
                                    cursor: (itemQuestion.userSelectedAnswer === undefined) ? "pointer" : "default",
                                    color: getButtonColor(itemQuestionIndex,true,itemQuestion),
                                    border: `1px ${getButtonColor(itemQuestionIndex,false,itemQuestion)} solid`,
                                    backgroundColor: getButtonColor(itemQuestionIndex,false,itemQuestion),
                                    mt: 2,
                                }}>
                                {alternative}
                            </Button>
                        ))}
                    </Box>

                </Box>

            ))}
            <Button variant="contained" sx={{mt:2}}
                    component={NavLink}
                    to="/score"
            >VOLVER</Button>
        </>
    );
}