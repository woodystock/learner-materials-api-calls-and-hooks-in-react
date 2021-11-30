import './App.css';
import React from 'react';
import { FavouritesProvider } from './components/FavouritesContext';
import AppPage from './components/AppPage';

function App() {

  return (
    <FavouritesProvider>
      <AppPage />
    </FavouritesProvider>
  );
}

export default App;
