import {Box, Button, styled, Grid,Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import "../styles/StarPage.css"
import SWLogo from "../assets/SW_LOGO_BLUR.png";
import SD_L from "../assets/sd_1.png";
import SD_R from "../assets/sd_2.png";
import StarsBackground from "../assets/stars.png";
import { makeStyles } from "@material-ui/core/styles";
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
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

export default function StarPage(){
    const classes = useStyles();
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
        const distanceFromCenter = Math.abs(yPosition - windowHeight / 2);
        const maxBlur = 1.2;
        const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
        const blurValue = blurFactor * maxBlur;
        return `${blurValue}px`;
    };
    const calculateSDLBlur = (yPosition, windowHeight) => {
        const distanceFromCenter = Math.abs(yPosition - windowHeight / 2);
        const maxBlur = 1.5;
        const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
        const blurValue = blurFactor * maxBlur;
        return `${blurValue}px`;
    };
    const calculateSDRBlur = (yPosition, windowHeight) => {
        const distanceFromCenter = Math.abs(yPosition - windowHeight / 2);
        const maxBlur = 1.5;
        const blurFactor = Math.min(distanceFromCenter / (windowHeight / 2), 1);
        const blurValue = blurFactor * maxBlur;
        return `${blurValue}px`;
    };
    const calculateLogoWidth = (windowWidth) => {
        if (windowWidth < 442) {
            return "200px";
        } else if (windowWidth < 1100) {
            return "400px";
        } else {
            return "569px";
        }
    };
    const calculatePhraseVariant = (windowWidth) => {
        if (windowWidth < 442) {
            return "h6";
        } else if (windowWidth < 1100) {
            return "h5";
        } else {
            return "h4";
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
                        display: "grid",
                        gridTemplateColumns: ` ${(windowWidth<850) ? "1fr": "1fr 1fr 1fr"}`, // Define tres columnas de igual tamaño
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
                        factorX={-0.02}
                        factorY={0.08}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            filter: `blur(${calculateSDLBlur(mousePosition.x, window.innerWidth)})`

                        }}
                    >
                        <Img src={SD_L} style={{width:"100px", marginTop:"1rem"}} alt="Star Wars Logo"></Img>
                    </MouseParallaxChild>
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
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 5,
                            mb: 5
                        }}>
                            <Img src={SWLogo} style={{ width: calculateLogoWidth(windowWidth) }} alt="Star Wars Logo" />
                            <Typography variant={calculatePhraseVariant(windowWidth)} component="h1" sx={{ color: "#ffffff", mt: 1 , textAlign: "center"}}>MAY THE FORCE BE WITH YOU</Typography>
                            <Typography variant={windowWidth<1100 ? "h6": "h5"} sx={{ color: "#FFFFFF", mt: 1, textAlign: "center" }}>By Diego Talledo S.</Typography>
                            <Button variant="outlined" sx={{ color: '#ffec00', border: '1px solid #ffec00', mt: 2 }}
                                    component={NavLink}
                                    to="/question/1">INICIAR</Button>
                        </Box>
                    </MouseParallaxChild>
                    <MouseParallaxChild
                        factorX={0.09}
                        factorY={-0.005}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            filter: `blur(${calculateSDRBlur(mousePosition.x, window.innerWidth)})`

                        }}
                    >
                        <Img src={SD_R} style={{width:`${(windowWidth<1400) ? "200px": "300px"}`, marginBottom:"1rem"}} alt="Star Wars Logo"></Img></MouseParallaxChild>
                </MouseParallaxContainer>
            </Grid>


        </>
    )
}
