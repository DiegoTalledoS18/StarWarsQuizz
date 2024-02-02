import {Box, Button, styled, Grid,Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import "../styles/StarPage.css"
import SWLogo from "../assets/SW_LOGO_BLUR.png";
import StarsBackground from "../assets/stars.png";
import SpaceBackground from "../assets/space.png";
import { makeStyles } from "@material-ui/core/styles";
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
import {useEffect, useState} from "react";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100vh",
        backgroundColor: "#000000"
    }
});

export default function StarPage(){
    const classes = useStyles();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculateBlur = (yPosition, windowHeight) => {
        // Calculamos la distancia vertical desde el centro de la ventana
        const distanceFromCenter = Math.abs(yPosition - windowHeight / 2);
        // Definimos un valor máximo de desenfoque
        const maxBlur = 1;
        // Calculamos el factor de desenfoque basado en la distancia
        const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
        // Calculamos el desenfoque en función del factor y el máximo
        const blurValue = blurFactor * maxBlur;
        return `${blurValue}px`;
    };

    const Img= styled("img")({
        width: 550,
    })

    return (
        <>
            <Grid className={classes.root}>
                <MouseParallaxContainer
                    className="parallax"
                    containerStyle={{
                        width: "100%",
                        height: "100%"
                    }}
                    globalFactorX={0.3}
                    globalFactorY={0.3}
                    resetOnLeave
                >
                    <MouseParallaxChild
                        factorX={0.1}
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
                        factorX={-0.022}
                        factorY={-0.022}
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
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <img src={SWLogo} alt="Star Wars Logo"></img>
                            <Typography variant="h4" component="h1" sx={{ color: "#ffffff", mt: 1 }}>MAY THE FORCE BE WITH YOU</Typography>
                            <Typography variant="p" component="h3" sx={{ color: "#FFFFFF", mt: 1 }}>BY DIEGO TALLEDO S.</Typography>
                            <Button variant="outlined" sx={{ color: '#ffec00', border: '1px solid #ffec00', mt: 2 }}
                                    component={NavLink}
                                    to="/question/1">EMPEZAR</Button>
                        </Box>
                    </MouseParallaxChild>
                </MouseParallaxContainer>
            </Grid>


        </>
    )
}
