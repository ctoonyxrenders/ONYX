"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input, Button, Avatar, message, Spin, InputRef } from "antd";
import {
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
  ArrowDownOutlined,
  FileOutlined,
  DownloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  getAllMessagesOfConversation,
  getConversationApi,
  uploadChatFile,
} from "@/app/api/backend/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { getSocket } from "@/lib/socket";
import { ConversationApiResponse, InvoiceContentRenderMessage, MessageType, ProjectContentMessage } from "@/types/api";
import { Reply } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import '@/components/dashboard/admin/chat/conversation.css'
import RenderProjectCard from "@/components/dashboard/admin/chat/RenderProjectCard";
import RenderInvoiceCard from "@/components/dashboard/admin/chat/RenderInvoiceCard";

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  senderInfo?: { name: string; profilePic?: string; role: string };
  type: string;
  content: string | ProjectContentMessage | InvoiceContentRenderMessage;
  fileUrl?: string;
  createdAt: string;
  tempId?: string;
  replyTo?: Message;
}

interface FilePreview {
  file: File;
  type: "image" | "video" | "file";
  preview?: string;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationInfo, setConversationInfo] = useState<ConversationApiResponse | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  // File upload states
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const oldestMsgIdRef = useRef<string | null>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [loadingImages, setLoadingImages] = useState(new Set<string>());

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const socket = getSocket();

  /** File handling functions */
  const getFileType = (file: File): "image" | "video" | "file" => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "file";
  };

  const createPreviewUrl = (file: File, type: "image" | "video" | "file"): string | undefined => {
    if (type === "image" || type === "video") {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  const clearFilePreview = () => {
    if (filePreview?.preview) {
      URL.revokeObjectURL(filePreview.preview);
    }
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?._id) return;

    if (file.size > 10 * 1024 * 1024) {
      message.error("File size exceeds 10 MB limit");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const type = getFileType(file);
    const preview = createPreviewUrl(file, type);

    setFilePreview({
      file,
      type,
      preview,
    });
  };

  /** ✅ Scroll to bottom helper */
  const scrollToBottom = useCallback((smooth = false) => {
    chatEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  }, []);

  const isNearBottom = useCallback(() => {
    const el = chatContainerRef.current;
    if (!el) return true;
    const threshold = 100;
    return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  }, []);

  const handleScrollPositionChange = useCallback(() => {
    setShouldAutoScroll(isNearBottom());
    setShowScrollButton(!isNearBottom());
  }, [isNearBottom]);

  const handleImageLoad = useCallback(
    (msgId: string) => {
      setLoadingImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(msgId);
        return newSet;
      });

      if (shouldAutoScroll) {
        setTimeout(() => scrollToBottom(true), 10);
      }
    },
    [shouldAutoScroll, scrollToBottom]
  );

  const handleImageLoadStart = useCallback((msgId: string) => {
    setLoadingImages((prev) => new Set([...prev, msgId]));
  }, []);

  /** ✅ Fetch conversationId */
  useEffect(() => {
    if (!isAuthenticated || !user?._id) return;

    const fetchConversation = async () => {
      setIsLoading(true);
      try {
        const response = await getConversationApi(user._id);
        if (response.success && response.data?._id) {
          setConversationId(response.data._id);
          setConversationInfo(response.data);
        } else {
          message.error("Failed to load conversation");
        }
      } catch {
        message.error("Failed to load conversation");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [isAuthenticated, user]);

  /** ✅ Load messages (with pagination support) */
  const loadMessages = useCallback(
    async (convId: string, limit = 30, beforeId: string | null = null) => {
      if (!convId) return;
      if (beforeId) setLoadingMore(true);
      else setIsLoading(true);

      try {
        const res = await getAllMessagesOfConversation(convId, limit, beforeId);
        if (res.success && res.data) {
          const formatted = res.data.messages.map((msg: MessageType) => ({
            _id: msg._id,
            conversationId: msg.conversationId,
            senderId: typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId,
            senderInfo:
              typeof msg.senderId === "object"
                ? { name: msg.senderId.name, profilePic: msg.senderId.profilePic, role: msg.senderId.role }
                : undefined,
            type: msg.type,
            content: msg.content,
            fileUrl: msg.fileUrl,
            createdAt: msg.createdAt,
            // replyTo: msg.replyTo,
          }));

          if (beforeId) {
            if (formatted.length === 0) {
              setHasMore(false);
            } else {
              // ✅ preserve scroll position when prepending
              const el = chatContainerRef.current;
              const prevHeight = el?.scrollHeight || 0;
              const prevScrollTop = el?.scrollTop || 0;

              setMessages((prev) => [...formatted, ...prev]);

              setTimeout(() => {
                if (el) {
                  const newHeight = el.scrollHeight || 0;
                  const heightDiff = newHeight - prevHeight;
                  el.scrollTop = prevScrollTop + heightDiff;
                }
              }, 50);
            }
          } else {
            setMessages(formatted);
            setShouldAutoScroll(true);
            setTimeout(() => scrollToBottom(false), 100);
          }

          if (res.data.messages.length > 0) {
            oldestMsgIdRef.current = res.data.messages[0]._id;
          }
        }
      } catch (err) {
        message.error("Failed to load messages");
      } finally {
        setIsLoading(false);
        setLoadingMore(false);
      }
    },
    [user?._id, scrollToBottom]
  );

  /** Load initial messages */
  useEffect(() => {
    if (conversationId) {
      setMessages([]);
      setHasMore(true);
      setShouldAutoScroll(true);
      setLoadingImages(new Set());
      clearFilePreview();
      oldestMsgIdRef.current = null;
      loadMessages(conversationId);
    }
  }, [conversationId, loadMessages]);

  /** Cleanup preview URLs */
  useEffect(() => {
    return () => {
      if (filePreview?.preview) {
        URL.revokeObjectURL(filePreview.preview);
      }
    };
  }, [filePreview?.preview]);

  /** ✅ Infinite scroll */
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    handleScrollPositionChange();

    if (target.scrollTop < 50 && hasMore && !loadingMore) {
      loadMessages(conversationId as string, 30, oldestMsgIdRef.current);
    }
  }, [hasMore, loadingMore, conversationId, loadMessages, handleScrollPositionChange]);

  /** ✅ Socket listeners */
  useEffect(() => {
    if (!conversationId || !socket) return;

    socket.emit("join_conversation", { conversationId });

    const handleReceiveMessage = (msg: Message) => {
      if (msg.conversationId !== conversationId) return;

      const wasNearBottom = isNearBottom();

      setMessages((prev) => {
        if (msg.tempId) {
          const tempIndex = prev.findIndex((m) => m.tempId === msg.tempId);
          if (tempIndex !== -1) {
            const newMsg = [...prev];
            newMsg[tempIndex] = { ...msg };
            return newMsg;
          }
        }
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });

      if (wasNearBottom) {
        setTimeout(() => scrollToBottom(true), msg.type === "image" ? 300 : 50);
      }
    };

    const handleTyping = (data: { userId: string; userName: string; isTyping: boolean }) => {
      if (data.userId === user?._id) return;
      if (data.isTyping) {
        setIsTyping(true);
        setTypingUser(data.userName);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setTypingUser("");
        }, 2000);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("user_typing", handleTyping);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user_typing", handleTyping);
    };
  }, [conversationId, socket, user, scrollToBottom, isNearBottom]);

  /** ✅ Enhanced message type renderer */
  const getMsgType = (msg: Message) => {
    // If message has fileUrl, show the file content
    if (msg.fileUrl) {
      if (msg.type === "image") {
        return (
          <div>
            <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
              <Image
                width={300}
                height={300}
                src={msg.fileUrl}
                alt="img"
                style={{ maxWidth: 250, borderRadius: 6, cursor: "pointer" }}
                onLoadStart={() => handleImageLoadStart(msg._id)}
                onLoad={() => handleImageLoad(msg._id)}
                onError={() => handleImageLoad(msg._id)}
              />
            </a>
            {/* Show text content below image if exists */}
            {msg.content && String(msg.content).trim() && (
              <div style={{ marginTop: 8 }}>
                <span>{String(msg.content).trim()}</span>
              </div>
            )}
          </div>
        );
      }

      if (msg.type === "video") {
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FileOutlined />
              <span style={{ wordBreak: "break-all", maxWidth: 200 }}>
                {msg.fileUrl.split("/").pop()}
              </span>
              <Button
                icon={<DownloadOutlined />}
                size="small"
                onClick={() => window.open(msg.fileUrl, "_blank")}
              />
            </div>
            {/* Show text content below video if exists */}
            {msg.content && String(msg.content).trim() && (
              <div style={{ marginTop: 8 }}>
                <span>{String(msg.content).trim()}</span>
              </div>
            )}
          </div>
        );
      }

      if (msg.type === "file") {
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FileOutlined />
              <span style={{ wordBreak: "break-all", maxWidth: 200 }}>
                {msg.fileUrl.split("/").pop()}
              </span>
              <Button
                icon={<DownloadOutlined />}
                size="small"
                onClick={() => window.open(msg.fileUrl, "_blank")}
              />
            </div>
            {/* Show text content below file if exists */}
            {msg.content && String(msg.content).trim() && (
              <div style={{ marginTop: 8 }}>
                <span>{String(msg.content).trim()}</span>
              </div>
            )}
          </div>
        );
      }
    }

    if (msg.type === "project" && typeof msg.content !== "string") {
      return <RenderProjectCard {...(msg.content as ProjectContentMessage)} />;
    }

    if (msg.type === "invoice" && typeof msg.content !== "string") {
      return <RenderInvoiceCard {...(msg.content as InvoiceContentRenderMessage)} />;
    }

    // Regular text message
    return <span>{String(msg.content).trim()}</span>;
  };

  /** ✅ Handle input */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      if (!socket || !conversationId) return;
      if (value.trim()) {
        socket.emit("typing_start", { conversationId });
      } else {
        socket.emit("typing_stop", { conversationId });
      }
    },
    [socket, conversationId]
  );

  /** ✅ Enhanced send message with file support */
  const sendMessage = async () => {
    if (!conversationId || !user?._id) return;

    const hasText = input.trim();
    const hasFile = filePreview?.file;

    if (!hasText && !hasFile) return;

    setIsUploading(true);
    let fileUrl = "";
    let messageType = "text";

    try {
      // If file exists, upload it first
      if (hasFile) {
        message.loading({ content: "Uploading file...", key: "upload" });

        const uploadRes = await uploadChatFile(filePreview.file);

        if (uploadRes.success && uploadRes.data?.fileUrl) {
          fileUrl = uploadRes.data.fileUrl;
          messageType = filePreview.type;
          message.success({ content: "File uploaded!", key: "upload" });
        } else {
          message.error({ content: "File upload failed", key: "upload" });
          return;
        }
      }

      // Create optimistic message
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const optimisticMsg: Message = {
        _id: tempId,
        tempId,
        conversationId,
        senderId: user._id,
        senderInfo: { name: user.name || "You", role: user.role || "user" },
        type: messageType,
        content: hasText ? input : (hasFile ? filePreview.file.name : ""),
        fileUrl: fileUrl || undefined,
        createdAt: new Date().toISOString(),
        replyTo: replyingTo || undefined,
      };

      // Add optimistic message to UI
      setMessages((prev) => [...prev, optimisticMsg]);
      setInput("");
      clearFilePreview();
      setReplyingTo(null);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      setShouldAutoScroll(true);
      scrollToBottom(true);

      // Send via socket
      socket?.emit("send_message", {
        content: hasText ? input : (hasFile ? filePreview.file.name : ""),
        conversationId,
        senderId: user._id,
        type: messageType,
        fileUrl: fileUrl || null,
        tempId,
        replyTo: replyingTo?._id || null,
      });

    } catch (err) {
      console.error("Error sending message:", err);
      message.error("Failed to send message");
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReply = (msg: Message) => {
    setReplyingTo(msg);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  /** File preview component */
  const renderFilePreview = () => {
    if (!filePreview) return null;

    return (
      <div className="bg-gray-100 border-t border-gray-300 px-4 py-3 flex items-center gap-3">
        {/* Preview Content */}
        <div className="flex items-center gap-2 flex-1">
          {filePreview.type === "image" && filePreview.preview && (
            <Image
              src={filePreview.preview}
              alt="Preview"
              width={40}
              height={40}
              style={{ borderRadius: 4, objectFit: "cover" }}
            />
          )}

          {filePreview.type === "video" && filePreview.preview && (
            <video
              src={filePreview.preview}
              style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
            />
          )}

          {filePreview.type === "file" && (
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#e6f7ff",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileOutlined style={{ color: "#1890ff", fontSize: 16 }} />
            </div>
          )}

          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {filePreview.file.name}
            </div>
            <div className="text-xs text-gray-500">
              {(filePreview.file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <Button
          size="small"
          onClick={clearFilePreview}
          icon={<CloseOutlined />}
          disabled={isUploading}
        />
      </div>
    );
  };

  if (isLoading && !conversationId) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {conversationInfo?.clientId && (
              <Avatar src={conversationInfo.clientId.profilePic} size={40}>
                {conversationInfo.clientId.name?.charAt(0)}
              </Avatar>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">
                {conversationInfo?.clientId?.name || "Support"}
              </h3>
            </div>
          </div>
          {isTyping && typingUser && (
            <span className="text-sm text-blue-500 italic">typing...</span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-gray-50"
        onScroll={handleScroll}
      >
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Spin tip="Loading messages..." />
          </div>
        ) : (
          <>
            {loadingMore && (
              <div className="flex justify-center p-4">
                <Spin size="small" />
              </div>
            )}
            {!hasMore && messages.length > 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                --- You've reached the end of the conversation ---
              </div>
            )}
            {messages.length === 0 && !isLoading ? (
              <div className="text-center p-8">No messages yet.</div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === user?._id;
                const senderName = isMe ? "Me" : (msg.senderInfo?.name || "Unknown");

                return (
                  <div
                    key={msg._id || msg.tempId}
                    style={{
                      padding: "8px 16px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {/* Single line layout like Fiverr */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                      className="msg-bubble"
                    >
                      {/* Avatar */}
                      <Avatar
                        src={isMe ? user?.photoUrl : "https://avatars.githubusercontent.com/u/126343041?v=4"}
                        style={{ flexShrink: 0 }}
                        size={32}
                      >
                        {senderName.charAt(0)}
                      </Avatar>

                      {/* Message content container */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Header with sender name and timestamp */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "4px",
                          }}
                        >
                          <span style={{ fontWeight: 600, fontSize: 14, color: "#333" }}>
                            {senderName}
                          </span>
                          <span style={{ fontSize: 12, color: "#999" }}>
                            {dayjs(msg.createdAt).format("MMM D, h:mm A")}
                          </span>
                        </div>

                        {/* Reply context */}
                        {msg.replyTo && (
                          <div
                            style={{
                              borderLeft: "3px solid #ddd",
                              paddingLeft: 8,
                              marginBottom: 6,
                              fontSize: 12,
                              color: "#666",
                              background: "#f8f9fa",
                              borderRadius: 4,
                              padding: "4px 8px",
                            }}
                          >
                            <b>
                              {msg.replyTo.senderId === user?._id
                                ? "Me"
                                : (msg.replyTo.senderInfo?.name || "Unknown")}
                              :
                            </b>{" "}
                            <span>{String(msg.replyTo.content).slice(0, 60)}...</span>
                          </div>
                        )}

                        {/* Message content */}
                        <div
                          style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            position: "relative",
                            transition: "box-shadow 0.2s ease",
                          }}
                        >
                          {getMsgType(msg)}

                          {/* Reply button */}
                          <Reply
                            size={14}
                            className="reply-icon"
                            onClick={() => handleReply(msg)}
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              cursor: "pointer",
                              opacity: 0,
                              transition: "opacity 0.2s ease",
                              color: "#666",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })

            )}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* Scroll to latest button */}
      {showScrollButton && (
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowDownOutlined />}
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-20 right-6 shadow-lg z-10"
        />
      )}

      {/* File Preview */}
      {renderFilePreview()}

      {/* Reply preview above input */}
      {replyingTo && (
        <div className="bg-gray-100 border-t border-gray-300 px-4 py-2 flex justify-between items-center text-sm">
          <div>
            Replying to <b>{replyingTo.senderId === user?._id ? "Me" : (replyingTo.senderInfo?.name || "Unknown")}</b> –{" "}
            <span className="text-gray-600">{String(replyingTo.content).slice(0, 80)}...</span>
          </div>
          <Button type="link" size="small" onClick={() => setReplyingTo(null)} className="p-0">
            Cancel
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-300 p-4 flex items-center space-x-2">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept="image/*,.pdf,.txt,.doc,.docx,video/*"
        />

        <Button
          type="text"
          icon={<PaperClipOutlined />}
          className="text-gray-500"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        />
        <Button type="text" icon={<SmileOutlined />} className="text-gray-500" />
        <Input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={filePreview ? "Add a message (optional)" : "Type a message..."}
          className="flex-1 rounded-full"
          disabled={!conversationId || isUploading}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          onClick={sendMessage}
          disabled={(!input.trim() && !filePreview) || !conversationId || isUploading}
          loading={isUploading}
          className="bg-blue-500"
        />
      </div>
    </div>
  );

}

