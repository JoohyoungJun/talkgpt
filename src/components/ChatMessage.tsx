// src/components/ChatMessage.tsx
import './ChatMessage.css';
interface Props {
    role: 'user' | 'bot';
    content: string;
}

function ChatMessage({ role, content }: Props) {
    const isUser = role ==='user';
    const prefix = isUser? 'Me' : 'Bot';

    return (
        <div className={`message ${isUser ? 'user' : 'bot'}`}>
            <div className="bubble">
                { `${prefix}: ${content}` }
            </div>
        </div>
    );
}

export default ChatMessage;