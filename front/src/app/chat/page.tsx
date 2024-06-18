"use client";

import ChatUsers from "@/components/Chat/Chat";

const Chat = () => {
  const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
  const userId = userSession?.userData?.data?.userid || "";

  return <ChatUsers room={userId} />;
};

export default Chat;
