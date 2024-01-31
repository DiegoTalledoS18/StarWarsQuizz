import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StarPage from './components/StarPage.jsx'
import QuizPage from "./components/QuizzPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<StarPage />} />
                <Route path="/quiz" element={<QuizPage />} />
            </Routes>
        </Router>
    )
}

export default App
