import { useState } from "react";

interface NumberInputModalProps {
  onClose: () => void;
  onSubmit: (dni: number) => void;
}

export function NumberInputModal({ onClose, onSubmit }: NumberInputModalProps) {
  const [value, setValue] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "") return;

    onSubmit(Number(value));
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">

          <div className="modal-header">
            <h5 className="modal-title fw-bold">Consultar DNI</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">DNI</label>
                <input
                  type="number"
                  className="form-control"
                  value={value}
                  onChange={(e) =>
                    setValue(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={value === ""}
              >
                Enviar
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
