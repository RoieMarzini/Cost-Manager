import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import AddCost from './pages/AddCost';
import Report from './pages/Report';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <div className="app">
         <Router>
            <Navbar />
            <Routes>
               <Route index element={<Home />} />
               <Route path="/addUser" element={<AddUser />} />
               <Route path="/addCost" element={<AddCost />} />
               <Route path="/report" element={<Report />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
