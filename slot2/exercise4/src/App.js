import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello <span style={{color: 'blue'}}>React</span></h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{height: '2px', backgroundColor: 'red', margin: '10px 0'}}></div>
        <p style={{color: 'blue', fontFamily: '-moz-initial'}}>
          This is React Logo
        </p>
        <p>The library for web and native user interface</p>
      </header>
    </div>
  );
}

export default App;
