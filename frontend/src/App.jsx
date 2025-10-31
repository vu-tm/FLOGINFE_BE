import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import ProductList from './components/Product/ProductList';

function App() {
  return (
    <div>


      <BrowserRouter >
        {/* <Login /> */}
        <ProductList />
      </BrowserRouter>
    </div>
  );
}

export default App;
