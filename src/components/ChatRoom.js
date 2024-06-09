import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Message from "./Message";
import MessageInput from "./MessageInput";

const ChatRoom = ({
  username,
  room,
  messages,
  sendMessage,
  handleTyping,
  typing,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4">Room: {room}</Typography>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          height: 400,
          overflow: "auto",
          mt: 3,
          p: 2,
        }}
      >
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            user={msg.user}
            text={msg.text}
            isOwnMessage={msg.user === username}
          />
        ))}
        {typing && (
          <Typography variant="body2" color="textSecondary">
            {typing}
          </Typography>
        )}
      </Paper>
      <MessageInput onSendMessage={sendMessage} onTyping={handleTyping} />
    </Box>
  );
};

export default ChatRoom;
