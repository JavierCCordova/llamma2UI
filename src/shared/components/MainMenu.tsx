import { Link } from 'react-router-dom'

export function MainMenu() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link className="navbar-brand" to="/">App</Link>

      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Dashboard</Link>
        </li>
      </ul>
    </nav>
  )
}