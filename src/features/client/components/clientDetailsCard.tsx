import { ClientTable } from './clientDetailTable'

type Record = {
    date_record:    string
    date_agent:     string
    description:    string
    type_accion:    string
    response_action: string
}

type Props = {
    records : Record[] 
}

export function ClienteDetailsCard({records}: Props){

    return (
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden  mb-2">
                <div className="card-body">

                    <h6 className="text-uppercase text-muted fw-bold mb-3"
                    style={{ fontSize: '0.75rem' }}>
                    Detalle de gestiones
                    </h6>

                    <ClientTable Records={records} />

                </div>
            </div>
    )
}