import { AuthForm } from './components/AuthForm'
import { useAuthViewModel } from './useAuthViewModel'

export function AuthPage() {
  const vm = useAuthViewModel()
  return <AuthForm onSubmit={vm.login} />
}