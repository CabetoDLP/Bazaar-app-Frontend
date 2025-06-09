import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/api';
import type { IProduct } from '../types/Product';
import ProductCard from '../components/ProductCard';
import SearchBox from '../components/SearchBox';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    setSearchQuery(query);

    if (query) {
      const fetchProducts = async () => {
        try {
          const data = await searchProducts(query);
          setProducts(data);
          setLoading(false);
        } catch (err) {
          setError('Error al buscar productos');
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      navigate('/');
    }
  }, [location.search, navigate]);

  if (loading) {
    return (
      <div className="rounded-lg min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-600">Buscando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Box Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="max-w-2xl mx-auto">
            <SearchBox/>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Resultados de búsqueda {searchQuery && `para "${searchQuery}"`}
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron productos</h3>
            <p className="mt-1 text-sm text-gray-500">
              No hay resultados para "{searchQuery}". Intenta con otras palabras.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;