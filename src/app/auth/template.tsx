import { UserContextProvider } from '@/context/UserContext'

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 lg:block w-full md:w-1/2 xl:w-2/3 h-screen"></div>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <UserContextProvider>{children}</UserContextProvider>
      </div>
    </section>
  )
}
