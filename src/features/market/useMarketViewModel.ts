import { marketService } from './market.Service'
import { useState } from 'react'

export type Compra = {
  producto: string;
  cantidad: number;
  unidad: "kg" | "unidad" | "g" | "paquete" | "litro";
  precio_total_linea: number;
  precio_unitario: number;
};

export type Metadatos = {
  conteo_items: number;
  suma_total_precios: number;
};

export type OCRData = {
  compras: Compra[];
  metadatos: Metadatos;
};

export type OCRResponse = {
  status: number;
  data: OCRData;
};

export function useMarketViewModel(){

    const [ market, setMarket ] = useState<OCRResponse| null>(null);
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const [ error, setError] = useState<string | null>(null);

    const processImage = async(file: File) => {        
        try {
            console.log("INICIANDO REQUEST");
            setIsLoading(true);
            setError(null);
            
            const response = await marketService.setMarketConsult(file);
            console.log("RESPUESTA:", response);
            setMarket(response);            
            } catch (err: any) {            
            setError(err.message || "Error al procesar la imagen");
            } finally {            
            setIsLoading(false);
            }
    }
    const processSaveMarket = async(market:OCRData)=>{
        console.log("Inicio salvado");
        const response  = await marketService.setMarketSave(market)
        console.log(response)

    }


    return { market, processImage, isLoading, error, processSaveMarket}
}