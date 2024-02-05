import { useQuestionStore } from "../store/questions.js";
import {Box, Button, Grid, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
import StarsBackground from "../assets/stars.png";
import TwoSuns from "../assets/two_suns.png";
import Tatooine from "../assets/tatooine.png";
import Asteroids from "../assets/asteroids.png";
import SDOT from "../assets/SDOT.png";
import Asteroid from "../assets/Asteroid.png";
import {makeStyles} from "@material-ui/core/styles";

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
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <Box sx={{
                            width: "50%",
                            height: "80vh",
                            display:"flex",
                            flexDirection:"column",
                            transform: "perspective(500px) rotateX(20deg)",
                            animation: "intro 30s linear infinite",
                            "@keyframes intro": {
                                from: { transform: "perspective(200px) rotateX(20deg) translateY(800px)" },
                                to: {  transform: "perspective(200px) rotateX(20deg) translateY(-1000px)",opacity: "0" },
                            },
                        }}>
                            {questions.map((itemQuestion, index) => (
                                <Box>
                                    <Typography variant="h4" component="h2" sx={{color:"white"}} >{itemQuestion.id}.{itemQuestion.question}</Typography>
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
                            <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
                                <Button variant="contained" sx={{mt:2}}
                                        component={NavLink}
                                        to="/score"
                                >VOLVER</Button>
                            </Box>
                        </Box>
                    </MouseParallaxChild>
                </MouseParallaxContainer>
            </Grid>

        </>
    );
}