import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Form } from 'react-router';

import { Provider } from './components/ui/provider';

import './main.css'

import { Principal } from './pages/Principal';
import { AsignarTareas } from './pages/AsignarTareas';
import { FormularioTarea } from './pages/FormularioTarea';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider>
    <BrowserRouter basename="/gafasGo">
      <Routes>
        <Route path='/' element={<Principal />}> </Route>
        <Route path='/Asignar' element={<AsignarTareas />}> </Route>
        <Route path='/FormTarea' element={<FormularioTarea />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  // </StrictMode>,
)
