'use client'
import { UserContext } from "@/context/UserContext";
import { updateUserData } from "@/utils/api/updateUserData";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../Buttons/CustomButton";
import { getUser } from "@/app/we/profile/[username]/page";

export const EditProfileForm = ({ isEditable, setIsEditable }) => {
  const { currentUser } = useContext(UserContext)
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      username: currentUser?.username || '',
      bio: currentUser?.bio || '',
    },
  });

  const handleEditSubmit = async (data) => {
    console.log(data)
    try {
      await updateUserData(currentUser?.id, currentUser?.token, data);
      setIsEditable(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <>
      {isEditable && (
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium ml-2">Nombre Completo</label>
              <input
                type="text"
                placeholder="Nombre completo"
                defaultValue={currentUser?.fullName}
                className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none transition duration-200"
                {...register('fullName', { required: false })}
                aria-invalid={errors.fullName ? 'true' : 'false'}
              />
              {errors.fullName && (
                <p role="alert" className="text-red-400 text-sm mt-1">
                  Este campo es requerido
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium ml-2">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                defaultValue={currentUser?.email}
                className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none transition duration-200"
                {...register('email', { required: false })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p role="alert" className="text-red-400 text-sm mt-1">
                  Este campo es requerido
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium ml-2">Profile Image</label>
            <input
              type="file"
              className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none transition duration-200"
              {...register('image')}
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium ml-2">Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none transition duration-200"
              {...register('password')}
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium ml-2">Biografia</label>
            <textarea
              placeholder="Welcome to my profile! Here you can find my latest updates and information."
              defaultValue={currentUser?.bio}
              className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none transition duration-200"
              {...register('bio', { required: false })}
              aria-invalid={errors.bio ? 'true' : 'false'}
            />
            {errors.fullName && (
              <p role="alert" className="text-red-400 text-sm mt-1">
                Este campo es requerido
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <CustomButton
              classNames="mt-4 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full shadow-lg transition duration-200"
              onClick={() => setIsEditable(false)}
            >
              Cancel
            </CustomButton>
            <input
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg cursor-pointer transition duration-200"
              value="Save Changes"
            />
          </div>
        </form>
      )}
    </>
  )
}
