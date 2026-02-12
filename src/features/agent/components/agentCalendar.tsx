import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './agentCalendar.css'

type Agent = {
     date:          string
     descripcion:   string
     cliente:       string
}

type Props = {
    agent?: Agent[]
}

export function AgentCalendar({ agent }:Props ){

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
 
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

            <h2 className="mb-4 fw-bold">Agendado de llamadas</h2>

            <div className="row">

                {/* Calendario */}
                <div className="col-md-6 mb-4 mx-auto">
                    <div className="card shadow-sm border-0 rounded-4 p-4 d-flex justify-content-center align-items-center">
                        <Calendar
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

                {/* Detalle */}
                <div className="col-md-6">
                    {selectedDate && (
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body">

                                <h5 className="card-title fw-bold mb-3">
                                    Detalle del día
                                </h5>

                                {filteredAgents.length > 0 ? (
                                    filteredAgents.map((item, index) => (
                                        <div key={index} className="mb-3">

                                            <div className="mb-2">
                                                <span className="badge bg-primary me-2">
                                                    {item.cliente}
                                                </span>
                                            </div>

                                            <p className="mb-1">
                                                <strong>Descripción:</strong>
                                            </p>

                                            <p className="text-muted">
                                                {item.descripcion}
                                            </p>

                                            {index < filteredAgents.length - 1 && <hr />}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">
                                        No hay llamadas para este día.
                                    </p>
                                )}

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
