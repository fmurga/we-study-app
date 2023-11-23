import { ShareIcon } from '@heroicons/react/20/solid'
import CustomButton from './CustomButton'

const Share = () => {
  return (
    <CustomButton legend="Compartir">
      <ShareIcon className="h-5 w-5 mr-1" />
    </CustomButton>
  )
}

export default Share
