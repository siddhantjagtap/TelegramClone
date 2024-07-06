import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, InputBase } from '@mui/material';
import { FiMenu, FiSearch } from 'react-icons/fi';

function Sidebar({ chats, onChatSelect, isMobile }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.creator && chat.creator.name && 
    chat.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${isMobile ? 'w-full' : 'w-1/3'} bg-[#17212B] border-r border-[#242F3D] flex flex-col`}>
      <div className="p-2 flex items-center border-b border-[#242F3D]">
        <IconButton color="inherit">
          <FiMenu />
        </IconButton>
        <InputBase
          placeholder="Search"
          className="ml-2 flex-grow text-white"
          startAdornment={<FiSearch className="text-[#8E9BA7] mr-2" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <List className="overflow-y-auto flex-grow">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ListItem key={chat.id} button onClick={() => onChatSelect(chat)} className="hover:bg-[#242F3D]">
              <ListItemAvatar>
                <Avatar className="bg-[#2AABEE]">
                  {chat.creator && chat.creator.name ? chat.creator.name[0].toUpperCase() : '?'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={chat.creator && chat.creator.name ? chat.creator.name : 'Anonymous'}
                secondary={`Messages: ${chat.msg_count}`}
                secondaryTypographyProps={{ color: 'textSecondary' }}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No chats available" />
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default Sidebar;