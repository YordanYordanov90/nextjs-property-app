"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from 'next/cache';

type ReadMessageResponse = {
  success: boolean;
  read?: boolean;
  error?: string;
}

export async function sendMessage(
 propertyId: string,
 name: string,
 email: string,
 phone: string | undefined,
 body: string
) {
 // 1. Authenticate the User
 const { userId } = await auth();
 if (!userId) {
   throw new Error("You must be logged in to send a message.");
 }

 // 2. Find the Sender in the Database
 const sender = await prisma.user.findUnique({
   where: { clerkId: userId },
 });
 if (!sender) {
   throw new Error("User not found in the database.");
 }

 // 3. Find the Property and Its Owner
 const property = await prisma.property.findUnique({
   where: { id: propertyId },
   include: { owner: true },
 });
 if (!property) {
   throw new Error("Property not found.");
 }

 const recipient = property.owner;
 if (!recipient) {
   throw new Error("Property owner not found.");
 }

 // 4. Prevent sending message to yourself
 if (property.ownerId === sender.id) {
   throw new Error("You cannot send a message to yourself.");
 }

 // 5. Create the Message Record
 const newMessage = await prisma.message.create({
   data: {
     senderId: sender.id,
     recipientId: recipient.id,
     propertyId: property.id,
     name,
     email,
     phone,
     body,
   },
 });
 console.log(newMessage);

 return { success: true, message: newMessage };
}

export async function getMessages() {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to view messages.");
    }
  
    // Find the current user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error("User not found.");
    }
  
    // Get messages where user is either sender or recipient
    const messages = await prisma.message.findMany({
      where: {
        recipientId: user.id
      },
      include: {
        sender: true,
        recipient: true,
        property: true,
        
      },
      orderBy: { createdAt: "desc" }
    });
  
    return messages;
  }

  export async function getSingleMessage(messageId: string) {

    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to view messages.");
    }
  
    // Find the current user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error("User not found.");
    }
  
    // Get messages where user is either sender or recipient
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: true,
        recipient: true,
        property: true,
      },
    });
  
    return message;
  }

  export async function readMessage(messageId: string): Promise<ReadMessageResponse> {
    try {
      // Authentication check
      const { userId } = await auth();
      if (!userId) {
        return {
          success: false,
          error: "You must be logged in to view messages."
        };
      }
    
      // Find the current user
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });
      if (!user) {
        return {
          success: false,
          error: "User not found."
        };
      }
  
      // Find the message
      const message = await prisma.message.findUnique({
        where: { id: messageId },
        select: {
          id: true,
          read: true,
          recipientId: true,
        }
      });
  
      if (!message) {
        return {
          success: false,
          error: "Message not found."
        };
      }
  
      // Permission check
      if (message.recipientId !== user.id) {
        return {
          success: false,
          error: "You do not have permission to modify this message."
        };
      }
  
      // Toggle the read status
      const updatedMessage = await prisma.message.update({
        where: { id: messageId },
        data: { read: !message.read }, // Toggle the current value
        select: {
          read: true,
        }
      });
  
      // Revalidate the messages pages
      revalidatePath('/messages');
      revalidatePath(`/messages/${messageId}`);
  
      return {
        success: true,
        read: updatedMessage.read
      };
  
    } catch (error) {
      console.error('Error in readMessage:', error);
      return {
        success: false,
        error: "An unexpected error occurred."
      };
    }
  }