import dynamic from 'next/dynamic'
const RegisterForm = dynamic(() => import('@/components/Login/RegisterForm'), {
  loading: () => <p>Loading...</p>,
})

export default function Register() {
  return (
    <RegisterForm />
  )
}
