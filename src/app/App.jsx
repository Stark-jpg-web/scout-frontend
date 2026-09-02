import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from '../components/layout/AppLayout.jsx'
import HomePage from '../pages/HomePage.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import LibraryPage from '../pages/LibraryPage.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
