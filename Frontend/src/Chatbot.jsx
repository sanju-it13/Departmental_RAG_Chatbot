import React, { useState, useRef, useEffect } from 'react'
import logo from './logo.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

function Chatbot() {
  const [showTopics, setShowTopics] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm the CSE Department AI Assistant. How can I help you today?",
      sender: 'bot',
    },
  ])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessageToAI = async (prompt) => {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: prompt }),
    })

    let data = null
    try {
      data = await response.json()
    } catch {
      // Keep the error handling below user-friendly when the server returns non-JSON.
    }

    if (!response.ok) {
      throw new Error(data?.error || data?.message || `Backend returned HTTP ${response.status}`)
    }

    return data
  }

  const handleSendMessage = async () => {
    const currentInput = userInput.trim()
    if (!currentInput || loading) return

    const newUserMessage = {
      id: Date.now(),
      text: currentInput,
      sender: 'user',
    }

    setMessages((prev) => [...prev, newUserMessage])
    setUserInput('')
    setLoading(true)

    try {
      const data = await sendMessageToAI(currentInput)

      const sourceText = Array.isArray(data.sources) && data.sources.length > 0
        ? `\n\nSources: ${data.sources.length}`
        : ''

      const newBotMessage = {
        id: Date.now() + 1,
        text: `${data.answer || 'I could not generate an answer.'}${sourceText}`,
        sender: 'bot',
      }

      setMessages((prev) => [...prev, newBotMessage])
    } catch (error) {
      const newBotMessage = {
        id: Date.now() + 1,
        text: `Sorry, I couldn't reach the backend. Make sure the Node.js RAG server is running on ${API_BASE_URL}.\n\nError: ${error.message}`,
        sender: 'bot',
      }

      setMessages((prev) => [...prev, newBotMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && userInput.trim()) {
      handleSendMessage()
    }
  }

  return (
    <div className="chatbot-container my-div">
      <div className="chatbot-header">
        <img src={logo} alt="Logo" width="45" />
        <div>
          <h2>CSE Department</h2>
          <p>AI Student Assistant</p>
        </div>
      </div>

      <div className="chat-section">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-bubble" style={{ whiteSpace: 'pre-wrap' }}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <div className="message-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="browse-topics">
          <button
            className="browse-toggle-btn"
            onClick={() => setShowTopics(!showTopics)}
          >
            {showTopics ? 'Hide Topics' : 'Browse Topics'}
          </button>

          {showTopics && (
            <div className="topics-row">
              {[
                'Programs',
                'Faculty',
                'Research',
                'Activities',
                'Placements',
                'Courses',
                'Labs',
                'Admissions',
              ].map((topic) => (
                <button
                  key={topic}
                  className="topic-btn"
                  onClick={() => setUserInput(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about courses, faculty, labs..."
          disabled={loading}
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={loading || !userInput.trim()}
        >
          {loading ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  )
}

export default Chatbot
