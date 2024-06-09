import React from "react";
import { Box, Typography } from "@mui/material";

const Message = ({ user, text, isOwnMessage }) => {
  return (
    <Box
      display="flex"
      justifyContent={isOwnMessage ? "flex-end" : "flex-start"}
      mb={1}
    >
      <Typography
        variant="body1"
        sx={{
          backgroundColor: isOwnMessage ? "primary.light" : "grey.300",
          borderRadius: 1,
          p: 1,
        }}
      >
        <strong>{user}: </strong>
        {text}
      </Typography>
    </Box>
  );
};

export default Message;
