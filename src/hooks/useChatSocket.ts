// hooks/useChatSocket.ts
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

interface Message {
    _id: string;
    tempId?: string;
    conversationId: string;
    senderId: string;
    from?: "me" | "other";
    content: string;
    type: string;
    createdAt?: string;
}

export const useChatSocket = (
    conversationId: string | null,
    userId: string | undefined,
    onMessage: (msg: Message) => void
) => {
    const socket = getSocket();

    useEffect(() => {
        if (!conversationId || !socket || !userId) return;

        // Join the conversation room
        socket.emit("join_conversation", { conversationId });

        // Handle incoming messages
        const handleReceive = (msg: Message) => {
            if (msg.conversationId !== conversationId) return;

            // Determine from sender
            msg.from = msg.senderId === userId ? "me" : "other";

            onMessage(msg);
        };

        socket.on("receive_message", handleReceive);

        return () => {
            socket.off("receive_message", handleReceive);
        };
    }, [conversationId, socket, userId, onMessage]);

    // Send a message
    const sendMessage = (content: string, tempId?: string) => {
        if (!conversationId || !userId || !content.trim()) return;

        const msg = {
            content,
            conversationId,
            senderId: userId,
            type: "text",
            tempId,
        };

        // Emit to server
        socket.emit("send_message", msg);
    };

    return { sendMessage };
};
