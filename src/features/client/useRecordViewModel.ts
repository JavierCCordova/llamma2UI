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

    const fetchRecords = async ()=> {
        if(!clientId){
            setRecord([])
            return
        }
        setLoading(true)

        try{
            const data = await clientService.getRecords(clientId)
            setRecord(data)
        }finally{
            setLoading(false)
        }       
    }

    const createRecord = async (payload: any)=> {
        await clientService.insertRecord(payload)
        await fetchRecords()
    }

    useEffect(() => {
            fetchRecords()
        },[clientId]
    )

    return {  record, loading2, createRecord }
}
