import { ClientFormRecord } from './clientFormRecord';

interface ClientSelectProps {
  clients: { id: string; client: string }[]
  value: string
  createRecord: ( payload: any) => Promise<void>
  onChange: (clientId: string) => void
}

export function ClienteSelect( { clients, value, createRecord, onChange }: ClientSelectProps ){
    
    const selectedClient = clients.find(c => c.id === value);

    return ( 
      <div className="row align-items-end g-3">

      {/* Select */}
      <div className="col-md-8">
        <label className="form-label fw-bold text-dark mb-2">
          <i className="bi bi-person-badge me-2 text-primary"></i>
          Seleccionar Cliente:
        </label>

       <select
          className="form-select form-select-lg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Seleccione un cliente...</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.client}
            </option>
          ))}
        </select>
      </div>
 
      <div className="col-md-4 d-flex">
        <div className="w-100">
          <ClientFormRecord 
            clientInput={selectedClient}
            createRecord={createRecord}
          />
        </div>
      </div>

    </div>
    );
}