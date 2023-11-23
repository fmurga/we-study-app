import CustomButton from './CustomButton'
import { HeartIcon } from '@heroicons/react/24/outline'

const LikeButton = () => {
  return (
    <CustomButton count={5}>
      <HeartIcon className="h-5 w-5 mr-1" />
    </CustomButton>
  )
}

export default LikeButton
