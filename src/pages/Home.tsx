import SearchBox from '../components/SearchBox';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Bienvenido a nuestro bazar</h1>
      <p>Encuentra los mejores productos</p>
      <div className="search-container">
        <SearchBox />
      </div>
    </div>
  );
};

export default Home;