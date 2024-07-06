import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Components/Sidebar';
import ChatWindow from './Components/ChatWindow';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3390EC',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#707579',
    },
  },
});

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchChats();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch('https://devapi.beyondchats.com/api/get_all_chats?page=1');
      const data = await response.json();
      setChats(data.data.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex h-screen bg-white">
        {(!isMobile || !selectedChat) && (
          <Sidebar chats={chats} onChatSelect={handleChatSelect} isMobile={isMobile} />
        )}
        {(!isMobile || selectedChat) && (
          <ChatWindow
            selectedChat={selectedChat}
            messages={messages}
            isMobile={isMobile}
            onBackClick={() => setSelectedChat(null)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
