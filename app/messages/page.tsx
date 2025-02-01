import { getMessages } from '@/actions/message';
import MessageCard from '@/components/message-card';
import Link from 'next/link';
import { FaEnvelope, FaUser, FaHome } from 'react-icons/fa';

const MessagesPage = async () => {
  const messages = await getMessages();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">Your Messages</h1>
      
      {messages.length === 0 ? (
        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <FaEnvelope className="mx-auto text-5xl text-gray-600 mb-4" />
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
           <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;