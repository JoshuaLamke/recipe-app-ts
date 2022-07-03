import React from 'react';
import Routes from './Routes';
import './app.css';
import { ThemeProvider } from './utils/ThemeProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
