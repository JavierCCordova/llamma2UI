import { useState } from "react"; 

export type FormClient = {
  id: string;
  client: string;
};

type Props = {
  clientInput?: FormClient;
  createRecord: (payload:any) => Promise<void>;
};

export function ClientFormRecord( { clientInput,createRecord }:Props ) {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
      dateRecord: "",
      dateAgent: "",
      typeAccion: "",
      responseAction: "",
      description: ""
  });

  const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
        ) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
      };
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!clientInput) {
          alert("Debe seleccionar un cliente");
          return;
        }
    const payload = {
      idClient: clientInput.id,
      ...formData
    } 
    await createRecord(payload)
    setShow(false);
  };

      
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShow(true)}
      >
        Guardar llamada
      </button>

      {show && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Guardar Llamada</h5>
                  
                  {clientInput && (
                    <span className="text-muted ms-2">
                      - {clientInput.client}
                    </span>
                  )}

                  <button
                    className="btn-close"
                    onClick={() => setShow(false)}
                  />
                </div>

                <div className="modal-body">
                 <div className="modal-body">
              <form className="row g-3" onSubmit={handleSubmit}>

                {/* Date Record */}
                <div className="col-md-6">
                  <label className="form-label">Fecha Registro</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="dateRecord"
                    value={formData.dateRecord}
                    onChange={handleChange}
                  />
                </div>

                {/* Date Agent */}
                <div className="col-md-6">
                  <label className="form-label">Fecha Agente</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="dateAgent"
                    value={formData.dateAgent}
                    onChange={handleChange}
                  />
                </div>

                {/* Tipo Acción */}
                <div className="col-md-6">
                  <label className="form-label">Tipo Acción</label>
                  <select
                    className="form-select"
                    name="typeAccion"
                    value={formData.typeAccion}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="LLAMADA">Llamada</option>
                    <option value="EMAIL">Email</option>
                    <option value="VISITA">Visita</option>
                  </select>
                </div>

                {/* Response Action */}
                <div className="col-md-6">
                  <label className="form-label">Respuesta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="responseAction"
                    value={formData.responseAction}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                    <div className="col-12 text-end">
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => setShow(false)}
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
            </div>
          </div>

            {/* Backdrop manual */}
            <div
              className="modal-backdrop fade show"
              onClick={() => setShow(false)}
            ></div>
        </>
      )}
    </>
  );
}
