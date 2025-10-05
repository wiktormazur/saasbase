'use client'

import { useState } from 'react'
import { Tenant } from '@/lib/tenants'

interface TenantListProps {
  tenants: Tenant[]
}

export default function TenantList({ tenants }: TenantListProps) {
  const [localTenants, setLocalTenants] = useState(tenants)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const subdomain = formData.get('subdomain') as string
    const name = formData.get('name') as string
    const emoji = formData.get('emoji') as string
    const description = formData.get('description') as string

    try {
      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subdomain,
          name,
          emoji,
          description,
        }),
      })

      if (response.ok) {
        const newTenant = await response.json()
        setLocalTenants([newTenant, ...localTenants])
        setShowCreateForm(false)
        // Reset form
        ;(e.target as HTMLFormElement).reset()
      }
    } catch (error) {
      console.error('Error creating tenant:', error)
    }
  }

  const handleDeleteTenant = async (subdomain: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tego tenanta?')) {
      return
    }

    try {
      const response = await fetch(`/api/tenants/${subdomain}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setLocalTenants(localTenants.filter(t => t.name !== subdomain))
      }
    } catch (error) {
      console.error('Error deleting tenant:', error)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Zarządzanie tenantami
          </h3>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Dodaj tenanta
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreateTenant} className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              Nowy tenant
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subdomena
                </label>
                <input
                  type="text"
                  name="subdomain"
                  id="subdomain"
                  required
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="np. moja-firma"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nazwa
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Nazwa firmy"
                />
              </div>
              <div>
                <label htmlFor="emoji" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Emoji
                </label>
                <input
                  type="text"
                  name="emoji"
                  id="emoji"
                  required
                  maxLength={2}
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="🚀"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Opis
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  required
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Opis firmy"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Utwórz tenanta
              </button>
            </div>
          </form>
        )}

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subdomena
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Utworzony
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              {localTenants.map((tenant) => (
                <tr key={tenant.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{tenant.emoji}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tenant.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {tenant.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <a
                      href={`http://${tenant.name}.localhost:3000`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      {tenant.name}.localhost:3000
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(tenant.createdAt).toLocaleDateString('pl-PL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteTenant(tenant.name)}
                      className="text-red-600 hover:text-red-500"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
