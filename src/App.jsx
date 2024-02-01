import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StarPage from './components/StarPage.jsx'
import QuestionPage from "./components/QuestionPage.jsx";
import ResultPage from "./components/ResultPage";
import ReviewQuestions from "./components/ReviewQuestions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StarPage />} />
                <Route path="/question/:questionId" element={<QuestionPage />} />
                <Route path="/score" element={<ResultPage/>} />
                <Route path="/review" element={<ReviewQuestions/>} />
            </Routes>
        </Router>
    )
}

export default App
