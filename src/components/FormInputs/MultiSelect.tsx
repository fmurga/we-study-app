'use client'
import { postData } from '@/utils'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
})

interface Option {
  readonly label: string
  readonly value: string
}

const MultiSelect = ({ tags }) => {
  const { control, register } = useForm()
  const id = Date.now().toString()
  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  })

  const defaultOptions = () => {
    return tags.map((tag) => createOption(tag.title))
  }

  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [value, setValue] = useState<Option | null>()

  const setNewTag = () => {}

  const handleCreate = (inputValue: string) => {
    setIsLoading(true)
    postData('/tags')
      .then((result) => {
        console.log(result)
        const newOption = createOption(inputValue)
        setOptions((prev) => [...prev, newOption])
        setIsLoading(false)
        setValue(newOption)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
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
            option: () => 'bg-slate-500 text-white p-2',
            multiValue: () => 'bg-slate-400 text-white rounded p-1 ml-1',
            clearIndicator: () => 'text-red-400',
            multiValueRemove: () => 'bg-slate-400 text-red-400',
          }}
          placeholder="Seleccione Etiqueta (Crear si no la encuentra)"
          id={id}
          isClearable
          isMulti
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={(newValue) => onChange(newValue)}
          onCreateOption={handleCreate}
          options={options}
          value={value}
          {...register('tags')}
        />
      )}
    />
  )
}

export default MultiSelect
