import Chat from '@/components/Chat/Chat'
import Navigation from '@/components/Navigation/Navigation'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <main className="h-screen">
      <Navigation />
      <div className='mt-36'>
        {children}
      </div>
      <Chat />
    </main>
  )
}
