import { Link, useLocation } from 'react-router-dom';
import "./MainMenu.css"

export function MainMenu() {
  const location = useLocation();

  // Función para marcar el link activo
  const activeClass = (path) => 
    location.pathname === path ? "nav-link active fw-bold border-bottom border-primary border-3" : "nav-link text-secondary";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white shadow-sm py-3 mb-4">
      <div className="container-fluid px-4">
        {/* Logo con estilo Azul Profundo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary rounded-circle d-inline-block me-2" style={{ width: '32px', height: '32px' }}></div>
          <span className="text-dark fw-bold tracking-tight">Agente <span className="text-primary">CMR</span></span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item px-2">
              <Link className={activeClass("/agent")} to="/agent">
                <i className="bi bi-speedometer2 me-1"></i> Agenda
              </Link>
            </li>

            <li className="nav-item px-2">
              <Link className={activeClass("/")} to="/">
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className={activeClass("/clients")} to="/clients">
                <i className="bi bi-people me-1"></i> Clientes
              </Link>
            </li>
            
            {/* Botón de Perfil o Usuario */}
            <li className="nav-item ms-lg-3">
              <div className="d-flex align-items-center bg-light px-3 py-1 rounded-pill">
                <small className="text-muted me-2">Bienvenido, <span className="text-primary fw-medium">Javier</span></small>
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                  J
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}