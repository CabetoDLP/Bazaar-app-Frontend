import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import './App.css';

const App = () => {
  
  return (
    <Router>
      <div className="app">

        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="video-background"
        >
          <source 
            src="https://res.cloudinary.com/dzipy5bme/video/upload/v1749486221/bazar-app/bazaarDemo.mp4" 
            type="video/mp4" 
          />
        </video>

        <header className="app-header">
          <h1 className='text-3xl font-bold'>Bazar Online</h1>
          <nav className="flex flex-col gap-2">
            <a href="/">Inicio</a>
            <a href="/create">Crear Producto</a>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<SearchResults />} />
            <Route path="/items/:id" element={<ProductDetail />} />
            <Route path="/create" element={<CreateProduct />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© 2023 Bazar Online - Todos los derechos reservados</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
