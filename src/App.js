import logo from './logo.svg';
import './App.css';
import Main1 from "./main1.js";

function App() {
  return (
    <div className="App">
        <nav className="navbar  navbar-dark bg-primary fixed-nav-bar">
            <div className="container-fluid">
            <img src="https://image.flaticon.com/icons/png/128/2698/2698194.png"/>
                <span className="navbar-brand">Weather ForeCast</span> 
            </div>
        </nav>
        <div className="container">
        <Main1 />
        </div>
        <div className="footer">
        <footer>Developed by Abhishek Kumar</footer>
        </div>
    </div>
  );
}

export default App;
