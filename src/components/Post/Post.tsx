import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import Share from '../Buttons/ShareButton'
import LikeButton from '../Buttons/LikeButton'
import CommentButton from '../Buttons/CommentButton'

const Post = ({ data }) => {
  return (
    <div className="flex bg-slate-900 shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl ">
      <div className="flex items-start px-4 py-6">
        <img
          className="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300 -mt-1">
              {data.user.fullname}
            </h2>
            <small className="text-sm text-gray-300">{data.cratedDate}</small>
          </div>
          <p className="mt-3 text-gray-300 text-lg">{data.title || ''}</p>
          <p className="mt-3 text-gray-300 text-sm">{data.description}</p>
          <div className="mt-4 flex items-center">
            <div className="flex text-gray-300 text-sm mr-3">
              <LikeButton />
            </div>
            <div className="flex text-gray-300 text-sm mr-8">
              <CommentButton />
            </div>
            <div className="flex text-gray-300 text-sm mr-4">
              <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
