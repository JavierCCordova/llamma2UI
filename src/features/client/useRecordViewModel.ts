import { clientService } from './client.Service'
import { use, useEffect, useState } from 'react'


type Record = {
    date_record:    string
    date_agent:     string
    description:    string
    type_accion:    string
    response_action: string
}

export function useRecordViewModel( clientId : string){

    const [ record, setRecord ]     =   useState<Record[]>([])
    const [ loading2, setLoading]    =   useState(true)

    useEffect(() => {

                if (!clientId) {
                                setRecord([])
                                return
                            }
                
                setLoading(true)
                
                clientService.getRecords(clientId).then(
                    (data)  =>  setRecord(data)
                    ).finally( () => setLoading(false)
                            )
            }, [clientId] )

    return {  record, loading2 }
}
