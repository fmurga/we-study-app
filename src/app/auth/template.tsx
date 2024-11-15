import { UserContextProvider } from '@/context/UserContext';
import Image from "next/image";
import Link from "next/link";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center bg-gradient-to-b from-blue-950 to-gray-900">
      {/* Left Section - Centered Logo and Message */}
      <div className="hidden md:flex md:w-1/2 xl:w-2/3 h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex-col items-center justify-center text-white">
        <div className="flex flex-col place-items-center text-center">
          <div className="flex flex-row gap-4 mb-8">
            <h2 className="text-5xl font-bold">Welcome to</h2>
            <Image
              src="/images/WeStudy-Logo.png" // Update this path to where your logo is stored in the public folder
              alt="WeStudy Logo"
              width={240}
              height={80}
              priority
            />
          </div>
          <p className="text-xl max-w-md mb-8">
            Connect with peers, access valuable resources, and grow together!
          </p>
          <Link href="/" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div
        className="w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-8 py-12 lg:px-16 xl:px-12
        flex flex-col items-center justify-center bg-gray-900 text-white shadow-lg"
      >
        <Image
          src="/images/WeStudy-Logo.png" // Update this path to where your logo is stored in the public folder
          alt="WeStudy Logo"
          width={150}
          height={50}
          priority
          className="mb-8 md:hidden"
        />
        <UserContextProvider>
          <div className="w-full mb-8">
            {children}
          </div>
        </UserContextProvider>
      </div>
    </section>
  );
}
