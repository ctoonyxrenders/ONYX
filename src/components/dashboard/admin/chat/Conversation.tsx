"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Avatar, Form, Input, Button, message, Spin, FormInstance, InputRef } from "antd";
import { SendOutlined, FileOutlined, DownloadOutlined, PaperClipOutlined, CloseOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Scrollbar } from "react-scrollbars-custom";
import { getAllMessagesOfConversation, getConversationApi, uploadChatFile } from "@/app/api/backend/chat";
import { getSocket } from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Reply } from "lucide-react";
import dayjs from "dayjs";

import "./conversation.css";
import Image from "next/image";
import { InvoiceContentRenderMessage, MessageType, ProjectContentMessage, } from "@/types/api";
import RenderProjectCard from "./RenderProjectCard";
import RenderInvoiceCard from "./RenderInvoiceCard";

type Props = { id: string };



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

export default function Conversation({ id }: Props) {
  const formRef = useRef<FormInstance>(null);
  const chatBodyRef = useRef<Scrollbar | null>(null);
  const inputRef = useRef<InputRef>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [headingInfo, setHeadingInfo] = useState<{ name: string; profilePic?: string }>({ name: "" });
  const [msgList, setMsgList] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  // File preview state
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const oldestMsgIdRef = useRef<string | null>(null);

  const [_, setShouldAutoScroll] = useState(true);
  const [__, setLoadingImages] = useState(new Set<string>());

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const socket = getSocket();
  const { user } = useSelector((state: RootState) => state.auth);

  /** ✅ Detect file type */
  const getFileType = (file: File): "image" | "video" | "file" => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "file";
  };

  /** ✅ Create preview URL for files */
  const createPreviewUrl = (file: File, type: "image" | "video" | "file"): string | undefined => {
    if (type === "image" || type === "video") {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  /** ✅ Clear file preview and revoke URL */
  const clearFilePreview = () => {
    if (filePreview?.preview) {
      URL.revokeObjectURL(filePreview.preview);
    }
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /** ✅ File selection handler with preview */
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

  /** ✅ Send message (with or without file) */
  const handleSendMessage = async (textContent: string = "") => {
    if (!user?._id) return;

    // Check if we have either text or file
    const hasText = textContent.trim();
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

      // Create optimistic message for UI
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const optimisticMsg: Message = {
        _id: tempId,
        tempId,
        conversationId: id,
        senderId: user._id,
        senderInfo: { name: user.name || "You", role: user.role || "user" },
        type: messageType,
        content: hasText ? textContent : (hasFile ? filePreview.file.name : ""),
        fileUrl: fileUrl || undefined,
        createdAt: new Date().toISOString(),
        replyTo: replyingTo || undefined,
      };

      // Add optimistic message to UI
      setMsgList((prev) => [...prev, optimisticMsg]);

      // Clear form and states
      formRef.current?.setFieldsValue({ newMsg: "" });
      clearFilePreview();
      setReplyingTo(null);
      setShouldAutoScroll(true);

      // Send via socket
      socket?.emit("send_message", {
        content: hasText ? textContent : (hasFile ? filePreview.file.name : ""),
        conversationId: id,
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

  /** ✅ Handle form submit (text message or text + file) */
  const onSend = async (values: { newMsg: string }) => {
    const textContent = values.newMsg || "";
    const hasText = textContent.trim();
    const hasFile = filePreview?.file;

    // If no text and no file, do nothing
    if (!hasText && !hasFile) return;

    await handleSendMessage(textContent);
  };

  /** ✅ Render different message types */
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
                style={{ maxWidth: 250, borderRadius: 6 }}
              />
            </a>
            {/* Show text content below image if exists */}
            {msg.content && String(msg.content).trim() && (
              <div style={{ marginTop: 8 }}>
                <span>{msg.content as string}</span>
              </div>
            )}
          </div>
        );
      }

      if (msg.type === "video") {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <VideoCameraOutlined style={{ fontSize: 18, color: "#1890ff" }} />
            <span style={{ wordBreak: "break-all", maxWidth: 200 }}>
              {msg.fileUrl.split("/").pop()}
            </span>
            <Button
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => window.open(msg.fileUrl, "_blank")}
            />
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
                <span>{msg.content as string}</span>
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
    return <span>{msg.content as string}</span>;
  };

  /** ✅ Render file preview component */
  const renderFilePreview = () => {
    if (!filePreview) return null;

    return (
      <div
        style={{
          padding: "12px",
          borderTop: "1px solid #eee",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Preview Content */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
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

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>
              {filePreview.file.name}
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {(filePreview.file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="small"
            onClick={clearFilePreview}
            icon={<CloseOutlined />}
            disabled={isUploading}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  /** ✅ Scroll helper */
  const scrollToBottom = useCallback((smooth = false) => {
    if (chatBodyRef.current?.scrollerElement) {
      const el = chatBodyRef.current.scrollerElement;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  const isNearBottom = useCallback(() => {
    if (!chatBodyRef.current?.scrollerElement) return true;
    const el = chatBodyRef.current.scrollerElement;
    const threshold = 100;
    return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  }, []);

  const handleScrollPositionChange = useCallback(() => {
    setShouldAutoScroll(isNearBottom());
  }, [isNearBottom]);

  /** ✅ Load messages */
  const loadMessages = useCallback(
    async (convId: string, limit = 30, beforeId: string | null = null) => {
      if (!convId) return;
      if (beforeId) setIsFetchingMore(true);
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
              const el = chatBodyRef.current?.scrollerElement;
              const prevHeight = el?.scrollHeight || 0;
              const prevScrollTop = el?.scrollTop || 0;

              setMsgList((prev) => [...formatted, ...prev]);

              setTimeout(() => {
                if (el) {
                  const newHeight = el.scrollHeight || 0;
                  const heightDiff = newHeight - prevHeight;
                  el.scrollTop = prevScrollTop + heightDiff;
                }
              }, 50);
            }
          } else {
            setMsgList(formatted);
            const clientInfo = res.data.client;
            setHeadingInfo({
              name: clientInfo.name,
              profilePic: clientInfo.profilePic,
            });
            setShouldAutoScroll(true);
            setTimeout(() => scrollToBottom(false), 100);
          }

          if (res.data.messages.length > 0) oldestMsgIdRef.current = res.data.messages[0]._id;
        }
      } catch (err) {
        message.error("Failed to load messages");
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [user?._id, scrollToBottom]
  );

  useEffect(() => {
    if (id) {
      setMsgList([]);
      setHasMore(true);
      setShouldAutoScroll(true);
      setLoadingImages(new Set());
      oldestMsgIdRef.current = null;
      clearFilePreview(); // Clear any existing preview when switching conversations
      loadMessages(id);
    }
  }, [id, loadMessages]);

  /** ✅ Cleanup preview URLs on unmount */
  useEffect(() => {
    return () => {
      if (filePreview?.preview) {
        URL.revokeObjectURL(filePreview.preview);
      }
    };
  }, [filePreview?.preview]);

  /** ✅ Socket listeners */
  useEffect(() => {
    if (!socket || !id) return;
    socket.emit("join_conversation", { conversationId: id });

    const handleReceiveMessage = (msg: Message) => {
      if (msg.conversationId !== id) return;

      const wasNearBottom = isNearBottom();

      setMsgList((prev) => {
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
  }, [socket, id, user, scrollToBottom, isNearBottom]);

  const handleScroll = useCallback(() => {
    if (!chatBodyRef.current) return;
    const el = chatBodyRef.current.scrollerElement;

    handleScrollPositionChange();

    if (el && el.scrollTop < 50 && hasMore && !isFetchingMore) {
      loadMessages(id, 30, oldestMsgIdRef.current);
    }
  }, [hasMore, isFetchingMore, id, loadMessages, handleScrollPositionChange]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!socket || !id) return;
      const value = e.target.value;
      if (value.trim()) {
        socket.emit("typing_start", { conversationId: id });
      } else {
        socket.emit("typing_stop", { conversationId: id });
      }
    },
    [socket, id]
  );

  const handleReply = (msg: Message) => {
    setReplyingTo(msg);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100vh" }}>
      {/* Header */}
      <div
        style={{
          padding: 12,
          height: "60px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>{headingInfo.name || "Loading..."}</h4>
        {isTyping && typingUser && <span style={{ fontStyle: "italic", color: "#888" }}>typing...</span>}
      </div>

      {/* Messages */}
      <Scrollbar ref={(el: any) => {
        chatBodyRef.current = el;
      }} onScroll={handleScroll} style={{ flex: 1, overflow: "auto", backgroundColor: "#f9fafb" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin tip="Loading messages..." />
          </div>
        ) : (
          <>
            {isFetchingMore && <div style={{ textAlign: "center", padding: 10 }}>Loading more...</div>}
            {!hasMore && msgList.length > 0 && (
              <div style={{ textAlign: "center", padding: 10, color: "#888", fontSize: 13 }}>
                --- You&apos;ve reached the end of the conversation ---
              </div>
            )}
            {msgList.length === 0 && !isLoading ? (
              <div style={{ textAlign: "center", padding: 20 }}>No messages yet.</div>
            ) : (
              msgList.map((msg) => {
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                      className="msg-bubble"
                    >
                      <Avatar
                        src={isMe ? user?.photoUrl : "https://avatars.githubusercontent.com/u/126343041?v=4"}
                        style={{ flexShrink: 0 }}
                        size={32}
                      >
                        {senderName.charAt(0)}
                      </Avatar>

                      <div style={{ flex: 1, minWidth: 0 }}>
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
                            <b>{msg.replyTo.senderId === user?._id ? "Me" : (msg.replyTo.senderInfo?.name || "Unknown")}:</b>{" "}
                            <span>{String(msg.replyTo.content).slice(0, 60)}...</span>
                          </div>
                        )}

                        <div
                          style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            position: "relative",
                            transition: "box-shadow 0.2s ease",
                          }}
                        >
                          {getMsgType(msg)}

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
          </>
        )}
      </Scrollbar>

      {/* File Preview */}
      {renderFilePreview()}

      {/* Reply preview above input */}
      {replyingTo && (
        <div
          style={{
            padding: "8px 12px",
            borderTop: "1px solid #eee",
            background: "#fafafa",
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            Replying to <b>{replyingTo.senderId === user?._id ? "Me" : (replyingTo.senderInfo?.name || "Unknown")}</b> –{" "}
            <span style={{ color: "#666" }}>{String(replyingTo.content).slice(0, 80)}...</span>
          </div>
          <Button type="link" size="small" onClick={() => setReplyingTo(null)} style={{ padding: 0 }}>
            Cancel
          </Button>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: 12, borderTop: "1px solid #eee" }}>
        <Form ref={formRef} onFinish={onSend} layout="inline" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
            accept="image/*,.pdf,.txt,.doc,.docx,video/*"
          />

          {/* File Upload Button */}
          <Button
            icon={<PaperClipOutlined />}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          />

          {/* Text Input */}
          <Form.Item name="newMsg" style={{ flex: 1, marginBottom: 0 }}>
            <Input
              placeholder={filePreview ? "Add a message (optional)" : "Type a message"}
              onChange={handleInputChange}
              ref={inputRef}
              disabled={isUploading}
            />
          </Form.Item>

          {/* Send Button */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={isUploading}
              disabled={isUploading}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}