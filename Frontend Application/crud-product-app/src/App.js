import React from 'react';
//import ProductForm from './Components/ProductForm';
import ProductList from './Components/products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Components/css/Custom.css';
import waveBackground from './SourceImages/CustomImages/backgroundUI.avif';

const App = () => {
  return (
    <div className='route' id='mainRouteDivContainer' style={{
      backgroundImage: `url(${waveBackground})`
    }}>
      <ProductList />
      <ToastContainer />
    </div>
  );
};

export default App;
