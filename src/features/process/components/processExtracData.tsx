import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface ExtractDataGeminiProps {
  onClose: () => void;
  onSubmit: (features: string[], file: File) => void;
}
interface ExtractFormState {
  texto: string;
  archivo: File | null;
}

export function ExtractDataGemini({ onClose, onSubmit,}: ExtractDataGeminiProps) {

  const [formData, setFormData] = useState<ExtractFormState>({
    texto: "",
    archivo: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "archivo" && files) {
      setFormData(prev => ({
        ...prev,
        archivo: files[0],
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

      if (!formData.archivo) return;

      const features = formData.texto
        .split(",")
        .map(f => f.trim())
        .filter(Boolean);

      onSubmit(features, formData.archivo);
      onClose();
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">

          <div className="modal-header">
            <h5 className="modal-title fw-bold">Agregar Entrada</h5>
            <button type="button" className="btn-close" onClick={onClose}/>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              {/* Input texto */}
              <div className="mb-3">
                <label className="form-label">Texto</label>
                <input
                  type="text"
                  name="texto"
                  className="form-control"
                  value={formData.texto}
                  onChange={handleChange}
                  placeholder="Ej: moneda, número de orden, fecha de transacción"
                  required
                  autoFocus
                />
              </div>

              {/* Input file */}
              <div className="mb-3">
                <label className="form-label">Archivo</label>
                <input
                  type="file"
                  name="archivo"
                  className="form-control"
                  onChange={handleChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  required
                />
                <small className="text-muted">
                  PDF, PNG o JPG
                </small>
              </div>

            </div>

            <div className="modal-footer">
              <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={onClose}>
                Cancelar
              </button>
              <button 
                      type="submit" 
                      className="btn btn-primary" >
                Enviar
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
