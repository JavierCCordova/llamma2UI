
interface ClientSelectProps {
  clients: { id: string; client: string }[]
  value: string
  onChange: (clientId: string) => void
}

export function ClienteSelect( { clients, value, onChange }: ClientSelectProps ){

    return ( 
        
      <div className="mb-4">
        <label className="form-label fw-bold text-dark mb-2">
          <i className="bi bi-person-badge me-2 text-primary"></i>
          Seleccionar Cliente:
        </label>
        
        <select
        className="form-select form-select-lg shadow-sm border-0 rounded-3 px-4"
        value={value}
        onChange={(e) => onChange(e.target.value)} >

         <option value="">Seleccione un cliente...</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.client}  
            </option>
          ))}
        </select>
      </div>
    )
}