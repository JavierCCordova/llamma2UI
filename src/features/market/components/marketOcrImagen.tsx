import { useState, useEffect } from 'react';

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

type Props = {
    market?: OCRResponse,
    processSaveMarket : ( payload: any) => Promise<void>
}

export function MarketOcrImagen( { market ,processSaveMarket }:Props ){

    const [editableCompras, setEditableCompras] = useState<Compra[]>([]);
 
    useEffect(() => {
        if (market?.data?.compras) { 
        const initialData = JSON.parse(JSON.stringify(market.data.compras));
        setEditableCompras(initialData);
        }
    }, [market]);

    // Manejador de cambios asegurado
    const handleInputChange = (index: number, field: keyof Compra, value: string | number) => {
        setEditableCompras(prev => {
        const updated = [...prev];
        const currentItem = { ...updated[index] };
 
        let safeValue = value;
        if (field === 'cantidad' || field === 'precio_unitario' || field === 'precio_total_linea') {
            safeValue = value === '' ? 0 : Number(value);
            if (isNaN(safeValue as number)) safeValue = 0;
        }
 
        (currentItem[field] as any) = safeValue;
 
        if (field === 'cantidad' || field === 'precio_unitario') {
            const qty = field === 'cantidad' ? (safeValue as number) : currentItem.cantidad;
            const price = field === 'precio_unitario' ? (safeValue as number) : currentItem.precio_unitario;
            currentItem.precio_total_linea = Number((qty * price).toFixed(2));
        }

        updated[index] = currentItem;
        return updated;
        });
    };

    const removeProduct = (index: number) => {
        setEditableCompras(prev => prev.filter((_, i) => i !== index));
    };

        const handleSave = () => { 
            const sanitizedItems = editableCompras.map(item => ({
                producto: item.producto.trim() || "Producto sin nombre",
                cantidad: Number(item.cantidad) || 0,
                unidad: item.unidad || "unidad",
                precio_unitario: Number(item.precio_unitario) || 0,
                subtotal: Number(item.precio_total_linea) || 0  
            }));
 
            const totalValidado = sanitizedItems.reduce((acc, curr) => acc + curr.subtotal, 0);
 
            const payload = {
                fecha_captura: new Date().toISOString(),
                items: sanitizedItems,
                metadatos_totales: {
                    total_validado: Number(totalValidado.toFixed(2)),
                    total_original_ocr: market?.data?.metadatos?.suma_total_precios || 0,
                    conteo_items: sanitizedItems.length
                }
            };
 
            if (sanitizedItems.length > 0) {
                processSaveMarket(payload);
            }
        };

    if (!market) {
        return (
        <div className="p-5 text-center bg-light rounded-4 border border-dashed">
            <p className="text-muted mb-0">Esperando información de la lectura del mercado...</p>
        </div>
        );
    }

    return (
            <div className="container-fluid py-4">
            <div className="row g-4">
                
                {/* COLUMNA IZQUIERDA: FORMULARIO */}
                <div className="col-lg-8">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                    <h4 className="fw-bold mb-0 text-dark">Validación de Inventario</h4> 
                    </div>
                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                    {editableCompras.length} Items detectados
                    </span>
                </div>

                <div className="vstack gap-3">
                    {editableCompras.map((item, index) => (
                    <div key={index} className="card border-0 shadow-sm rounded-4 position-relative">
                        <div className="card-body p-4">
                        {/* Botón eliminar */}
                        <button 
                            onClick={() => removeProduct(index)}
                            className="btn btn-link text-danger position-absolute top-0 end-0 m-2 p-1"
                            style={{ textDecoration: 'none' }}
                        >
                            ✕
                        </button>

                            {/* Distribución 2x2 */}
                            <div className="row g-3">
                                {/* FILA 1: Producto y Precio Unitario */}
                                <div className="col-md-7">
                                <label className="form-label small fw-bold text-uppercase text-muted" style={{ fontSize: '0.65rem' }}>Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control border-0 bg-light shadow-none fw-medium"
                                    value={item.producto}
                                    onChange={(e) => handleInputChange(index, 'producto', e.target.value)}
                                    placeholder="Nombre del producto"
                                />
                                </div>

                                <div className="col-md-5">
                                <label className="form-label small fw-bold text-uppercase text-muted" style={{ fontSize: '0.65rem' }}>Precio Unitario (S/)</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-light text-muted">S/</span>
                                    <input 
                                    type="number" 
                                    step="0.01"
                                    className="form-control border-0 bg-light shadow-none text-end"
                                    value={item.precio_unitario || ''}
                                    onChange={(e) => handleInputChange(index, 'precio_unitario', e.target.value)}
                                    />
                                </div>
                                </div>

                                {/* FILA 2: Cantidad y Unidad */}
                                <div className="col-md-6">
                                <label className="form-label small fw-bold text-uppercase text-muted" style={{ fontSize: '0.65rem' }}>Cantidad</label>
                                <input 
                                    type="number" 
                                    className="form-control border-0 bg-light shadow-none"
                                    value={item.cantidad || ''}
                                    onChange={(e) => handleInputChange(index, 'cantidad', e.target.value)}
                                />
                                </div>

                                <div className="col-md-6">
                                <label className="form-label small fw-bold text-uppercase text-muted" style={{ fontSize: '0.65rem' }}>Unidad de Medida</label>
                                <select 
                                    className="form-select border-0 bg-light shadow-none"
                                    value={item.unidad}
                                    onChange={(e) => handleInputChange(index, 'unidad', e.target.value as any)}
                                >
                                    <option value="kg">Kilogramos (kg)</option>
                                    <option value="unidad">Unidad</option>
                                    <option value="g">Gramos (g)</option>
                                    <option value="paquete">Paquete</option>
                                    <option value="litro">Litro</option>
                                </select>
                                </div>
                            </div>
                              
                        </div>
                        <div className="card-footer bg-light bg-opacity-50 border-0 py-2 px-4 d-flex justify-content-between align-items-center">
                        <span className="small text-muted italic">ID Item: #00{index + 1}</span>
                        <span className="text-dark fw-bold">Total Línea: S/{item.precio_total_linea.toFixed(2)}</span>
                        </div>
                    </div>
                    ))}
                    
                    {editableCompras.length === 0 && (
                    <div className="p-5 text-center bg-white rounded-4 shadow-sm border">
                        <p className="text-muted">No quedan items en la lista.</p>
                    </div>
                    )}
                </div>

                <button 
                    className="btn btn-primary btn-lg w-100 mt-4 py-3 rounded-4 shadow-sm fw-bold"
                    onClick={handleSave}
                    disabled={editableCompras.length === 0}
                >
                    Confirmar e Importar Inventario
                </button>
                </div>

                {/* COLUMNA DERECHA: METADATOS (SOLO LECTURA) */}
                <div className="col-lg-4">
                <div className="sticky-top" style={{ top: '1.5rem' }}>
                    <div className="card border-0 shadow-sm rounded-4 bg-dark text-white mb-4">
                    <div className="card-body p-4">
                        <h6 className="text-info small fw-bold text-uppercase mb-3">Resumen Original OCR</h6>
                        <div className="d-flex align-items-baseline gap-2">
                        <span className="h2 fw-bold mb-0">S/{market.data.metadatos.suma_total_precios.toFixed(2)}</span>
                        </div>
                        <p className="small text-white-50 mt-2 mb-0">
                        Esta es la suma total detectada.
                        </p>
                    </div>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-body p-4">
                        <h6 className="fw-bold mb-3">Información del Sistema</h6>
                        
                        <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted small">Items detectados:</span>
                        <span className="fw-bold small">{market.data.metadatos.conteo_items}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted small">Estado de captura:</span>
                        <span className="badge bg-success-subtle text-success border-0">Exitoso</span>
                        </div>

                        <div className="p-3 bg-light rounded-3"> 
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
            </div>
        );
}