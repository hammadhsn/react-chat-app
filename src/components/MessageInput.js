import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const MessageInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <Box display="flex" width="100%" mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onTyping();
        }}
        keypress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        sx={{ ml: 1 }}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
