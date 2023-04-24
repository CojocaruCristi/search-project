
import './App.css';
import {BrowserRouter as Router, useNavigate } from 'react-router-dom';
import SearchComponent from "./SearchComponent";

function App() {


  return (
      <Router >
          <div className="App">
              <SearchComponent />
          </div>
      </Router>
  );
}

export default App;
