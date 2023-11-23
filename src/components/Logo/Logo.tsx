import Image from "next/image"
import LogoImg from "@/public/images/westudy.png"

const Logo = () => {
  return (
    <div className="h-20 w-20 flex items-center">
      <Image src={LogoImg} alt="Page Logo" width={150} height={80}/>
      <p className="text-white text-3xl font-bold">We<span className="text-blue-600">S</span>tudy</p>
    </div>
  )
}

export default Logo