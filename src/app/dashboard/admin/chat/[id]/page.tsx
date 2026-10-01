"use client";

import Conversation from "@/components/dashboard/admin/chat/Conversation";
import { use } from "react";

export default function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <Conversation id={resolvedParams.id} />;
}
