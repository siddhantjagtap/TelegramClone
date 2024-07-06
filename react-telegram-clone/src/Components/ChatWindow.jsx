import React from 'react';
import { Typography, TextField, IconButton, Avatar } from '@mui/material';
import { FiPaperclip, FiMic, FiArrowLeft, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';

function ChatWindow({ selectedChat, messages, isMobile, onBackClick }) {
  return (
    <div className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col bg-[#0E1621]`}>
      {selectedChat && (
        <>
          <div className="bg-[#17212B] p-3 shadow-md flex items-center justify-between">
            <div className="flex items-center">
              {isMobile && (
                <IconButton color="inherit" onClick={onBackClick} className="mr-2">
                  <FiArrowLeft />
                </IconButton>
              )}
              <Avatar className="mr-3 bg-[#2AABEE]">
                {selectedChat.creator.name ? selectedChat.creator.name[0].toUpperCase() : 'A'}
              </Avatar>
              <Typography variant="h6" className="font-semibold text-white">
                {selectedChat.creator.name || 'Anonymous'}
              </Typography>
            </div>
            <div>
              <IconButton color="inherit">
                <FiSearch />
              </IconButton>
              <IconButton color="inherit">
                <FiMoreVertical />
              </IconButton>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === 1 ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender_id === 1 ? 'bg-[#2AABEE]' : 'bg-[#242F3D]'
                  }`}
                >
                  <Typography color="textPrimary">{message.message}</Typography>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-[#17212B]">
            <div className="flex items-center bg-[#242F3D] rounded-full p-2">
              <IconButton size="small" color="inherit">
                <FiPaperclip />
              </IconButton>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Write a message..."
                InputProps={{ 
                  disableUnderline: true,
                  style: { color: 'white' }
                }}
                className="mx-2"
              />
              <IconButton size="small" color="inherit">
                <FiMic />
              </IconButton>
              <IconButton size="small" color="primary">
                <RiSendPlaneFill />
              </IconButton>
            </div>
          </div>
        </>
      )}
      {!selectedChat && (
        <div className="flex-grow flex items-center justify-center">
          <Typography variant="h6" color="textSecondary">
            Select a chat to start messaging
          </Typography>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;