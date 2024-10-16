import React, { useState } from 'react'
import { useTypewriter } from 'react-simple-typewriter';


const ChatBubble = ({ message, header }: { message: string, header?: string }) => {
  const [placeholder] = useTypewriter({
    words: [message],
    loop: 1,
    typeSpeed: 10,
    delaySpeed: Infinity, 
  });
  return (
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="AiExpert"
              src="public\AiChatbotLogo.jpg" />
          </div>
        </div>
        {header && (
            <div className="chat-header pl-2 pb-1">
            {header}
            <time className="pl-3 text-xs opacity-50">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
        )}
        <div className="chat-bubble ">{placeholder}</div>
      </div>
  )
}

export default ChatBubble