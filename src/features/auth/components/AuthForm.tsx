import '../styles/signIn.css'

type Props = {
  onSubmit: (data: { user: string; password: string }) => void
}

export function AuthForm({ onSubmit }: Props) {
  return (
    <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: '360px' }}>
      <div className="card-body p-4">
        <h1 className="h4 mb-4 text-center fw-semibold">
          Iniciar sesión
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            onSubmit({
              user: form.user.value,
              password: form.password.value
            })
          }}
        >
          <div className="form-floating mb-3">
            <input
              name="user"
              type="text"
              className="form-control"
              placeholder="Usuario"
              required
            />
            <label>Usuario</label>
          </div>

          <div className="form-floating mb-4">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
            <label>Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2 fw-medium" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
