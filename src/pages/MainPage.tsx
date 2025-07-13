// src/pages/MainPage.tsx
import { useState } from 'react';
import ChatMessage from '../components/ChatMessage';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

function MainPage() {
    const[messages, setMessages] = useState<Message[]>([
        {role: 'bot', content: '안녕하세요! TalkGPT입니다! 메세지를 입력하세요.'},
    ]);
    
    const [input, setInput] = useState('');

    const handleSend = () => {
        if(input.trim() === '') return;
        const newMessage: Message = { role: 'user', content: input};
        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <div className='app-container'>
            <h1>TalkGPT</h1>
            <div className='mainpage-chat-window'>
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} role={msg.role} content={msg.content} />
                ))}
            </div>
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