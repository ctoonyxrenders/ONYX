"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Badge, Input, Avatar, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { getAdminConversationApi } from "@/app/api/backend/chat";
import { getSocket } from "@/lib/socket";
import { AllConversationApiResponse } from "@/types/api";

export default function ChatMenu() {
  const [fullList, setFullList] = useState<AllConversationApiResponse[]>([]);
  const [list, setList] = useState<AllConversationApiResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadingRef = useRef<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const socket = getSocket();
  const currentConversationId = pathname ? pathname.split("/")[4] || "" : "";

  // ---- Fetch Conversations ----
  const fetchConversations = async (pageNum: number, reset = false) => {
    if (loadingRef.current || (!hasMore && !reset)) return;
    loadingRef.current = true;
    setIsLoading(pageNum === 1);
    try {
      const res = await getAdminConversationApi(10);
      if (res.success && res.data) {
        const newConversations = res.data as AllConversationApiResponse[];
        if (reset || pageNum === 1) {
          setFullList(newConversations);
          setList(newConversations);
          router.push(`/dashboard/admin/chat/${newConversations[0]._id}`);
        } else {
          setFullList((prev) => [...prev, ...newConversations]);
          setList((prev) => [...prev, ...newConversations]);
        }
        setHasMore(newConversations.length === 10);
      } else {
        setHasMore(false);
        if (pageNum === 1) setFullList([]);
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  // ---- Infinite Scroll ----
  const handleScroll = useCallback(() => {
    if (!listRef.current || isLoading) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      hasMore &&
      !loadingRef.current
    )
      setPage((prev) => prev + 1);
  }, [hasMore, isLoading]);

  useEffect(() => {
    fetchConversations(page);
  }, [page]);


  // ---- Open Chat ----
  const openChat = useCallback(
    (conversationId: string) => {
      router.push(`/dashboard/admin/chat/${conversationId}`);

      // Join that specific room
      socket?.emit("join_conversation", { conversationId });

      // Reset unread count locally
      setList((prev) =>
        prev.map((conv) =>
          conv._id === conversationId ? { ...conv, adminUnread: 0 } : conv
        )
      );
      setFullList((prev) =>
        prev.map((conv) =>
          conv._id === conversationId ? { ...conv, adminUnread: 0 } : conv
        )
      );

      // Optionally tell backend to reset unread in DB too
      socket?.emit("reset_unread", { conversationId, role: "admin" });
    },
    [router, socket]
  );


  // ---- Search ----
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);
      if (!query) setList(fullList);
      else
        setList(
          fullList.filter(
            (item) =>
              item.clientId.name?.toLowerCase().includes(query) ||
              item.clientId.email?.toLowerCase().includes(query)
          )
        );
    },
    [fullList]
  );

  // ---- Socket: Receive Message ----
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (msg: any) => {

      setList((prev) =>
        prev
          .map((conv) => {
            const isActive = conv._id === currentConversationId;
            if (conv._id === msg.conversationId) {
              const updatedConv = {
                ...conv,
                lastMessage: {
                  ...msg,
                  senderId: msg.senderId,
                  senderInfo: msg.senderInfo || {},
                },
                updatedAt: msg.createdAt,
                // Use the unread count from the message (which comes from DB)
                adminUnread: msg.adminUnread !== undefined ? msg.adminUnread : conv.adminUnread,
              };
              return updatedConv;
            }
            return conv;
          })
          .sort(
            (a, b) =>
              new Date(b.lastMessage?.createdAt || 0).getTime() -
              new Date(a.lastMessage?.createdAt || 0).getTime()
          )
      );

      // Also update fullList to keep search results consistent
      setFullList((prev) =>
        prev.map((conv) => {
          if (conv._id === msg.conversationId) {
            return {
              ...conv,
              lastMessage: {
                ...msg,
                senderId: msg.senderId,
                senderInfo: msg.senderInfo || {},
              },
              updatedAt: msg.createdAt,
              adminUnread: msg.adminUnread !== undefined ? msg.adminUnread : conv.adminUnread,
            };
          }
          return conv;
        })
      );
    };


    socket.on("receive_message", handleMessage);
    // socket.on("unread_reset", handleUnreadReset);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [socket, currentConversationId]);

  // ---- Format helpers ----
  const formatLastMessage = (conv: AllConversationApiResponse) => {
    if (!conv.lastMessage) return "No messages yet";
    const { content, type } = conv.lastMessage;
    if (type === "image") return "📷 Image";
    if (type === "file") return "📎 File";
    if (type === "video") return "🎥 Video";
    if (type === "project") return "📁 Project Details";
    if (type === "invoice") return "📁 Invoice Details";
    return content?.length > 45
      ? content.substring(0, 45) + "..."
      : content || "";
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getTotalUnreadCount = () =>
    list.reduce((sum, c) => sum + (c.adminUnread || 0), 0);

  // ---- UI ----
  return (
    <div
      style={{
        flex: "0 0 300px",
        maxWidth: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e5e7eb",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Messages</h2>
          {getTotalUnreadCount() > 0 && (
            <Badge count={getTotalUnreadCount()} />
          )}
        </div>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          allowClear
        />
      </div>

      <div
        ref={listRef}
        onScroll={handleScroll}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {isLoading && page === 1 ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin />
          </div>
        ) : list.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            No conversations
          </div>
        ) : (
          list.map((conv) => {
            const isSelected = conv._id === currentConversationId;
            const unread = conv.adminUnread || 0;
            return (
              <div
                key={conv._id}
                onClick={() => openChat(conv._id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: 12,
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#eff6ff" : "transparent",
                  borderLeft: isSelected
                    ? "3px solid #3b82f6"
                    : "3px solid transparent",
                }}
              >
                <Avatar
                  src={
                    conv.clientId.profilePic ||
                    "https://avatars.githubusercontent.com/u/126343041?v=4"
                  }
                >
                  {conv.clientId.name?.charAt(0)}
                </Avatar>
                <div style={{ marginLeft: 8, flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{conv.clientId.name}</strong>
                    <span style={{ fontSize: 12, color: "#888" }}>
                      {conv.lastMessage?.createdAt
                        ? formatTime(conv.lastMessage.createdAt)
                        : ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      color: "#555",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatLastMessage(conv)}
                    </span>
                    {unread > 0 && <Badge count={unread} />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}