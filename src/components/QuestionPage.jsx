import {NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Box, Button, Grid, styled, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {createQuestion} from "../store/question.d.js"
import {useQuestionStore} from "../store/questions.js";
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
import Tatooine from "../assets/tatooine.png";
import Asteroids from "../assets/asteroids.png";
import Asteroid from "../assets/Asteroid.png";
import SDOT from "../assets/SDOT.png";
import TwoSuns from "../assets/two_suns.png";
import {makeStyles} from "@material-ui/core/styles";
import StarsBackground from "../assets/stars.png";
import SD_L from "../assets/sd_1.png";

const useStyles = makeStyles({
    root: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function QuestionPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { questionId } = useParams();
    const [totalOfQuestions, setTotalOfQuestions] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [answer, setAnswer] = useState(undefined);
    const [question, setQuestion] = useState(createQuestion);
    const Img= styled("img")({
    })
    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`https://my-json-server.typicode.com/DiegoTalledoS18/StarWarsQuizzJson/questions/`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la pregunta');
                }
                const data = await response.json();
                return data.length; // Aquí obtén la longitud de los datos
            } catch (error) {
                console.error('Error al obtener las preguntas:', error);
                return 0; // Si ocurre un error, devolvemos 0
            }
        };

        fetchQuestions().then(length => {
           setTotalOfQuestions(length)
        });
    }, []);


    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    useEffect(() => {
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

    }, [questionId]);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
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
            if (parseInt(questionId) >= totalOfQuestions) {
                navigate('/score');

            }else{
                navigate("/question/"+pageId);
            }
        }


    }
    const getButtonColor = (index,font,windowHeight,background) => {
        if(background && windowHeight<=1050 && question.userSelectedAnswer === undefined){
            return 'rgba(0,0,0,0.5)'
        }
        else {
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


    }
    const calculateBlur = (yPosition, windowHeight) => {
        if(windowHeight<450){
            return "0px"
        }else {
            const distanceFromCenter = Math.abs(yPosition - windowHeight / 2);
            const maxBlur = 0.8;
            const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
            const blurValue = blurFactor * maxBlur;
            return `${blurValue}px`;
        }

    };
    const calculateLeftBlur = (yPosition, windowHeight) => {
        const distanceFromCenter = Math.abs(yPosition - windowHeight / 6);
        const maxBlur = 1.5;
        const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
        const blurValue = blurFactor * maxBlur;
        return `${blurValue}px`;
    };
    const calculatePhraseVariant = (windowWidth) => {
        if (windowWidth < 660) {
            return "h6";
        } else if (windowWidth < 970) {
            return "h5";
        } else {
            return "h4";
        }
    };
    const calculateRightBlur = (yPosition, windowHeight) => {
        const distanceFromCenter = Math.abs(yPosition - windowHeight +400);
        const maxBlur = 1.5;
        const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
        const blurValue = blurFactor * maxBlur;
        return `${blurValue}px`;
    };
    return (
        <>
            <Grid className={classes.root}>
                <MouseParallaxContainer
                    className="parallax"
                    containerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    globalFactorX={0.3}
                    globalFactorY={0.3}
                    resetOnLeave
                >
                    <MouseParallaxChild
                        factorX={0.05}
                        factorY={0.1}
                        style={{
                            backgroundImage: `url(${StarsBackground})`,
                            backgroundPositionY: "50%",
                            transform: "scale(1.2)",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden"
                        }}
                    />
                    <MouseParallaxChild
                        factorX={0.055}
                        factorY={0.1}
                        style={{
                            display: `${(window.innerWidth<=500) ? "none": "block"}`,
                            backgroundImage: `url(${TwoSuns})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPositionX: "left",
                            backgroundPositionY: "top",
                            position: "absolute",
                            transform: `scale(1)`,
                            width: "100%",
                            height: "100%",
                            filter: `blur(${calculateLeftBlur(mousePosition.x, window.innerWidth)})`
                        }}
                    />
                    <MouseParallaxChild
                        factorX={0.055}
                        factorY={0.1}
                        style={{
                            display: `${(window.innerWidth<=500) ? "none": "block"}`,
                            backgroundImage: `url(${Tatooine})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "calc(90%) center", // 100px a la izquierda del borde derecho y centrado verticalmente
                            transform: `scale(1)`,
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden"
                        }}
                    />
                    <MouseParallaxChild
                        factorX={0.06}
                        factorY={0.08}
                        style={{
                            backgroundImage: `url(${Asteroids})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "calc(99.5%) calc(61%)", // 100px hacia abajo del borde superior y centrado horizontalmente
                            transform: "scale(1)",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden"
                        }}
                    />
                    <MouseParallaxChild
                        factorX={0.08}
                        factorY={0.08}
                        style={{
                            backgroundImage: `url(${SDOT})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "calc(70%) calc(55%)", // 100px hacia abajo del borde superior y centrado horizontalmente
                            transform: "scale(1)",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            filter: `blur(${calculateRightBlur(mousePosition.x, window.innerWidth)})`
                        }}
                    />
                    <MouseParallaxChild
                        factorX={0.1}
                        factorY={-0.05}
                        style={{
                            backgroundImage: `url(${Asteroid})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "calc(83%) calc(87%)", // 100px hacia abajo del borde superior y centrado horizontalmente
                            transform: "scale(1)",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            filter: `blur(${calculateRightBlur(mousePosition.x, window.innerWidth)})`
                        }}
                    />
                    <MouseParallaxChild
                        factorX={-0.01}
                        factorY={-0.01}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            filter: `blur(${calculateBlur(mousePosition.x, window.innerWidth)})`
                        }}
                    >
                        <Box sx={{
                            width: "100%",
                            height: "80vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Typography variant={calculatePhraseVariant(windowWidth)} component="h2" sx={{
                                ml:1,
                                mr:1,
                                textAlign: "center",
                                color:"white",
                                display:`${(question.id===0)?"none":"block"}`
                            }}>{questionId}. {question.question}</Typography>
                            <Box sx={{width: "50%",display:"flex",flexDirection:"column"}}>
                                {question.alternatives.map((alternative, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            cursor: (question.userSelectedAnswer === undefined) ? "pointer" : "default",
                                            color: getButtonColor(index,true,windowWidth,false),
                                            border: `1px ${getButtonColor(index,false,false)} solid`,
                                            backgroundColor: getButtonColor(index,false,windowWidth,true),
                                            mt: 2,
                                            "&:hover": {
                                                backgroundColor: getButtonColor(index,false,windowWidth,true),
                                            },
                                        }}
                                        onClick={() => evaluateAnswer(index)}
                                    >
                                        {alternative}
                                    </Button>
                                ))}
                            </Box>
                            <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
                                <Button variant="contained"
                                        sx={{mt:2,width:"50%"}}
                                        disabled={question.userSelectedAnswer === undefined}
                                        onClick={ ()=>getNextPage()}>SIGUIENTE</Button>
                            </Box>
                        </Box>
                    </MouseParallaxChild>
                    </MouseParallaxContainer>
            </Grid>

        </>
    );
}