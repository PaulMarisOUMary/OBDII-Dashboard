import { useState } from 'react';

import { DataProvider } from './context/data';
import Bridge from './api/bridge';

import Modal from './components/modal';
import Dashboard from './pages/dashboard';

import gearIcon from './assets/svg/gear.svg';
import Settings from './components/settings';

function App() {
  const [bridge, setBridge] = useState(new Bridge('http://localhost:8000'));

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DataProvider bridge={bridge} setBridge={setBridge}>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Settings"
        className="fixed bottom-4 right-4 z-50 rounded p-2 text-white hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-white transition"
      >
        <img src={gearIcon} alt="Settings" className="h-5 w-5 invert" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Settings/>
      </Modal>

      <Dashboard/>
    </DataProvider>
  );
}

export default App
