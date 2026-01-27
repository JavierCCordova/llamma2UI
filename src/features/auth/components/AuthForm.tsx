import '../styles/signIn.css'

type Props = {
  onSubmit: (data: { user: string; password: string }) => void
}

export function AuthForm({ onSubmit }: Props) {
  return (
    <main className="form-signin w-100 m-auto">
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
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input
            name="user"
            type="text"
            className="form-control"
            placeholder="name@example.com"
          />
          <label htmlFor="email"> Usuario</label>
        </div>

        <div className="form-floating mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
    </main>
  )
}