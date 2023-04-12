import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SchemeContextProvider from './context/context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SchemeContextProvider>
      <App />
  </SchemeContextProvider>
);
