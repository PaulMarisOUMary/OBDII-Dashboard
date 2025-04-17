import { useState } from 'react';

import { DataProvider } from './context/data';
import Bridge from './api/bridge';

import Modal from './components/modal';

import gearIcon from './assets/svg/gear.svg';

import './App.css';

function App() {
  const bridge = new Bridge('http://localhost:8000')

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DataProvider bridge={bridge}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div></div>
      </Modal>
    </DataProvider>
  );
}

export default App
