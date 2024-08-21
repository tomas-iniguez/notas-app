import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { NotasApp } from  './NotasApp';
import './styles.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
      <NotasApp />
   </BrowserRouter>
  </StrictMode>,
)
