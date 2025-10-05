import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LoginForm from './login-form'

export default async function Login() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Zaloguj się do SaaS Base
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Wprowadź swój email, aby się zalogować
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
