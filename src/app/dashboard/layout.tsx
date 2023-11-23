import Chat from "@/components/Chat/Chat"
import Navigation from "@/components/Navigation/Navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="my-36">
      <Navigation />
      {children}
      <Chat />
    </main>
  )
}
