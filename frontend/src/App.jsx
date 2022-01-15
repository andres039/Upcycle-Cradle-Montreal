import './App.css';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import NewItemForm from './components/SideBar/NewItemForm';

// import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <NewItemForm/>
      <LoginForm/>
    </div>
  );
}

export default App;
