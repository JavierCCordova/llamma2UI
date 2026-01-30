type Client = {
  id: string
  client: string
  ruc: string
  telefono: string
}

type Props = {
  clients: Client[]
}

export function ClientTable({ clients }: Props) {
  return (
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>Cliente</th>
          <th>RUC</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c) => (
          <tr key={c.id}>
            <td>{c.client}</td>
            <td>{c.ruc}</td>
            <td>{c.telefono}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}