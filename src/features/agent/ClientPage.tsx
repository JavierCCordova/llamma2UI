import { useAgentViewModel } from  './useAgentViewModel'
import { AgentCalendar } from './components/agentCalendar' 

export function  AgentPage(){

    const { agent, loading, setCalendar }   =   useAgentViewModel()  

    return (<>
    <div>        
        <AgentCalendar 
                    agent       =   { agent }
                    setCalendar =   { setCalendar } />
    </div>
    </>)
}