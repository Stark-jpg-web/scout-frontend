import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from '../components/layout/AppLayout.jsx'
import HomePage from '../pages/HomePage.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import WatchlistPage from '../pages/WatchlistPage.jsx'
import CategoryPage from '../pages/CategoryPage.jsx'
import MediaDetailsPage from '../pages/MediaDetailsPage.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover/:category" element={<CategoryPage />} />
          <Route path="/discover/:id" element={<CategoryPage />} />
          <Route path="/:mediaType/:id" element={<MediaDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
