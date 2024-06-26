
import { Toaster } from 'react-hot-toast';
import './App.css';
import Body from './components/Body.js';

function App() {
  return (
    <div className="App">
       <Body/>
       <Toaster></Toaster>
    </div>
  );
}

export default App;
