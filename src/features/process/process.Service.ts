import type { OcrResponse } from './viewModel/ocr.types'

export const processService = {

    async getDniRobot(dni: number){

        const token =   localStorage.getItem("token")
        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions    =   {
            method: 'POST',
            headers : {
                 'Accept': 'application/json',
                 "Content-Type": "application/json", 
                 'Authorization': `Bearer ${token}`
            }
        }

        const res   =   await fetch(`http://localhost:8000/Robot/robot/dni?dni=${dni}`, requestOptions)

        if(!res.ok){
             throw new Error(`Problemas {$res}`);
        }
        const response  =   await res.json()

        return response.data as string
    },

    async ocrGeminiFile(feature: string[], file: File): Promise<OcrResponse> {
        const token =   localStorage.getItem('token')
        if(!token){
            throw new Error('no auth token')
        }
        const formData  =   new FormData()

        if (Array.isArray(feature)) {
                feature.forEach(f => formData.append('feature', f));
            } else {
                formData.append('feature', feature);
            }

        formData.append('file', file);

        const requestOptions    =   {
            method  :   'POST',
            headers : {
                 'Accept': 'application/json', 
                 'Authorization': `Bearer ${token}`
            },
            body: formData
        }
        const res = await fetch('http://localhost:8000/Robot/robot/ocrGemini',requestOptions)

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(`Problemas {$errorData}`);
        }
        const response  =  await res.json()
        return response
    }

}