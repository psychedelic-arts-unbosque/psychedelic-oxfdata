import React from 'react';
import {DictionaryComponent} from './containers/DictionaryContainer/DictionaryContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <DictionaryComponent />
      <ToastContainer />
    </div>
  );
}

export default App;
