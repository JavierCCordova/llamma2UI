import { processService } from './process.Service' 
import type { OcrResponse } from './viewModel/ocr.types' 

export function useProcessViewMode(){

    const getDniRobot   =  async (dni:number): Promise<string>  =>{
        return await processService.getDniRobot(dni)
    }
   
    const ocrGeminiFile = async (feature: string[], file: File): Promise<OcrResponse> =>{
        return await processService.ocrGeminiFile(feature, file)
    }
    return { getDniRobot, ocrGeminiFile }
}