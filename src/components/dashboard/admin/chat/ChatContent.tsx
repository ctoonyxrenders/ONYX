"use client";

import React from "react";

interface ConversationProps {
  id: string;
}

const Conversation: React.FC<ConversationProps> = ({ id }) => {
  return (
    <div className="conversation-container">
      <h2>Conversation ID: {id}</h2>
    </div>
  );
};

export default Conversation;
