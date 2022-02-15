
import { BrowserRouter as Route, Router, Routes } from 'react-router-dom';
import './App.css';

import Home from './Home.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= { <Home/>}  />
      </Routes>
    </Router>
  );
}

export default App;
