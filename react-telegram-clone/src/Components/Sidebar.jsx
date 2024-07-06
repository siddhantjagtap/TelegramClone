import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar, IconButton, InputBase, Typography, Switch } from '@mui/material';
import { FiMenu, FiSearch, FiMoon, FiSun, FiUser, FiUsers, FiPhone, FiMapPin, FiSave, FiSettings, FiUserPlus, FiHelpCircle } from 'react-icons/fi';

function Sidebar({ chats, onChatSelect, isMobile, isDarkMode, toggleDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const filteredChats = chats.filter(chat => 
    chat.creator && chat.creator.name && 
    chat.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuItems = [
    { icon: <FiUser />, text: 'My Profile' },
    { icon: <FiUsers />, text: 'New Group' },
    { icon: <FiPhone />, text: 'Calls' },
    { icon: <FiMapPin />, text: 'People Nearby' },
    { icon: <FiSave />, text: 'Saved Messages' },
    { icon: <FiSettings />, text: 'Settings' },
    { icon: <FiUserPlus />, text: 'Invite Friends' },
    { icon: <FiHelpCircle />, text: 'Telegram Features' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearchFocused(e.target.value.length > 0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'w-1/3'} ${isDarkMode ? 'bg-[#17212B]' : 'bg-white'} border-r ${isDarkMode ? 'border-[#242F3D]' : 'border-gray-200'} flex flex-col h-full`}>
      <div className="p-2 flex items-center border-b border-[#242F3D]" ref={searchRef}>
        <IconButton color="inherit" onClick={toggleMenu}>
          <FiMenu />
        </IconButton>
        <InputBase
          placeholder="Search"
          className={`ml-2 flex-grow ${isDarkMode ? 'text-white' : 'text-black'}`}
          startAdornment={<FiSearch className={`${isDarkMode ? 'text-[#8E9BA7]' : 'text-gray-500'} mr-2`} />}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
        />
      </div>
      {isMenuOpen && (
        <div className={`${isDarkMode ? 'bg-[#0E1621]' : 'bg-gray-100'} p-4 absolute left-0 top-0 h-full w-64 z-10`}>
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className={isDarkMode ? 'text-white' : 'text-black'}>Settings</Typography>
            <IconButton color="inherit" onClick={toggleMenu}>
              <FiMenu />
            </IconButton>
          </div>
          <div className="flex items-center justify-between mb-4">
            <Typography className={isDarkMode ? 'text-white' : 'text-black'}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Typography>
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              icon={<FiSun className="text-yellow-400" />}
              checkedIcon={<FiMoon className="text-blue-400" />}
            />
          </div>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon className={isDarkMode ? 'text-white' : 'text-black'}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className={isDarkMode ? 'text-white' : 'text-black'} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {isSearchFocused && searchTerm && (
        <div className="overflow-x-auto whitespace-nowrap py-4 border-b border-[#242F3D] flex">
          {filteredChats.map((chat) => (
            <div key={chat.id} className="flex flex-col items-center mx-4" onClick={() => onChatSelect(chat)}>
              <Avatar
                className="w-16 h-16 mb-2 bg-[#2AABEE] text-2xl"
                alt={chat.creator.name}
              >
                {chat.creator && chat.creator.name ? chat.creator.name[0].toUpperCase() : '?'}
              </Avatar>
              <Typography variant="caption" className={isDarkMode ? 'text-white' : 'text-black'} style={{ textAlign: 'center' }}>
                {chat.creator.name || 'Anonymous'}
              </Typography>
            </div>
          ))}
        </div>
      )}
      {(!isSearchFocused || !searchTerm) && (
        <List className="overflow-y-auto flex-grow">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ListItem key={chat.id} onClick={() => onChatSelect(chat)} className={`hover:${isDarkMode ? 'bg-[#242F3D]' : 'bg-gray-100'}`}>
                <ListItemAvatar>
                  <Avatar className="bg-[#2AABEE]">
                    {chat.creator && chat.creator.name ? chat.creator.name[0].toUpperCase() : '?'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.creator && chat.creator.name ? chat.creator.name : 'Anonymous'}
                  secondary={`Messages: ${chat.msg_count}`}
                  primaryTypographyProps={{ className: isDarkMode ? 'text-white' : 'text-black' }}
                  secondaryTypographyProps={{ className: isDarkMode ? 'text-[#8E9BA7]' : 'text-gray-500' }}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No chats available" className={isDarkMode ? 'text-white' : 'text-black'} />
            </ListItem>
          )}
        </List>
      )}
    </div>
  );
}

export default Sidebar;
