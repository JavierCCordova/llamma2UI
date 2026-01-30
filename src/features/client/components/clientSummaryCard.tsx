type Client ={
    client:     string
    ruc:        string
    telefono:   string
}

type Props = {
  client?:  Client
}

export function ClientSummaryCard({client}:Props){

    return (

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
  <div className="card-body p-0 d-flex">

    {/* Línea lateral azul */}
    <div className="bg-primary" style={{ width: '6px' }} />

    <div className="p-4 w-100">

      <h6
        className="text-uppercase text-muted fw-bold mb-3"
        style={{ fontSize: '0.75rem' }}
      >
        Información General
      </h6>

      {/* ROW DE 4 CARDS */}
      <div className="row g-3">

        {/* CARD 1 */}
        <div className="col-12 col-md-3">
          <div className="card h-100 border shadow-sm rounded-3 bg-white">
            <div className="card-body text-center">
              <small className="text-muted">Cliente</small>
              <h6 className="fw-bold mb-0">{ client?.client }</h6>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="col-12 col-md-3">
          <div className="card h-100 border shadow-sm rounded-3 bg-white">
            <div className="card-body text-center">
              <small className="text-muted">RUC</small>
              <h6 className="fw-bold mb-0"> { client?.ruc } </h6>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="col-12 col-md-3">
          <div className="card h-100 border shadow-sm rounded-3 bg-white">
            <div className="card-body text-center">
              <small className="text-muted">Teléfono</small>
              <h6 className="fw-bold mb-0"> { client?.telefono } </h6>
            </div>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="col-12 col-md-3">
          <div className="card h-100 border shadow-sm rounded-3 bg-white">
            <div className="card-body text-center">
              <small className="text-muted">Estado</small>
              <h6 className="fw-bold mb-0 text-success">Activo</h6>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
    )
}