import './App.css';
import Navbar from './navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddContacts from './kontakt/AddKontakt';
import EditContacts from './kontakt/EditKontakt';
import 'bootstrap/dist/css/bootstrap.css';
import AddRelation from './beziehung/AddRelation';
import EditRelation from './beziehung/EditRelation';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addcontact" element={<AddContacts />} />
          <Route exact path="/editcontact/:id" element={<EditContacts />} />
          <Route exact path="/addrelation" element={<AddRelation />} />
          <Route exact path="/editrelation/:id" element={<EditRelation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
