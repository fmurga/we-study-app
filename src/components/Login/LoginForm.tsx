'use client'
import { UserContext } from '@/context/UserContext'
import { postData } from '@/utils'
import { redirect, useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '../Buttons/CustomButton'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
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

  const handleGoogleLogin = () => {
    router.push(`${process.env.GOOGLE_AUTH_URL}`);
  };

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
          Sign in to your account
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(submitLogin)}>
          <div>
            <label className="block text-white">Email</label>
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
                Please enter an email address
              </p>
            )}
          </div>

          <label className="block text-white mt-2">Password</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Please enter a password',
            }}
            render={({ field }) => (
              <div
                className="inline-flex w-full bg-gray-200 border focus:border-blue-500
                focus:bg-white focus:outline-none relative rounded-lg"
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
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
              className="text-sm font-semibold text-white hover:text-blue-700 focus:text-blue-700"
            >
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg cursor-pointer transition duration-200 px-4 py-3 mt-6"
          >
            Sign In
          </button>
        </form>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        >
          <div className="flex items-center justify-center">
            <span className="ml-4">Sign in with Google</span>
          </div>
        </button>

        <div className="flex gap-4 mt-8 text-white justify-center items-center">
          <p>Need an account?</p>
          <Link
            href="/auth/register"
            className=" w-3/5 text-center  bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-3 cursor-pointer transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  )
}

export default LoginForm
