"use client";

import React, { useEffect, useState } from "react";
import Chat from "@/components/Chat/Chat";

const ChatContainer: React.FC = () => {
  const [userSession, setUserSession] = useState("");

  useEffect(() => {
    const userSessionData = JSON.parse(
      localStorage.getItem("userSession") || "{}"
    );
    const userId = userSessionData?.userData?.data?.userid || "";
    if (userId && userId.trim() !== "") {
      setUserSession(userId);
    }
  }, []);

  return <Chat room={userSession} />; // Indicamos que no es el admin
};

export default ChatContainer;
