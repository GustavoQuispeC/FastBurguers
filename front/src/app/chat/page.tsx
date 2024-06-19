"use client";

import React, { useEffect, useState } from "react";
import Chat from "@/components/Chat/Chat";
import { useRouter } from "next/navigation";

const ChatContainer: React.FC = () => {
  const router = useRouter();
  const [userSession, setUserSession] = useState("");

  useEffect(() => {
    const userSessionData = JSON.parse(
      localStorage.getItem("userSession") || "{}"
    );
    const userId = userSessionData?.userData?.data?.userid || "";
    if (userId && userId.trim() !== "") {
      setUserSession(userId);
    } else {
      // Redireccionar al usuario a la página de inicio si no está logueado
      router.push("/home");
      alert("Por favor inicie sesión para acceder al chat");
    }
  }, [router]);

  return userSession ? <Chat room={userSession} /> : null;
};

export default ChatContainer;
