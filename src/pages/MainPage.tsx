// src/pages/MainPage.tsx
import React, { useState } from 'react';
import ChatMessage from '../components/ChatMessage';
import './MainPage.css';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

const fetchGeminiReply = async (userInput: string): Promise<string> => {
    const apikey = import.meta.env.VITE_GEMINI_API_KEY;

    //console.log("API_Key: ", import.meta.env.VITE_GEMINI_API_KEY);

    const response = await fetch (
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-002:generateContent?key=${apikey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: userInput }]
                    }
                ],
            }),
        }
    );

    if (!response.ok) {
        const errtxt = await response.text();
        console.error("잼민이 호출 실패: ", response.status, errtxt);
        return "오류가 발생했습니다.";
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "오류가 발생했습니다.";
}

function MainPage() {
    const[messages, setMessages] = useState<Message[]>([
        {role: 'bot', content: '안녕하세요! TalkGPT입니다! 메세지를 입력하세요.'},
    ]);
    
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if(input.trim() === "") return;
        const newMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, newMessage]);
        setInput("");

        //get response from Gemini
        const botReply = await fetchGeminiReply(input);
        const botMessage: Message = { role: "bot", content: botReply };


        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <div className='mainpage-container'>
            <h1 className='mainpage-title'>TalkGPT</h1>
            <div className='mainpage-chat-window'>
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} role={msg.role} content={msg.content} />
                ))}
            </div>
            <p className='mainpage-warning-message'> Talk GPT는 실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.</p>
            <div className='mainpage-input-area'>
                <input
                    type="text"
                    value={input}
                    placeholder='메세지를 입력하세요'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default MainPage;