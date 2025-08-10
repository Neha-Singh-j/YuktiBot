import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Page imports
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import CodeEditorPage from './pages/CodeEditor/CodeEditorPage';
import InterviewPage from './pages/Interview/InterviewPage';
import ChatBotPage from './pages/ChatBot/ChatBotPage';
// Component imports
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
// Style imports
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/contact' element={<Contact/>} />
            <Route path="/code-editor" element={<CodeEditorPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/chatbot" element={<ChatBotPage />} />
            
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;