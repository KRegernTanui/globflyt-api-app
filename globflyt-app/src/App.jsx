import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Searchbar from './Components/Searchbar.jsx';
import Imagecard from './Components/Imagecard.jsx';
import HomePage from './Components/HomePage.jsx';
import Viewtab from './Components/Viewtab.jsx';
import Signincard from "./Components/Signincard.jsx";
import Randompicks from './Components/Randompicks.jsx';
import './index.css';
import Aboutus from './Components/Aboutus.jsx';
import Contactus from './Components/Contactus.jsx';
import Privacyterms from './Components/Privacyterms.jsx';

function App() {
    const handleSearch = (term) => {
        console.log("Searching for:", term);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="Viewtab" element={<Viewtab/>}/>
                <Route path="Signincard" element={<Signincard/>}/>
            </Routes>
        </Router>
    );
}
export default App;
