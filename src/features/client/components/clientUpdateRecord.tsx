import { useState, useEffect  } from "react"; 

type Record = {
    id :string,
    dateRecord:    string
    dateAgent:     string
    description:    string
    typeAccion:    string
    responseAction: string
}

type Props= {
  record: Record;
  updateRecord: (record: Record, id: string) => Promise<void>;
  selectedClientId: string | null
}

export function UpdateForm({ record, updateRecord , selectedClientId}:Props){
 
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState<Record>({
                        id: "",
                        dateRecord: "",
                        dateAgent: "",
                        description: "",
                        typeAccion: "",
                        responseAction: ""
                    });

    console.log("dd: ", record)
    console.log("dd2: ",selectedClientId)

    useEffect(() => {       // padre le dice el estado que debe tener //
                        setFormData(record);
                    }, [record]);
                    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                    const { name, value } = e.target;
                    setFormData((prev) => ({ ...prev, [name]: value }));
                };

    const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault();
                    const idSearch  =   record.id
                    delete record.id
                    const payload = {
                        idClient: selectedClientId,
                        ...formData
                    }
                    await updateRecord(payload, idSearch);
                    setShow(false); // Cerrar modal al terminar
                };

    const formatDateForInput = (date: string | undefined) => {
                if (!date) return "";
                return date.slice(0, 16);
                };

    return (
    <>
      <button className="btn btn-warning btn-sm" onClick={() => setShow(true)}>
        <i className="bi bi-pencil-square"></i> {/* Cambié el icono a editar */}
      </button>

      {show && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content text-start"> {/* text-start para alinear labels */}
                <div className="modal-header">
                  <h5 className="modal-title">Actualizar Registro</h5>
                  <button type="button" className="btn-close" onClick={() => setShow(false)} />
                </div>

                <div className="modal-body">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                      <label className="form-label">Fecha Registro</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="dateRecord"
                        value={formatDateForInput(formData.dateRecord)}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Fecha Agente</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="dateAgent"
                        value={formatDateForInput(formData.dateAgent)}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Tipo Acción</label>
                      <select
                        className="form-select"
                        name="typeAccion"
                        value={formData.typeAccion}
                        onChange={handleChange}
                      >
                        <option value="LLAMADA">Llamada</option>
                        <option value="EMAIL">Email</option>
                        <option value="VISITA">Visita</option>
                      </select>
                    </div>

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

                    <div className="col-12">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="modal-footer px-0 pb-0">
                      <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Actualizar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShow(false)}></div>
        </>
      )}
    </>
  );
}