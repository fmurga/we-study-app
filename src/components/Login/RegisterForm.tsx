'use client'
import { postData } from '@/utils'
import { useState, useEffect, useContext } from 'react'
import { useFormStatus } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '../Buttons/CustomButton'
import { EyeIcon } from '@heroicons/react/20/solid'
import { EyeSlashIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { UserContext } from '@/context/UserContext'
import { redirect } from 'next/navigation'

const RegisterForm = () => {
  const { pending } = useFormStatus()
  const [submitError, setSubmitError] = useState({ state: false, message: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowReapeatPassword] = useState(false)
  const { registerUser } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    formState: { isSubmitSuccessful },
    reset,
  } = useForm()
  let pwd = watch('password')

  const parseMessage = (message: string) => {
    if (message) {
      const regex = /Key \((\w+)\)=\(([^)]+)\) already exists\./
      const matches = message.match(regex)
      if (matches && matches.length === 3) {
        const [, key, value] = matches
        setSubmitError({
          state: true,
          message: `El ${key} ${value} ya existe`,
        })
      }
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        fullName: '',
        username: '',
        email: '',
        password: '',
        password_repeat: '',
      })
      redirect('/dashboard')
    }
  }, [isSubmitSuccessful, reset])

  const submitResgistration = async (data) => {
    const user = { ...data }
    delete user.password_repeat
    setSubmitError({
      state: false,
      message: '',
    })
    try {
      const userRegister = await postData('/auth/register', user)
      setSubmitError({
        state: false,
        message: '',
      })
      registerUser(userRegister)
    } catch (error) {
      parseMessage(error.message)
    }
  }

  return (
    <>
      <div className="w-full text-black py-10">
        <h1 className="text-xl md:text-2xl font-bold leading-tight text-black">
          Registrate
        </h1>
        {submitError.state && (
          <div
            className="flex bg-red-100 rounded-lg p-4 mb-4 mt-4 text-sm text-red-700"
            role="alert"
          >
            <ExclamationTriangleIcon className="h-5 w-5 text-red-700" />
            <div>
              <span className="font-medium">{submitError.message}</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(submitResgistration)} className="mt-2">
          <label className="block text-gray-700">Nombre Completo</label>
          <input
            autoFocus
            type="name"
            placeholder="Nombre completo"
            minLength={6}
            className="w-full text-black px-3 py-2 rounded-lg bg-gray-200 border focus:border-blue-500
                focus:bg-white focus:outline-none"
            {...register('fullName', { required: true })}
            aria-invalid={errors.fullName ? 'true' : 'false'}
          />
          {errors.fullName?.type === 'required' && (
            <p role="alert" className="text-red-600 text-sm">
              Complete con un nombre completo
            </p>
          )}

          <label className="block text-gray-700 mt-2">Nombre de usuario</label>
          <input
            type="username"
            placeholder="Usuario"
            minLength={6}
            className="w-full text-black px-3 py-2 rounded-lg bg-gray-200 border focus:border-blue-500
                focus:bg-white focus:outline-none"
            {...register('username', { required: true })}
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username?.type === 'required' && (
            <p role="alert" className="text-red-600 text-sm">
              Complete con un nombre de usuario
            </p>
          )}

          <label className="block text-gray-700 mt-2">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full text-black px-3 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            {...register('email', { required: true })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email?.type === 'required' && (
            <p role="alert" className="text-red-600 text-sm">
              Complete con un email
            </p>
          )}

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
          {errors.password?.type === 'required' && (
            <p role="alert" className="text-red-600 text-sm">
              Complete con una contraseña correcta
            </p>
          )}

          <label className="block text-gray-700 mt-2">Repita Contraseña</label>
          <Controller
            name="password_repeat"
            control={control}
            rules={{
              required: 'Debes completar con una contraseña',
              validate: (value) =>
                value === pwd || 'Las contraseñas no coinciden',
            }}
            render={({ field }) => (
              <div
                className="inline-flex w-full bg-gray-200 border focus:border-blue-500
                focus:bg-white focus:outline-none relative rounded-lg"
              >
                <input
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder="Repita Contraseña"
                  minLength={6}
                  className="w-full text-black px-3 py-2 rounded-lg bg-gray-200 border focus:border-blue-500
                focus:bg-white focus:outline-none relative"
                  aria-invalid={errors.password_repeat ? 'true' : 'false'}
                  {...register('password_repeat')}
                />
                <CustomButton
                  classNames="inline-flex relative my-3 mr-3"
                  onClick={() => setShowReapeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </CustomButton>
              </div>
            )}
          />

          {errors.password_repeat && (
            <p role="alert" className="text-red-600 text-sm">
              {errors.password_repeat.message}
            </p>
          )}

          <input
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-3 py-2 mt-6 cursor-pointer"
            aria-disabled={pending}
            value="Registrarme"
          />
        </form>
        {/* <button
          type="button"
          className="mt-5 w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-3 py-2 border border-gray-300"
        >
          <div className="flex items-center justify-center">
            <span className="ml-4">Registrarme con Google</span>
          </div>
        </button> */}
      </div>
    </>
  )
}

export default RegisterForm
