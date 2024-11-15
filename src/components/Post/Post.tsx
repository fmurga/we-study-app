'use client'
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import CustomButton from '../Buttons/CustomButton'
import Image from 'next/image'

interface IUser {
  fullname: string
}

interface dataTypes {
  user: IUser
  createdDate?: number
  title: string
  image: string
  description: string
}

const Post = ({ data }: dataTypes) => {
  return (
    <div className="flex bg-slate-900 shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl ">
      <div className="w-full mx-auto px-6 py-6 ">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="avatar"
              />
              <h2 className="text-lg font-semibold text-gray-300 -mt-1">
                {data.user?.fullname || 'Jhon Doe'}
              </h2>
            </div>
            <small className="text-sm text-gray-300">
              {data.createdDate || ''}
            </small>
            {data.tags &&
              data.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
                >
                  <div className="mt-px">{tag.title}</div>
                </div>
              ))}
          </div>
          <p className="mt-3 text-gray-300 text-lg">{data.title || ''}</p>
          {data.image && (
            <Image
              width="300"
              height="300"
              src={data.image || ''}
              alt="post image"
            />
          )}
          <p className="mt-3 text-gray-300 text-sm">{data.description}</p>
          <div className="mt-4 flex items-center">
            <div className="flex text-gray-300 text-sm mr-3">
              <CustomButton
                classNames="flex flex-row gap-1"
                count={2}
                onClick={() => console.log('hi')}
              >
                <HeartIcon className="h-5 w-5" />
              </CustomButton>
            </div>
            <div className="flex text-gray-300 text-sm mr-8">
              <CustomButton
                classNames="flex flex-row gap-1"
                count={3}
                onClick={() => console.log('hi')}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </CustomButton>
            </div>
            <div className="flex text-gray-300 text-sm mr-4">
              <CustomButton onClick={() => console.log('hi')}>
                <ShareIcon className="h-5 w-5" />
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
