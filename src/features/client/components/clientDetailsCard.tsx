import { ClientTable } from './clientDetailTable'

type Client = {
    id:         string
    client:     string
    ruc:        string
    telefono:   string
}

type Props = {
    clients : Client[] 
}

export function ClienteDetailsCard({clients}: Props){

    return (
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden  mb-2">
                <div className="card-body">

                    <h6 className="text-uppercase text-muted fw-bold mb-3"
                    style={{ fontSize: '0.75rem' }}>
                    Detalle de gestiones
                    </h6>

                    <ClientTable clients={clients} />

                </div>
            </div>
    )
}