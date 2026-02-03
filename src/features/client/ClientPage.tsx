import { useState } from 'react'
import { useClientViewModel } from './useClientViewModel'
import { useRecordViewModel } from './useRecordViewModel'
import { ClienteSelect } from './components/ClientSelect'
import { ClientSummaryCard } from './components/clientSummaryCard'
import { ClienteDetailsCard } from './components/clientDetailsCard'

export function ClientPage() {

  const { clients, loading } = useClientViewModel()
  const [ selectedClientId, setSelectedClientId ] = useState<string>('')
  
  // información en memoria para saber donde me encuentro.
  const selectdClient = clients.find(
    (c) => c.id === selectedClientId
  ) 
   
  const { record, loading2, createRecord } = useRecordViewModel(selectedClientId)

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" />
      </div>
    )
  }


  return (
    
    <div className="container-fluid py-4 bg-light min-vh-100">
  <div className="row justify-content-center">
    <div className="col-12 col-md-10 col-lg-8">

        < ClienteSelect

            clients = { clients }
            value   = { selectedClientId }
            createRecord  = {createRecord}
            onChange= { setSelectedClientId }
        />

        < ClientSummaryCard
          client  = { selectdClient }
        />

        < ClienteDetailsCard
              records={ record }
        />

    </div>
  </div>
</div>

  )
}
