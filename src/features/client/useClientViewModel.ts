import { clientService } from './client.Service' 
import { useEffect, useState } from 'react'

type Client = {
                id: string
                client: string
                ruc: string
                telefono: string
            }


export function useClientViewModel(){
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)    
    
    useEffect(() => {
    clientService.getClient().then((response) => {
      const rawClients = response.client

      const mappedClients = Object.entries(rawClients).map(
                                ([id, data]: any) => ({
                                id,
                                client: data.client,
                                ruc: data.ruc,
                                telefono: data.telefono
                                })
                            )
                    setClients(mappedClients)
                    setLoading(false)
                    })
         }, [])

    return  { clients, loading }
}