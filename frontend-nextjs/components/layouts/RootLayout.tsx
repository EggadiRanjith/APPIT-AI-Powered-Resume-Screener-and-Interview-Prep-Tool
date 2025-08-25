import Header from '../Header'
import Footer from '../Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none" />
      <Header />
      <main className="flex-grow pt-16 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
