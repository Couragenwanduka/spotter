import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './page/landingpage';
import './App.css';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/search" element={<SearchPage />} />
         <Route path="/profile/:userId" element={<ProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
