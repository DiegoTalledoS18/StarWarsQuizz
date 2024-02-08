import React, {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import StarPage from './components/StarPage.jsx'
import QuestionPage from "./components/QuestionPage.jsx";
import ResultPage from "./components/ResultPage";
import ReviewQuestions from "./components/ReviewQuestions";

import "./App.css"
function App() {
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
