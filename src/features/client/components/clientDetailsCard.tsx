import { ClientTable } from './clientDetailTable'

type Record = {
    id :string
    dateRecord:    string
    dateAgent:     string
    description:    string
    typeAccion:    string
    responseAction: string
}

type Props = {    
    records : Record[] 
    deleteRecord: (id:any) => Promise<void>
}

export function ClienteDetailsCard({records , deleteRecord}: Props){

    return (
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden  mb-2">
                <div className="card-body">

                    <h6 className="text-uppercase text-muted fw-bold mb-3"
                    style={{ fontSize: '0.75rem' }}>
                    Detalle de gestiones
                    </h6>

                    <ClientTable 
                                Records         =   {records}
                                deleteRecord    =   {deleteRecord} />

                </div>
            </div>
    )
}