// src/components/ChatMessage.tsx
interface Props {
    role: 'user' | 'bot';
    content: string;
}

function ChatMessage({ role, content }: Props) {
    const isUser = role ==='user';

    return (
        <div className={`message ${isUser ? 'user' : 'bot'}`}>
            <div className="bubble">{content}</div>
        </div>
    );
}

export default ChatMessage;