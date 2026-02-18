import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './agentCalendar.css'
import { AgentCalendarSave } from './agentCalendarSave' 

type Agent = {
     date:          string
     descripcion:   string
     cliente:       string
}

type Props = {
    agent?: Agent[],
    setCalendar?: any
}

export function AgentCalendar({ agent, setCalendar }:Props ){

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = async ( 
        data:{
            date: string
            descripcion: string
            cliente: string
        })=> {
            await setCalendar(data)
            handleCloseModal()
    }
 
    const handleOpenModal = () => {
        setIsModalOpen(true);
        }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    
    if (!agent || agent.length === 0) {
        return <p>No hay datos</p>;
    }

    const markedDates = agent.map(item => {
        const [year, month, day] = item.date.split('-').map(Number);
        return new Date(year, month - 1, day);
    });

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const filteredAgents = selectedDate
        ? agent.filter(a => a.date === formatDate(selectedDate))
        : [];

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0">Agendado de llamadas</h2>
                <button 
                    className="btn btn-primary rounded-pill px-4 shadow-sm"
                    onClick={handleOpenModal}
                >
                    <i className="bi bi-plus-lg me-2"></i> Agendar Llamada
                </button>
            </div>

            {isModalOpen && (
                <AgentCalendarSave 
                            onClose=    {handleCloseModal}
                            onSave=     {handleSave} />
            )}


            <div className="row">
                
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
                        <Calendar
                            className="border-0 w-100"
                            onClickDay={(value) => setSelectedDate(value)}
                            tileClassName={({ date }) => {
                                const match = markedDates.some(d =>
                                    d.getFullYear() === date.getFullYear() &&
                                    d.getMonth() === date.getMonth() &&
                                    d.getDate() === date.getDate()
                                );
                                return match ? "highlight" : undefined;
                            }}
                        />
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 rounded-4 h-100">
                        <div className="card-body p-4">
                            <h5 className="card-title fw-bold mb-4 d-flex align-items-center">
                                <span className="p-2 bg-light rounded-3 me-2">📅</span>
                                Detalle del {selectedDate?.toLocaleDateString()}
                            </h5>
                            
                            {filteredAgents.length > 0 ? (
                                filteredAgents.map((item, index) => (
                                    <div key={index} className="mb-3 p-3 bg-light rounded-3 border-start border-primary border-4">
                                        <span className="badge bg-primary-subtle text-primary mb-2">
                                            {item.cliente}
                                        </span>
                                        <p className="mb-0 small text-muted"><strong>Descripción:</strong></p>
                                        <p className="mb-0">{item.descripcion}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <p className="text-muted">No hay llamadas agendadas.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
