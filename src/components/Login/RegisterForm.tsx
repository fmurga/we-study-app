'use client';
import { postData } from '@/utils';
import { useState, useEffect, useContext } from 'react';
import { useFormStatus } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import CustomButton from '../Buttons/CustomButton';
import { EyeIcon } from '@heroicons/react/20/solid';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { UserContext } from '@/context/UserContext';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
  const { pending } = useFormStatus();
  const [submitError, setSubmitError] = useState({ state: false, message: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();
  let pwd = watch('password');

  const parseMessage = (message: string) => {
    if (message) {
      const regex = /Key \((\w+)\)=\(([^)]+)\) already exists\./;
      const matches = message.match(regex);
      setSubmitError({
        state: true,
        message: message,
      });
      if (matches && matches.length === 3) {
        const [, key, value] = matches;
        setSubmitError({
          state: true,
          message: `El ${key} ${value} ya existe`,
        });
      }
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && submitError.state === false) {
      reset({
        fullName: '',
        username: '',
        email: '',
        password: '',
        password_repeat: '',
      });
      redirect('/we/dashboard');
    }
  }, [isSubmitSuccessful, reset]);

  const submitRegistration = async (data: any) => {
    const user = { ...data };
    delete user.password_repeat;
    setSubmitError({
      state: false,
      message: '',
    });
    try {
      const userRegister = await postData('/auth/register', user);
      if (userRegister) {
        registerUser(userRegister);
      }
    } catch (error) {
      parseMessage(error.message);
    }
  };

  return (
    <div className="w-full text-white bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
        Get Started
      </h2>
      {submitError.state && (
        <div
          className="flex bg-red-600 rounded-lg p-4 mb-4 text-sm text-white"
          role="alert"
        >
          <ExclamationTriangleIcon className="h-5 w-5 text-white mr-2" />
          <span className="font-medium">{submitError.message}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(submitRegistration)} className="space-y-4">
        <div className='flex flex-col gap-2'>
          <label className="block text-sm font-medium">Nombre Completo</label>
          <input
            autoFocus
            type="text"
            placeholder="Nombre completo"
            minLength={6}
            className="w-full text-white px-3 py-2 rounded-lg bg-gray-700 border border-transparent focus:border-blue-500 focus:bg-gray-800 focus:outline-none transition duration-200"
            {...register('fullName', { required: true })}
            aria-invalid={errors.fullName ? 'true' : 'false'}
          />
          {errors.fullName?.type === 'required' && (
            <p role="alert" className="text-red-400 text-sm mt-1">
              Complete con un nombre completo
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label className="block text-sm font-medium">Nombre de usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            minLength={6}
            className="w-full text-white px-3 py-2 rounded-lg bg-gray-700 border border-transparent focus:border-blue-500 focus:bg-gray-800 focus:outline-none transition duration-200"
            {...register('username', { required: true })}
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username?.type === 'required' && (
            <p role="alert" className="text-red-400 text-sm mt-1">
              Complete con un nombre de usuario
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full text-white px-3 py-2 rounded-lg bg-gray-700 border border-transparent focus:border-blue-500 focus:bg-gray-800 focus:outline-none transition duration-200"
            {...register('email', { required: true })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email?.type === 'required' && (
            <p role="alert" className="text-red-400 text-sm mt-1">
              Complete con un email
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label className="block text-sm font-medium">Contraseña</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Debes completar con una contraseña',
            }}
            render={({ field }) => (
              <div className="inline-flex w-full bg-gray-700 border rounded-lg focus-within:border-blue-500 focus-within:bg-gray-800 transition duration-200">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  minLength={6}
                  className="w-full text-white px-3 py-2 rounded-lg bg-transparent focus:outline-none"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  {...field}
                />
                <CustomButton
                  classNames="inline-flex items-center justify-center px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-white" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-white" />
                  )}
                </CustomButton>
              </div>
            )}
          />
          {errors.password?.type === 'required' && (
            <p role="alert" className="text-red-400 text-sm mt-1">
              Complete con una contraseña correcta
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label className="block text-sm font-medium">Repita Contraseña</label>
          <Controller
            name="password_repeat"
            control={control}
            rules={{
              required: 'Debes completar con una contraseña',
              validate: (value) =>
                value === pwd || 'Las contraseñas no coinciden',
            }}
            render={({ field }) => (
              <div className="inline-flex w-full bg-gray-700 border rounded-lg focus-within:border-blue-500 focus-within:bg-gray-800 transition duration-200">
                <input
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder="Repita Contraseña"
                  minLength={6}
                  className="w-full text-white px-3 py-2 rounded-lg bg-transparent focus:outline-none"
                  aria-invalid={errors.password_repeat ? 'true' : 'false'}
                  {...field}
                />
                <CustomButton
                  classNames="inline-flex items-center justify-center px-3"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? (
                    <EyeIcon className="h-5 w-5 text-white" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-white" />
                  )}
                </CustomButton>
              </div>
            )}
          />
          {errors.password_repeat && (
            <p role="alert" className="text-red-400 text-sm mt-1">
              {errors.password_repeat.message}
            </p>
          )}
        </div>

        <div className='flex gap-4'>
          <input
            type="submit"
            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-3 cursor-pointer transition duration-200"
            aria-disabled={pending}
            value="Registrarme"
          />
          <Link href="/auth/login" className="px-6 py-3 w-1/2 bg-blue-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
