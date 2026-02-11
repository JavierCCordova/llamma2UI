import { useAgentViewModel } from  './useAgentViewModel'
import { AgentCalendar } from './components/agentCalendar'

export function  AgentPage(){

    const { agent, loading }   =   useAgentViewModel()   

    return (<>
    <div>        
        <AgentCalendar agent={ agent } />
    </div>
    </>)
}