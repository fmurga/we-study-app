import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import CustomButton from './CustomButton'

const CommentButton = () => {
  return (
    <CustomButton count={12}>
      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
    </CustomButton>
  )
}

export default CommentButton
