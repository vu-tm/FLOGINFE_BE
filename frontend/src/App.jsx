import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import ProductList from './components/Product/ProductList';

function App() {
  return (
    <>
      <Routes >
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="products" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
