import { authService } from './auth.Service'
import { useNavigate } from 'react-router-dom'

type LoginData = {
  user: string
  password: string
}

export function useAuthViewModel() {
  const navigate = useNavigate()   

  const login = async (data: LoginData) => {
    const response = await authService.login(data)

    const token = response.accessToken
    localStorage.setItem('token', token)

    navigate('/')   
  }

  return { login }
}