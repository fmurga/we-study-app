'use client'
import { UserContext } from '@/context/UserContext'
import { postData } from '@/utils'
import { redirect } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '../Buttons/CustomButton'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm()
  const { login, currentUser } = useContext(UserContext)

  useEffect(() => {
    if (currentUser) {
      redirect('/we/dashboard')
    }
  }, [currentUser])

  const submitLogin = async (data) => {
    const user = { ...data }
    try {
      const userRegister = await postData('/auth/login', user)
      login(userRegister)
      reset({
        email: '',
        password: '',
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="w-full h-100">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
          Inicia sesión en tu cuenta
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(submitLogin)}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none text-black"
              autoFocus
              autoComplete="true"
              required
              {...register('email', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email?.type === 'required' && (
              <p role="alert" className="text-red-600 text-sm mb-2">
                Complete con un email
              </p>
            )}
          </div>

          <label className="block text-gray-700 mt-2">Contraseña</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Debes completar con una contraseña',
            }}
            render={({ field }) => (
              <div
                className="inline-flex w-full bg-gray-200 border focus:border-blue-500
                focus:bg-white focus:outline-none relative rounded-lg"
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  minLength={6}
                  className="w-full text-black px-3 py-2 rounded-lg bg-gray-200 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  {...register('password')}
                />
                <CustomButton
                  classNames="inline-flex relative my-3 mr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </CustomButton>
              </div>
            )}
          />

          <div className="text-right mt-2">
            <a
              href="#"
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >
              Olvidaste la contraseña?
            </a>
          </div>

          <input
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            placeholder="Iniciar Sesión"
          />
        </form>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          type="button"
          className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        >
          <div className="flex items-center justify-center">
            <span className="ml-4">Iniciar sesion con Google</span>
          </div>
        </button>

        <div className="flex gap-4 mt-8 text-black">
          <p>Necesitas una cuenta?</p>
          <Link
            href="/auth/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Registrate
          </Link>
        </div>
      </div>
    </>
  )
}

export default LoginForm
