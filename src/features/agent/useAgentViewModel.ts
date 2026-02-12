import { agentService } from './client.Service'
import { useEffect, useState } from 'react'


type Agent = {
     date:          string
     descripcion:   string
     cliente:       string
}

export function useAgentViewModel(){

    const [ agent, setAgent ]   =   useState<Agent[]>([])
    const [ loading, setLoading]    =   useState(true)

    useEffect(  () => {

        agentService.getAgentPrograming().then( (response) =>{
 
        const rawAgent: Agent[] = response.data.map((item: any) => ({
                                                date: item.date,
                                                descripcion: item.descripcion,
                                                cliente: item.cliente
                                            }));   
                    setAgent(rawAgent)
                    setLoading(false)

                }).catch( () => {
                    setLoading(false)
                })
        }, [])
    return { agent, loading }
}