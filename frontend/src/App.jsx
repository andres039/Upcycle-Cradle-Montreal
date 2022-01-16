import Map from './components/Map';
import './App.css';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import SideBar from './components/SideBar/Index';

// import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Map />
      <SideBar username="Homer Simpson" />
    </div>
  );
}

export default App;
