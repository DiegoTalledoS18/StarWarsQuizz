import React, {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import StarPage from './components/StarPage.jsx'
import QuestionPage from "./components/QuestionPage.jsx";
import ResultPage from "./components/ResultPage";
import ReviewQuestions from "./components/ReviewQuestions";

import "./App.css"
function App() {
    useEffect(() => {
        const music = new Audio('./assets/results.mp3');

        const handleRouteChange = () => {
            if (window.location.pathname === "/review" && music.paused) {
                music.play().then(() => {
                    // Aquí puedes realizar acciones adicionales después de que la música comience a reproducirse
                    console.log("La música ha comenzado a reproducirse");
                });
            } else if (window.location.pathname !== "/review") {
                music.pause();
            }
        };

        window.addEventListener("popstate", handleRouteChange);

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
            music.pause();
        };
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<StarPage />}/>
                <Route path="/question/:questionId" element={<QuestionPage />} />
                <Route path="/score" element={<ResultPage/>} />
                <Route path="/review" element={<ReviewQuestions/>} />
            </Routes>
        </>

    )
}

export default App
