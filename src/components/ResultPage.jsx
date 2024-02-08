import { useQuestionStore } from "../store/questions.js";
import {NavLink} from "react-router-dom";
import {Box, Button, Grid, styled, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
import StarsBackground from "../assets/stars.png";
import useSound from 'use-sound';
import resultSfx from '../assets/results.mp3';
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
export default function ResultPage() {
    const [play] = useSound(resultSfx);
    const classes = useStyles();
    const finalScore = useQuestionStore.getState().getFinalScore(useQuestionStore.getState());
    const totalOfQuestions = useQuestionStore.getState().questions.length;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
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

    const calculateBackgroundBlur = (xPosition, windowWidth) => {
        const distanceFromCenter = Math.abs(xPosition - windowWidth / 2);
        const maxBlur = 0.6;
        const blurFactor = 1 - Math.min(distanceFromCenter / (windowWidth / 2), 1);
        const blurValue = blurFactor * maxBlur;
        return `${blurValue}px`;
    };

    const calculateBlur = (yPosition, windowHeight) => {
        if(windowHeight<450){
            return "0px"
        }else {
            const distanceFromCenter = Math.abs(yPosition - windowHeight / 2);
            const maxBlur = 1.2;
            const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
            const blurValue = blurFactor * maxBlur;
            return `${blurValue}px`;
        }
    };
    const Img= styled("img")({
    })
    return (
        <>
            <Grid className={classes.root}>
                <MouseParallaxContainer
                    className="parallax"
                    containerStyle={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent:"center",
                        gridTemplateColumns: ` ${(windowWidth<850) ? "1fr": "1fr 1fr 1fr"}`,
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
                            backfaceVisibility: "hidden",
                            filter: `blur(${calculateBackgroundBlur(mousePosition.x, window.innerWidth)})`
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
                            textAlign: "center",
                            justifyContent: "center",
                            color: "white"
                        }}>
                            <p>SCORE</p>
                            <p>{(finalScore / totalOfQuestions).toFixed(1)}</p>
                            <p>Acertaste {finalScore} de {totalOfQuestions} preguntas</p>
                            <Button variant="outlined" sx={{ color: '#F2BC02', border: '1px solid #F2BC02', mt:2}}
                                    component={NavLink}
                                    to="/review"
                                    onClick={play}
                            >VER RESPUESTAS</Button>
                            <Button variant="outlined" sx={{ color: '#F2BC02', border: '1px solid #F2BC02', mt:2}}
                                    component={NavLink}
                                    to="/"
                            >VOLVER AL INICIO</Button>
                        </Box>
                    </MouseParallaxChild>
                </MouseParallaxContainer>
            </Grid>
        </>
    );
}
