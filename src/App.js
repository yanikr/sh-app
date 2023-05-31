// import logo from './logo.svg';
import './App.css';
import { NavBar } from './screens/navbar/NavBar';
import { HomeScreen } from './screens/home/HomeScreen';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { Route, Routes } from 'react-router-dom';
import { HeroPage } from './components/heroes/HeroPage';

function App() {
  const theme = createTheme(themeSettings());
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/:id" element={<HeroPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
