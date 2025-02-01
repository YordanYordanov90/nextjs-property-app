"use client";

import { useState } from "react";
import Link from "next/link";
import { Message } from "@prisma/client";
import { FaHome, FaUser } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { readMessage } from "@/actions/message";

interface MessageCardProps {
  message: Message & {
    sender: {
      username: string;
      email: string;
    };
    recipient: {
      username: string;
      email: string;
    };
    property: {
      name: string;
    };
  };
}

const MessageCard = ({ message }: MessageCardProps) => {
  const [isRead, setIsRead] = useState(message.read);

  const handleReadClick = async () => {
    try {
      await readMessage(message.id);
      setIsRead(!isRead);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Link href={`/messages/${message.id}`} className="block">
      <div className="bg-gray-900 p-4 md:p-6 rounded-xl hover:bg-gray-800 transition-colors  ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
          {/* Sender Info */}
          <div className="flex items-center space-x-3">
            <FaUser className="text-blue-500 min-w-[1rem]" />
            <div className="overflow-hidden">
              <h3 className="text-lg md:text-xl font-semibold text-white truncate">
                {message.sender.username}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 truncate">
                {message.sender.email}
              </p>
            </div>
          </div>

          {/* Property */}
          <div className="flex items-center space-x-2">
            <FaHome className="text-blue-500" />
            <span className="text-sm text-gray-400 truncate max-w-[150px]">
              {message.property.name}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex  justify-between items-center text-xs md:text-sm">
          <span className="text-gray-500">
            {new Date(message.createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={handleReadClick}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md 
              
              ${
                isRead
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
              }`}
          >
            {isRead ? "🔄 Mark as Unread" : "✅ Mark as Read"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MessageCard;
