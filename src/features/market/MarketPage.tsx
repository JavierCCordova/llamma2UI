import { useState } from 'react'
import { useMarketViewModel } from './useMarketViewModel'
import { MarketOcrImagen } from './components/marketOcrImagen'

export function MarketPage() {
 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { market, processImage, isLoading, error, processSaveMarket } = useMarketViewModel();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    };

    const onProcessClick = () => {
        console.log("CLICK PROCESAR");
        if (selectedFile) {
        processImage(selectedFile);
        }
  };

  return (
  <div className="container py-4">

    {/* HEADER */}
    <h1 className="mb-4">Panel de Mercado</h1>

    {/* UPLOAD */}
    <div className="card mb-4 shadow-sm">
        <div className="card-body d-flex justify-content-between align-items-center">

            <div className="d-flex flex-column">
            <span className="text-muted">
                {selectedFile ? selectedFile.name : "Carga imagen..."}
            </span>

            {selectedFile && (
                <small className="text-success">✔ Listo para procesar</small>
            )}
            </div>

            <div className="d-flex gap-2">

            {/* BOTÓN SUBIR */}
            <label className="btn btn-light">
                📁
                <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                />
            </label>

            {/* BOTÓN PROCESAR */}
            <button
                className="btn btn-primary"
                disabled={!selectedFile}
                onClick={onProcessClick}
            >
                Procesar
            </button>

            </div>

        </div>
        </div>

    {/* GRID */}
    <div className="row g-4">

      {/* IZQUIERDA */}
      <div className="col-md-6">
        <div className="card shadow-sm h-100">          
          <div className="card-body d-flex flex-column">
            
            <h5 className="card-title border-bottom pb-2 mb-3">
              Análisis de Inventario
            </h5>

            <div className="flex-grow-1 border border-2 border-secondary-subtle rounded d-flex justify-content-center align-items-center text-muted">
              Área de contenido para análisis
            </div>

          </div>
        </div>
      </div>

      {/* DERECHA */}
      <div className="col-md-6">
        <div className="card shadow-sm h-100">          
          <div className="card-body d-flex flex-column">
            
            <h5 className="card-title border-bottom pb-2 mb-3">
              Resultados de Extracción
            </h5>

            <div className="flex-grow-1 border border-2 border-secondary-subtle rounded d-flex justify-content-center align-items-center text-muted">
                <MarketOcrImagen 
                  market  = { market } 
                  processSaveMarket = {processSaveMarket}
                />
            </div>

          </div>
        </div>
      </div>

    </div>

  </div>
);
}