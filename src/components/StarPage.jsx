import {Box, Button, styled, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

export default function StarPage(){
    const Img= styled("img")({
        width: 200,
    })
    return (
        <>
            <Box sx={{display:"block"}}>
                <Img src={"https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"}></Img>
                <Typography variant="h2" component="h1" sx={{color:"#FFFF"}}>A STAR WARS QUIZZ</Typography>
            </Box>
            <Button variant="outlined" sx={{ color: '#F2BC02', border: '1px solid #F2BC02', mt:2}}
                    component={NavLink}
                    to="/question/1"
            >START</Button>

        </>
    )
}