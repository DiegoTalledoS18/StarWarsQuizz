import {Box, Button, styled, Grid,Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import "../styles/StarPage.css"
import SWLogo from "../assets/SW_LOGO_BLUR.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100vh",
        backgroundColor: "#151515"
    },
    hero: {
        width: "100%"
    }
});

export default function StarPage(){
    const Img= styled("img")({
        width: 200,
    })
    const classes = useStyles();
    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Img src={SWLogo}></Img>
                    <Typography variant="h2" component="h1" sx={{color:"#FFFF"}}>A STAR WARS QUIZZ</Typography>
                    <Typography variant="p" component="h3" sx={{color:"#FFFF"}}>BY DIEGO TALLEDO S.</Typography>
                    <Button variant="outlined" sx={{ color: '#F2BC02', border: '1px solid #F2BC02', mt:2}}
                            component={NavLink}
                            to="/question/1">EMPEZAR</Button>
                </Grid>
            </Grid>


        </>
    )
}
