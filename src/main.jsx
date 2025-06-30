import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Form } from 'react-router';
//CHAKRA UI
import { Provider } from './components/ui/provider';

//COMPONENTES
import { Principal } from './pages/Principal';
import { AsignarTareas } from './pages/AsignarTareas';
import { FormularioTarea } from './pages/FormularioTarea';
import { Login } from './pages/Login';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider>
    <BrowserRouter basename="/gafasGo">
      <Routes>
        <Route path='/' element={<Principal />}> </Route>
        <Route path='/Asignar' element={<AsignarTareas />}> </Route>
        <Route path='/FormTarea' element={<FormularioTarea />}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  // </StrictMode>,
)
