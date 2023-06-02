// import logo from './logo.svg';
import './App.css';
import { HomeScreen } from './screens/home/HomeScreen';
import { ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';
import { Route, Routes } from 'react-router-dom';
import { HeroPage } from './components/heroes/HeroPage';
import { Logo } from './components/logo/Logo';

function App() {
  return (
    <ThemeProvider theme={themeSettings}>
      <Logo />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/:id" element={<HeroPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
