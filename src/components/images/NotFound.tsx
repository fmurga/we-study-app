import Image from 'next/image';
import NotFoundImage from './SVGS/NotFound.svg';

export const NotFoundSvg = () => {
  return (
    <>
      <Image priority src={NotFoundImage} alt="My Icon" />
    </>
  )
}