import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Container } from "@mui/material";
import ChatRoom from "./ChatRoom";
import Join from "./Join";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const roomRef = useRef("");

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    // Listen for typing events from the server
    socket.on("typing", ({ user }) => {
      setTyping(`${user} is typing...`);
    });

    // Listen for stop typing events from the server
    socket.on("stopTyping", () => {
      setTyping("");
    });

    // Clean up the effect when the component is unmounted
    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  const handleJoin = (username, room) => {
    setUsername(username);
    setRoom(room);
    roomRef.current = room;
    socket.emit("join", { username, room });
    localStorage.setItem("username", username);
    localStorage.setItem("room", room);
  };

  const sendMessage = (message) => {
    if (message) {
      socket.emit("sendMessage", { message, room: roomRef.current });
    }
  };

  const handleTyping = () => {
    socket.emit("typing", { room: roomRef.current });
    setTimeout(() => {
      socket.emit("stopTyping", { room: roomRef.current });
    }, 1000);
  };

  return (
    <Container>
      {!username ? (
        <Join onJoin={handleJoin} />
      ) : (
        <ChatRoom
          username={username}
          room={room}
          messages={messages}
          sendMessage={sendMessage}
          handleTyping={handleTyping}
          typing={typing}
        />
      )}
    </Container>
  );
};

export default Chat;
