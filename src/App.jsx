import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StarPage from './components/StarPage.jsx'
import QuestionPage from "./components/QuestionPage.jsx";
import ResultPage from "./components/ResultPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StarPage />} />
                <Route path="/question/:questionId" element={<QuestionPage />} />
                <Route path="/score" element={<ResultPage/>} />
            </Routes>
        </Router>
    )
}

export default App
