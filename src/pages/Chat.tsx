import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import './Chat.css';

interface Message {
    id: string;
    sender: 'ai' | 'user';
    text: string;
}

const Chat: React.FC = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: "Hi there. I'm your medical guide. Could you please describe what's bothering you? For example, 'I have a fever and my throat hurts'."
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    // Mock AI response for the MVP
    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking and responding
        setTimeout(() => {
            const responseText = input.toLowerCase().includes('headache') || input.toLowerCase().includes('fever')
                ? "Based on your symptoms, I suggest you visit the **General Practice (全科)** or **Neurology (神经内科)** department. Shall I show you some recommended hospitals?"
                : "It sounds like you should see a doctor in General Practice (全科). Would you like to see a list of international-friendly hospitals nearby?";

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: responseText
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-area">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                        <div className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message-wrapper ai">
                        <div className="message-bubble typing-indicator">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                )}
                {messages.length > 2 && !isTyping && (
                    <div className="action-recommendation">
                        <button
                            className="action-btn primary-btn small"
                            onClick={() => navigate('/hospitals?dept=general')}
                        >
                            View Recommended Hospitals
                        </button>
                    </div>
                )}
            </div>

            <div className="input-area">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Describe your symptoms..."
                    rows={1}
                    className="chat-input"
                />
                <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!input.trim()}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default Chat;
