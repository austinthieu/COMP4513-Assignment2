"use client";
import { useState, useEffect } from 'react';
import { FaHeart, FaInfoCircle, FaSortAmountDown } from 'react-icons/fa';
import Dashboard from '../components/Dashboard';
// Mock data - replace with your API calls
const mockGalleries = [
  { id: 1, name: "Modern Art Museum", nativeName: "Museo de Arte Moderno", city: "Barcelona", address: "123 Art Street", country: "Spain", url: "https://example.com/modern-art", latitude: 41.3851, longitude: 2.1734 },
  { id: 2, name: "National Gallery", nativeName: "National Gallery", city: "London", address: "Trafalgar Square", country: "UK", url: "https://example.com/national", latitude: 51.5086, longitude: -0.1283 },
  { id: 3, name: "Louvre Museum", nativeName: "Musée du Louvre", city: "Paris", address: "Rue de Rivoli", country: "France", url: "https://example.com/louvre", latitude: 48.8606, longitude: 2.3376 },
  { id: 4, name: "MoMA", nativeName: "Museum of Modern Art", city: "New York", address: "11 W 53rd St", country: "USA", url: "https://example.com/moma", latitude: 40.7614, longitude: -73.9776 },
  { id: 5, name: "Uffizi Gallery", nativeName: "Gallerie degli Uffizi", city: "Florence", address: "Piazzale degli Uffizi", country: "Italy", url: "https://example.com/uffizi", latitude: 43.7684, longitude: 11.2553 },
];

const mockPaintings = [
  { id: 1, title: "Starry Night", artist: "Vincent van Gogh", year: 1889, galleryId: 4, image: "/paintings/starry-night.jpg" },
  { id: 2, title: "Mona Lisa", artist: "Leonardo da Vinci", year: 1503, galleryId: 3, image: "/paintings/mona-lisa.jpg" },
  { id: 3, title: "Guernica", artist: "Pablo Picasso", year: 1937, galleryId: 1, image: "/paintings/guernica.jpg" },
  { id: 4, title: "The Birth of Venus", artist: "Sandro Botticelli", year: 1485, galleryId: 5, image: "/paintings/birth-of-venus.jpg" },
  { id: 5, title: "The Fighting Temeraire", artist: "J.M.W. Turner", year: 1839, galleryId: 2, image: "/paintings/fighting-temeraire.jpg" },
];

export default function GalleryView() {
  const [galleries, setGalleries] = useState(mockGalleries);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [activeTab, setActiveTab] = useState('galleries');

  // Load paintings when gallery is selected
  useEffect(() => {
    if (selectedGallery) {
      const galleryPaintings = mockPaintings.filter(p => p.galleryId === selectedGallery.id);
      setPaintings(galleryPaintings);
    } else {
      setPaintings([]);
    }
  }, [selectedGallery]);

  // Sort galleries alphabetically by name
  const sortedGalleries = [...galleries].sort((a, b) => a.name.localeCompare(b.name));

  // Sort paintings based on selected sort criteria
  const sortedPaintings = [...paintings].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
    if (sortBy === 'year') return a.year - b.year;
    return 0;
  });

  // Add or remove gallery from favorites
  const toggleFavorite = (gallery) => {
    if (favorites.some(fav => fav.id === gallery.id)) {
      setFavorites(favorites.filter(fav => fav.id !== gallery.id));
    } else {
      setFavorites([...favorites, gallery]);
    }
  };

  // Modal dialog for selected painting
  const [selectedPainting, setSelectedPainting] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} favoritesCount={favorites.length} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left column - Gallery List */}
          <div className="w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg">
            <h2 className="font-bold text-xl mb-4">Galleries</h2>
            <ul className="space-y-2">
              {sortedGalleries.map(gallery => (
                <li
                  key={gallery.id}
                  className={`py-2 px-3 rounded cursor-pointer hover:bg-gray-700 ${selectedGallery?.id === gallery.id ? 'bg-indigo-600' : ''}`}
                  onClick={() => setSelectedGallery(gallery)}
                >
                  {gallery.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Middle column - Gallery Info and Map */}
          <div className="w-2/4 space-y-6">
            {selectedGallery ? (
              <>
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                  <h2 className="font-bold text-xl mb-3">{selectedGallery.name}</h2>
                  <p><strong>Native Name:</strong> {selectedGallery.nativeName}</p>
                  <p><strong>Location:</strong> {selectedGallery.address}, {selectedGallery.city}, {selectedGallery.country}</p>
                  <p>
                    <a
                      href={selectedGallery.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      Visit Gallery Website
                    </a>
                  </p>
                  <button
                    onClick={() => setFavorites([...favorites, ...paintings.filter(p => !favorites.some(f => f.id === p.id))])}
                    className="mt-3 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded flex items-center"
                  >
                    <FaHeart className="mr-2" /> Add Favorites
                  </button>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 h-64 shadow-lg">
                  {/* If using Leaflet, add appropriate imports */}
                  <h2 className="font-bold text-xl mb-3">Location</h2>
                  <div className="h-48 bg-gray-700 rounded flex items-center justify-center">
                    <p>Map would display here using Leaflet</p>
                    <p>Coordinates: {selectedGallery.latitude}, {selectedGallery.longitude}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 h-64 shadow-lg flex items-center justify-center">
                <p className="text-gray-400">Select a gallery to view details</p>
              </div>
            )}
          </div>

          {/* Right column - Paintings */}
          <div className="w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Paintings</h2>
              <div className="flex items-center">
                <label htmlFor="sortby" className="mr-2 text-sm">Sort by:</label>
                <select
                  id="sortby"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 text-gray-100 text-sm rounded px-2 py-1"
                >
                  <option value="title">Title</option>
                  <option value="artist">Artist</option>
                  <option value="year">Year</option>
                </select>
              </div>
            </div>

            {sortedPaintings.length > 0 ? (
              <ul className="space-y-3">
                {sortedPaintings.map(painting => (
                  <li
                    key={painting.id}
                    className="py-2 px-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                    onClick={() => setSelectedPainting(painting)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{painting.title}</p>
                        <p className="text-sm text-gray-400">{painting.artist}, {painting.year}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(painting);
                        }}
                        className={`p-1 rounded ${favorites.some(f => f.id === painting.id) ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No paintings to display</p>
            )}
          </div>
        </div>
      </main>

      {/* Painting Modal */}
      {selectedPainting && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedPainting.title}</h2>
              <button
                onClick={() => setSelectedPainting(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-6">
              <div className="w-1/2">
                <div className="bg-gray-700 h-64 rounded flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p>Painting Image</p>
                </div>
              </div>
              <div className="w-1/2">
                <p><strong>Artist:</strong> {selectedPainting.artist}</p>
                <p><strong>Year:</strong> {selectedPainting.year}</p>
                <p><strong>Gallery:</strong> {galleries.find(g => g.id === selectedPainting.galleryId)?.name}</p>
                <button
                  onClick={() => toggleFavorite(selectedPainting)}
                  className={`mt-4 px-4 py-2 rounded flex items-center ${favorites.some(f => f.id === selectedPainting.id)
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                  <FaHeart className="mr-2" />
                  {favorites.some(f => f.id === selectedPainting.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 py-4 mt-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} austinthieu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
