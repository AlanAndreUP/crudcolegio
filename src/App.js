import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Panel from './componets/Menu'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel />} />
     
      </Routes>
    </Router>
  );
}

export default App;
