import InoueProfile from '@/public/images/inoue.jpeg'
import Image from 'next/image'

const Profile = () => {
  return (
  <div className="rounded-full h-12 w-12">
    <Image className='rounded-full h-12 w-12' src={InoueProfile} alt='Profile picture' width={48} height={48}/>
  </div>
  )
}

export default Profile