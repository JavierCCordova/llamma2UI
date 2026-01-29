import { useState } from 'react'
import { useClientViewModel } from './useClientViewModel'

export function ClientPage() {
  const { clients, loading } = useClientViewModel()
  const [selectedClientId, setSelectedClientId] = useState<string>('')

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" />
      </div>
    )
  }

  return (
    
    <div className="container-fluid py-4 bg-light min-vh-100">
  <div className="row justify-content-center">
    <div className="col-12 col-md-10 col-lg-8">
      
      {/* 1. SECCIÓN SELECT (Arriba, como en tu dibujo) */}
      <div className="mb-4">
        <label className="form-label fw-bold text-dark mb-2">
          <i className="bi bi-person-badge me-2 text-primary"></i>
          Seleccionar Cliente:
        </label>
        <select className="form-select form-select-lg shadow-sm border-0 rounded-3 px-4">
          <option value="">Seleccione un cliente...</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.client}  
            </option>
          ))}
        </select>
      </div>

      {/* 2. CONTENEDOR DE CARDS (Una debajo de otra) */}
      <div className="d-flex flex-column gap-3">
        
        {/* CARD SUPERIOR (Ocupa menos espacio vertical) */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-0 d-flex">
            <div className="bg-primary" style={{ width: '6px' }}></div>
            <div className="p-4 w-100">
              <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.75rem' }}>
                Resumen de Operación
              </h6>
              <h2 className="fw-bold text-dark mb-0">Información General</h2>
            </div>
          </div>
        </div>

        {/* CARD INFERIOR (Ocupa más espacio vertical) */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-0 d-flex" style={{ minHeight: '300px' }}>
            <div className="bg-secondary" style={{ width: '6px' }}></div>
            <div className="p-4 w-100 d-flex flex-column justify-content-between">
              <div>
                <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.75rem' }}>
                  Detalles del Cliente
                </h6>
                <h2 className="fw-bold text-dark">Área de Visualización</h2>
              </div>
              
              {/* Espacio para contenido dinámico */}
              <div className="bg-light rounded-3 p-3 text-center border border-dashed text-muted">
                Los datos del cliente seleccionado aparecerán aquí
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</div>

  )
}
