import type { IProduct } from '../types/Product';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  
  const averageRating = product.ratings.length > 0 
    ? product.ratings.reduce((sum, rating) => sum + rating.value, 0) / product.ratings.length
    : 0;

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-100"
      onClick={() => navigate(`/items/${product._id}`)}
    >
      {/* Imagen del producto */}
      <div className="w-full h-48 bg-gray-50 flex items-center justify-center">
        {product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="h-full object-contain p-4"
          />
        ) : (
          <div className="text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black truncate">{product.name}</h3>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description.substring(0, 100)}...
        </p>
        
        <p className="text-black font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
        
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        
        <div className="flex items-center mt-2">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-black' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-black text-sm ml-1">({product.ratings.length})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;