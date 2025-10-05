import { getCurrentTenant } from '@/lib/tenant'

export default async function TenantHomePage() {
  const tenant = await getCurrentTenant()
  
  if (!tenant) {
    return null
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mb-8">
            <span className="text-6xl mb-4 block">{tenant.emoji}</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Witaj w {tenant.name}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {tenant.description}
            </p>
          </div>
          
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a
                href="/features"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Zobacz funkcje
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="/pricing"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Zobacz cennik
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <span className="text-2xl">🚀</span>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                    Szybka implementacja
                  </h3>
                  <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                    Rozpocznij pracę w ciągu minut, nie tygodni. Nasza platforma jest gotowa od razu.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <span className="text-2xl">🔒</span>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                    Bezpieczeństwo
                  </h3>
                  <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                    Twoje dane są bezpieczne dzięki najnowszym standardom szyfrowania.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <span className="text-2xl">📊</span>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                    Analityka
                  </h3>
                  <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                    Śledź postępy i analizuj dane w czasie rzeczywistym.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-blue-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Gotowy na start?</span>
                    <span className="block text-blue-200">Rozpocznij już dziś.</span>
                  </h2>
                  <p className="mt-4 text-lg text-blue-100">
                    Dołącz do tysięcy zadowolonych klientów korzystających z {tenant.name}.
                  </p>
                </div>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow">
                    <a
                      href="/pricing"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                    >
                      Rozpocznij bezpłatnie
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
