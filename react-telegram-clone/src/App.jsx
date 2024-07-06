import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ChatList />} />
      <Route path="/chat/:id" element={<ChatWindow />} />
    </Routes>
  </Router>
);

export default App;
