type Record = {
    dateRecord:    string
    dateAgent:     string
    description:    string
    typeAccion:    string
    responseAction: string
}


type Props = {
  Records: Record[]
}

export function ClientTable({ Records }: Props) {
  return (
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>Tipo Accion</th>
          <th>Fecha Agendado</th>
          <th>Descripción</th>
          <th>Tipo Accion</th>
          <th>Respuesta Accion</th>
        </tr>
      </thead>
      <tbody>
        {Records.map((c) => (
          <tr key={c.typeAccion}>
            <td>{c.dateRecord}</td>
            <td>{c.dateAgent}</td>
            <td>{c.description}</td>
            <td>{c.typeAccion}</td>
            <td>{c.responseAction}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}