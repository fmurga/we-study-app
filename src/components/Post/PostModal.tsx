'use client'
import { useFormStatus } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/20/solid'
import CustomButton from '../Buttons/CustomButton'
import MultiSelect from '../FormInputs/MultiSelect'
import { UserContext } from '@/context/UserContext'
import dynamic from 'next/dynamic'
import { postData } from '@/utils'
const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
})

interface Tags {
  id?: number
  title?: string
  label?: string
  value?: string
}
interface data {
  title: string
  description: string
  tags: Tags[]
  images: any
}

interface Option {
  readonly label: string
  readonly value: number
  readonly id: number
}

const PostModal = ({ tags }) => {
  const { pending } = useFormStatus()
  const [submitError, setSubmitError] = useState({ status: false, message: '' })
  // const [atachFile, setAtachfile] = useState(false)
  const [atachImage, setAtachImage] = useState(false)
  const { currentUser } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState: { isSubmitSuccessful },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      images: '',
    },
  })
  const createOption = (label: string, id: string) => ({
    label,
    value: id,
    id: id,
  })

  const defaultOptions = () => {
    return tags.map((tag) => createOption(tag.title, tag.id))
  }

  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [value, setValue] = useState<Option | null>()

  const handleCreate = (inputValue: string) => {
    setIsLoading(true)
    const body = { title: inputValue }
    postData('/tags', body)
      .then((result) => {
        const newOption = createOption(result.title, result.id)
        setOptions((prev) => [...prev, newOption])
        setIsLoading(false)
        setValue(newOption)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ title: '', description: '', images: '' })
    }
  }, [isSubmitSuccessful, reset])

  const submitPost = async (data: data) => {
    data.tags.forEach((tag) => {
      delete tag.label
      delete tag.value
    })
    const form = {
      title: data.title,
      description: data.description,
      tags: data.tags,
    }
    try {
      const response = await fetch(`${process.env.BACKEND_API_URL}/posts`, {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + currentUser?.token,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(form),
      })
        .then(async (result) => {
          if (data.images) {
            const { id } = await result.json()
            const formData = new FormData()
            formData.append('file', data.images[0])
            const response = await fetch(
              `${process.env.BACKEND_API_URL}/posts/${id}`,
              {
                method: 'PATCH',
                headers: new Headers({
                  Authorization: 'Bearer ' + currentUser?.token,
                }),
                body: formData,
              }
            )
          }
        })
        .catch((err) => { })
      if (response.ok) {
        reset({ title: '', description: '', images: '' })
        await fetch(`${process.env.BACKEND_API_URL}/posts`)
      } else {
        setSubmitError({ status: false, message: response.statusText })
      }
    } catch (error) {
      setSubmitError({ status: false, message: error.message })
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
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CreatableSelect
                  unstyled
                  className="mb-2"
                  classNames={{
                    control: () =>
                      'border border-gray-300 rounded-md bg-slate-500 text-black relative',
                    placeholder: () => 'px-3 text-slate-400',
                    dropdownIndicator: () => 'text-slate-400 mr-2',
                    option: () =>
                      'bg-slate-500 border border-white text-white p-2',
                    multiValue: () =>
                      'bg-slate-400 border border-white rounded-sm text-white rounded p-1 ml-1',
                    clearIndicator: () => 'text-red-400',
                    multiValueRemove: () => 'bg-slate-400 text-red-400',
                    noOptionsMessage: () =>
                      'bg-slate-400 border border-whithe p-2',
                  }}
                  placeholder="Buscar etiquetas"
                  isClearable
                  isMulti
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onChange={(newValue) => onChange(newValue)}
                  onCreateOption={handleCreate}
                  options={options}
                  value={value}
                />
              )}
            />
            <textarea
              className="bg-slate-500 rounded border focus:border-blue-500  border-slate-500 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-slate-400 placeholder:text-sm focus:outline-none focus:bg-slate-200 text-black"
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
          <div className="flex w-full md:w-full px-3 mb-3 gap-3 justify-end">
            {/* <div className={`${!atachFile && 'hidden'}`}>
              <label htmlFor="">Agregar Archivo</label>
              <input
                id="files"
                className={` relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary`}
                type="file"
                {...register('file', { required: false })}
              />
            </div> */}
            <div className={`${!atachImage && 'hidden'}`}>
              <label htmlFor="">Agregar Imagen</label>
              <input
                className={`relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary`}
                type="file"
                id="images"
                {...register('images', { required: false })}
              />
            </div>
            {/* <CustomButton onClick={() => setAtachfile(!atachFile)}>
              <DocumentIcon
                className={`h-5 w-5 mx-2 ${
                  atachFile ? 'text-red-600' : 'text-green-600'
                }`}
              />
            </CustomButton> */}
            <CustomButton onClick={() => setAtachImage(!atachImage)}>
              <PhotoIcon
                className={`h-5 w-5 mx-2 ${atachImage ? 'text-red-600' : 'text-green-600'
                  }`}
              />
            </CustomButton>
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
