import { useQuestionStore } from "../store/questions.js";
import {Box, Button, Grid, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
import StarsBackground from "../assets/stars.png";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";

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

export default function ReviewQuestions() {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
    const calculatePhraseVariant = (windowWidth) => {
        if (windowWidth < 660) {
            return "h6";
        } else if (windowWidth < 970) {
            return "h5";
        } else {
            return "h4";
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsButtonVisible(true);
            console.log("30 segs")
        }, 30000); // 90 segundos

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const classes = useStyles();
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
                        factorX={-0.01}
                        factorY={-0.01}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                width: "50%",
                                height: "80vh",
                                display: `${isButtonVisible === true ? "none": "flex"}`,
                                flexDirection: "column",
                                transform: "perspective(500px) rotateX(20deg)",
                                animation: "intro 30s linear infinite",
                                "@keyframes intro": {
                                    "0%": { transform: "perspective(200px) rotateX(20deg) translateY(570px)" },
                                    "80%": { opacity: "0.90" },
                                    "100%": { transform: "perspective(200px) rotateX(20deg) translateY(-1000px)", opacity: "0"},
                                },

                            }}
                        >
                            {questions.map((itemQuestion, index) => (
                                <Box sx={{textAlign: "center", }}>
                                    <Typography variant={calculatePhraseVariant(windowWidth)} component="h2" sx={{color:"white"}} >{itemQuestion.id}.{itemQuestion.question}</Typography>
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
                                                    "&:hover": {
                                                        backgroundColor: getButtonColor(itemQuestionIndex,false,itemQuestion),
                                                    }
                                                }}>
                                                {alternative}
                                            </Button>
                                        ))}
                                    </Box>

                                </Box>
                            ))}
                        </Box>
                    </MouseParallaxChild>
                    <MouseParallaxChild
                        factorX={-0.01}
                        factorY={-0.01}
                        style={{
                            display: `${isButtonVisible=== false ? "none": "flex"}`,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "80vh",

                        }}
                    >
                        <Box sx={{display:"flex",justifyContent:"center",alignItems: "center" ,width:"100%",}}>
                            <Button variant="contained" sx={{mt:2}}
                                    component={NavLink}
                                    to="/score"
                            >VOLVER</Button>
                        </Box>
                    </MouseParallaxChild>
                </MouseParallaxContainer>
            </Grid>

        </>
    );
}