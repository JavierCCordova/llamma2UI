import 'bootstrap-icons/font/bootstrap-icons.css';

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
}

export function ClientTable({ Records ,deleteRecord}: Props) {


  const handleDelete = async (id: string) => { 
    await deleteRecord(id);
    console.log(id) 
  };

  return (
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>Tipo Accion</th>
          <th>Fecha Agendado</th>
          <th>Descripción</th>
          <th>Tipo Accion</th>
          <th>Respuesta Accion</th>
          <th>Eliminar</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  )
}