type Record = {
    date_record:    string
    date_agent:     string
    description:    string
    type_accion:    string
    response_action: string
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
          <tr key={c.type_accion}>
            <td>{c.date_record}</td>
            <td>{c.date_agent}</td>
            <td>{c.description}</td>
            <td>{c.type_accion}</td>
            <td>{c.response_action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}