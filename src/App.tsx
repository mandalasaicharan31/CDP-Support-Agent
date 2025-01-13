import React, { useState } from 'react';
import { MessageSquareCode } from 'lucide-react';
import { Message, CDPs } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { generateResponse } from './utils/chatbot';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Welcome! I'm your CDP Agent. How Can I help you with questions about:

${CDPs.map(cdp => `- **${cdp.name}**: ${cdp.description}`).join('\n')}

How can I Help you today?`,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    // Generate bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: generateResponse(content),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <MessageSquareCode className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">CDP Support Agent</h1>
            <p className="text-sm text-black-500">I am Here to Help with Segment, mParticle, Lytics, or Zeotap</p>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;