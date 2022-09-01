import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import { useClearCache } from 'react-clear-cache';
import { useEffect } from 'react';
import Thumbnails from './pages/thumbnails/thumbnails';
import OpenVideo from './pages/openVideo/openVideo';
import Upload from './pages/upload/upload';

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
      <Route exact path='/videos' element={<Thumbnails />} />
      <Route exact path='/videos/:id' element={<OpenVideo />} />
      <Route exact path='/upload' element={<Upload />} />
    </Routes>
  );
}

export default App;
