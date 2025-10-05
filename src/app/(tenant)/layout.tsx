import { getCurrentTenant } from '@/lib/tenant'
import { redirect } from 'next/navigation'

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tenant = await getCurrentTenant()
  
  if (!tenant) {
    // Redirect to main site if tenant not found
    redirect('/')
  }

  return (
    <html lang="pl">
      <head>
        <title>{tenant.name} - {tenant.description}</title>
        <meta name="description" content={tenant.description} />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{tenant.emoji}</span>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tenant.name}
                  </h1>
                </div>
                <nav className="flex space-x-8">
                  <a
                    href="/"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Strona główna
                  </a>
                  <a
                    href="/features"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Funkcje
                  </a>
                  <a
                    href="/pricing"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cennik
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-white dark:bg-gray-800 border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-2xl mr-2">{tenant.emoji}</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tenant.name}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Powered by SaaS Base
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
