import { processService } from './process.Service' 


export function useProcessViewMode(){

    const getDniRobot   =  async (dni:number): Promise<string>  =>{
        return await processService.getDniRobot(dni)
    }
   
    return { getDniRobot }
}