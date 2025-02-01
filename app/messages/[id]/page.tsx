export const dynamic = "force-dynamic";
import { getSingleMessage } from "@/actions/message";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaClock,
  FaReply,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function MessageDetailPage({ params }: Props) {
  try {
    const message = await getSingleMessage(params.id);

    if (!message) {
      throw new Error("Message not found");
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/messages"
          className="text-blue-500 hover:text-blue-600 flex items-center transition-colors mb-2"
        >
          <FaArrowLeft className="mr-2" /> Back to Messages
        </Link>
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FaUser className="text-white text-2xl" />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {message.sender?.username || "Unknown Sender"}
                  </h2>
                  <p className="text-blue-100">
                    {message.sender?.email || "No Email"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaHome className="text-white" />
                <span className="text-white text-sm">
                  {message.property?.name || "No Property Info"}
                </span>
              </div>
            </div>
          </div>

          {/* Message Body */}
          <div className="p-6">
            <div className="flex items-center mb-4 space-x-3">
              <FaEnvelope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-white">
                Message Details
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {message.body || "No message content available."}
            </p>

            {/* Metadata */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <FaClock className="text-blue-500" />
                <span className="text-gray-400">
                  Received:{" "}
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleString()
                    : "Unknown Date"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        message.read
                          ? "bg-gray-700 text-gray-400"
                          : "bg-blue-500 text-white"
                      }
                  `}
                >
                  {message.read ? "Read" : "Unread"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-850 p-6 border-t border-gray-800 flex justify-between items-center">
            <Link
              href={
                message?.propertyId
                  ? `/properties/${message.propertyId}`
                  : "/messages"
              }
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition"
            >
              <FaHome />
              <span>View Property</span>
            </Link>
            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <FaReply />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching message:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Error Loading Message
          </h1>
          <p className="text-gray-400">
            {error.message || "There was an issue fetching the message."}
          </p>
          <Link
            href="/messages"
            className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Messages
          </Link>
        </div>
      </div>
    );
  }
}
