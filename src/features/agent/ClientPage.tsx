import { useAgentViewModel } from  './useAgentViewModel'
import { AgentCalendar } from './components/agentCalendar'

export function  AgentPage(){

    const { agent, loading }   =   useAgentViewModel()    

    return (<>
    <div>
        <h1> Holamundo </h1>
        <AgentCalendar agent={agent[0]} />

    </div>
    </>)
}