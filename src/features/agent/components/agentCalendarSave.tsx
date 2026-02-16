import { useState } from "react";

interface AgentCalendarSaveProps {
  onClose: () => void;
  onSave: (data: {
    date: string;
    descripcion: string;
    cliente: string;
  }) => void;
}

export function AgentCalendarSave({ onClose, onSave }: AgentCalendarSaveProps) {

  const [cliente, setCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      date: new Date(date).toISOString(),
      descripcion,
      cliente
    });
  };

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
       
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">
 
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Agendar llamada</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
 
          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Cliente</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

            </div>
 
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Guardar
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
