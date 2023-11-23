'use client'
import { useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { postData } from '@/utils'

const PostModal = () => {
  const { pending } = useFormStatus()
  const [submitError, setSubmitError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ title: '', description: '' })
    }
  }, [formState, isSubmitSuccessful, reset])

  const submitPost = async (data) => {
    const post = { ...data }
    try {
      postData('http://localhost:5000/api/posts', post)
    } catch (error) {
      setSubmitError(true)
    }
  }

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg my-8 mx-8 mb-4 md:mx-auto my-4 max-w-md md:max-w-2xl">
      <form
        onSubmit={handleSubmit(submitPost)}
        className="w-full max-w-2xl bg-slate-900 rounded-lg px-4 pt-2"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-blue-600 text-lg">
            Agrega un nuevo post
          </h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <input
              type="text"
              className="bg-slate-500 rounded border focus:border-blue-500 border-slate-500 leading-normal w-full h-8 py-2 px-3 my-2 font-medium placeholder-slate-400 placeholder:text-sm focus:outline-none focus:bg-slate-200 text-black"
              placeholder="Titulo del post"
              {...register('title', { required: true })}
              aria-invalid={errors.title ? 'true' : 'false'}
            />
            {errors.title?.type === 'required' && (
              <p role="alert" className="text-red-600 text-sm mb-2">
                Completa el titulo
              </p>
            )}
            <textarea
              className="bg-slate-500 rounded border focus:border-blue-500 border-slate-500 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-slate-400 placeholder:text-sm focus:outline-none focus:bg-slate-200 text-black"
              placeholder="Escribe tu post"
              {...register('description', { required: true })}
              aria-invalid={errors.description ? 'true' : 'false'}
            ></textarea>
            {errors.description?.type === 'required' && (
              <p role="alert" className="text-red-600 text-sm mb-2">
                Completa la descripción
              </p>
            )}
          </div>
          <div className="w-full flex justify-end px-3">
            <div className="">
              <input
                aria-disabled={pending}
                type="submit"
                className="bg-blue-700 text-blue-100 font-medium py-1 px-4 borde rounded-lg tracking-wide mr-1 hover:bg-blue-100 hover:text-blue-700"
                value="Enviar Post"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostModal
