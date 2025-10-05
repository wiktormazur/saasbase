export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
            Błąd autentykacji
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Wystąpił problem z logowaniem. Spróbuj ponownie.
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/login"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Powrót do logowania
          </a>
        </div>
      </div>
    </div>
  )
}
