import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import { useClearCache } from 'react-clear-cache';
import { useEffect } from 'react';

function App() {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  useEffect(() => {
    if(!isLatestVersion) {
      emptyCacheStorage()
    }
  }, [])

  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
    </Routes>
  );
}

export default App;
