import 'bootstrap-icons/font/bootstrap-icons.css';
import { UpdateForm }  from './clientUpdateRecord';
import { useState } from "react";

type Record = {
    id :string,
    dateRecord:    string
    dateAgent:     string
    description:    string
    typeAccion:    string
    responseAction: string
}

type Props = {
  Records: Record[],
  deleteRecord: (id : any) => Promise<void>
  updateRecord: (record: Record, id: string) => Promise<void> 
  selectedClientId: string | null
}

export function ClientTable({ Records ,deleteRecord, updateRecord, selectedClientId }: Props) {

  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [selectedID, setSelectedId]         = useState<Record | null>(null);

  const handleDelete = async (id: string) => { 
    await deleteRecord(id);
    console.log(id) 
  };

  const handleUpdate = async (id: string) => { 
    const record = Records.find(r => r.id === id);
    if (record) {
      setSelectedRecord(record);
    }
  };

  return (
    <>
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>Tipo Accion</th>
          <th>Fecha Agendado</th>
          <th>Descripción</th>
          <th>Tipo Accion</th>
          <th>Respuesta Accion</th>
          <th>Eliminar</th>
          <th>Actualizar</th>
        </tr>
      </thead>
      <tbody>
        {Records.map((c) => (
          <tr key={c.id}>
            <td>{c.dateRecord}</td>
            <td>{c.dateAgent}</td>
            <td>{c.description}</td>
            <td>{c.typeAccion}</td>
            <td>{c.responseAction}</td>
            <td className="text-center align-middle">  
                <button
                    className="btn btn-light btn-sm rounded-circle shadow-sm text-danger border"
                    style={{ width: '32px', height: '32px', transition: 'all 0.2s' }}
                    onClick={() => handleDelete(c.id)}
                    title="Eliminar Registro"
                    onMouseOver={(e) => e.currentTarget.classList.add('shadow')}
                    onMouseOut={(e) => e.currentTarget.classList.remove('shadow')}
                  >
                    <i className="bi bi-trash3-fill"></i> 
                  </button>
             </td>
             <td className="text-center align-middle">  
                <UpdateForm
                    record        = {c}
                    updateRecord  = {updateRecord}
                    selectedClientId  = {selectedClientId}
                  />
             </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    </>
  )
}