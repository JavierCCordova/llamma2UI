import { Outlet, Navigate } from 'react-router-dom'
import { MainMenu } from '../shared/components/MainMenu'

export function PrivateLayout() {

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return (  
    <>
      <MainMenu />         
      <main className="container mt-4">
        < Outlet />      
      </main>           
    </>
  )
}
   // Este layout se encarga de visualizar los datos estaticos como menu y footer 
   // <MainMenu />   // SIEMPRE visible
   // <Outlet />     // cambia según la ruta
   // <Footer />     // SIEMPRE visible