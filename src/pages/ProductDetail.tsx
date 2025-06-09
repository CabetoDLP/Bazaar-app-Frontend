import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail, addRating } from '../services/api';
import type { IProduct } from '../types/Product';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          navigate('/');
          return;
        }
        const data = await getProductDetail(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Producto no encontrado');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddRating = async () => {
    if (!id || rating === 0) return;
    
    setSubmittingRating(true);
    try {
      await addRating(id, rating);
      // Refrescar los datos del producto
      const updatedProduct = await getProductDetail(id);
      setProduct(updatedProduct);
      setRating(0);
    } catch (err) {
      console.error('Error al agregar valoración:', err);
    } finally {
      setSubmittingRating(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  const averageRating = product.ratings.length > 0 
    ? product.ratings.reduce((sum, rating) => sum + rating.value, 0) / product.ratings.length
    : 0;

  return (
  <div className="rounded-lg min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* Botón de volver */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver
      </button>

      {/* Contenedor principal */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              {product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-96 object-contain"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-400">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div key={index} className="bg-gray-100 rounded-md overflow-hidden h-20">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="p-6 space-y-6 shadow-lg">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-2xl font-semibold text-indigo-600 mt-2">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-2">
                  ({product.ratings.length} {product.ratings.length === 1 ? 'calificación' : 'calificaciones'})
                </span>
              </div>
              <span className="text-sm text-gray-500">Marca: {product.brand}</span>
            </div>

            <div className="space-y-2">
              <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `Disponible (${product.stock} en stock)` : 'Agotado'}
              </p>
              <p className="text-gray-600">Categoría: {product.category}</p>
            </div>

            {/* Sección de calificación */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Calificar este producto</h3>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 ${value <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddRating}
                disabled={rating === 0 || submittingRating}
                className={`mt-3 px-4 py-2 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300 ${rating === 0 || submittingRating ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {submittingRating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : 'Enviar calificación'}
              </button>
            </div>

            {/* Descripción */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Descripción</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>

            {/* Botón de compra */}
            <button
              disabled={product.stock <= 0}
              className={`py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300 ${product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {product.stock > 0 ? 'Comprar ahora' : 'Sin stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ProductDetail;