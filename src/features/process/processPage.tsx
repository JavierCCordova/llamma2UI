import { useState } from 'react'
import { useProcessViewMode } from './useProcessViewModel'
import { NumberInputModal } from './components/processDniRobot'
import { ExtractDataGemini } from './components/processExtracData'

type ActiveModal = "dni" | "report" | "config" | null;

//interface ExtractDataGeminiProps {
//  onClose: () => void;
//  onSubmit: (features: string[], file: File) => void;
//}
type GeminiResult = Record<string, string | null>;

export function ProcessPage(){

    const [activeModal, setActiveModal] = useState<ActiveModal>(null);
    const [dniResult, setDniResult] = useState<string | null>(null);
    const [geminiResult, setGeminiResult] = useState<GeminiResult | null>(null);
    const { getDniRobot, ocrGeminiFile }   =   useProcessViewMode()

    const openModal = (modal:ActiveModal) => {
        setActiveModal(modal);
    }

    const closeModal = () => {
        setActiveModal(null);
    };

    const handleDniSubmit = async (dni: number)=>{
        const response = await getDniRobot(dni)
        setDniResult(response)
        closeModal()
    }

    const handleGeminiFile = async(feature: string[], file: File) =>{
        const response = await ocrGeminiFile(feature, file)
        setGeminiResult(response.data);
    }

    return (
        <div className="container mt-4">

        <h2 className="fw-bold mb-4">Panel de Agente</h2>

        <div className="row g-4">

            {/* Card 1 */}
            <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="fw-bold">Consulta DNI web</h5>
                    <p className="text-muted small">
                    Obtener información de web DNI
                    </p>
                            {dniResult && (
                            <div className="alert alert-success mt-3 py-2">
                                <strong>Resultado:</strong><br />
                                {dniResult}
                            </div>
                            )}
                </div>

                <button
                    className="btn btn-primary align-self-end"
                    onClick={() => openModal("dni")}
                >
                    Nuevo
                </button>
                </div>
            </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="fw-bold">Extract datos</h5>
                    <p className="text-muted small">
                      Obtener los datos ocr
                    </p>
                            {geminiResult && (
                                <div className="row g-3 mt-3">
                                    {Object.entries(geminiResult)
                                    .filter(([, value]) => value !== null)  
                                    .map(([key, value]) => (
                                        <div className="col-md-6" key={key}>      
                                            <h6> {key} <span className="badge bg-success ms-2"> {value} </span></h6>
                                        </div>
                                    ))}
                                </div>
                            )}
                </div>

                <button
                    className="btn btn-outline-primary align-self-end"
                    onClick={() => openModal("report")}
                >
                    Ver
                </button>
                </div>
            </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="fw-bold">Configuración</h5>
                    <p className="text-muted small">
                    Ajustes del agente
                    </p>
                </div>

                <button
                    className="btn btn-outline-secondary align-self-end"
                    onClick={() => openModal("config")}
                >
                    Abrir
                </button>
                </div>
            </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="fw-bold">Próximamente</h5>
                    <p className="text-muted small">
                    Nuevas funcionalidades
                    </p>
                </div>

                <button className="btn btn-secondary align-self-end" disabled>
                    Próximamente
                </button>
                </div>
            </div>
            </div>

        </div>
        {/* 🔽 MODAL DNI */}
        {activeModal === "dni" && (
            <NumberInputModal
                        onClose = {closeModal}
                        onSubmit= {handleDniSubmit}
            />
        )}

        {/* 🔽 MODAL EXTRACT DATA */}
        {activeModal === "report" && (
        <ExtractDataGemini
            onClose={closeModal}
            onSubmit={handleGeminiFile}
        />
        )}

        </div>
    )
}