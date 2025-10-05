import { createClient } from '@/lib/supabase/server'

export type Tenant = {
  id: string
  subdomain: string
  name: string
  emoji: string
  description: string | null
  created_at: string
  updated_at: string
  is_active: boolean
}

export async function getTenant(subdomain: string): Promise<Tenant | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('subdomain', subdomain)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error getting tenant:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error getting tenant:', error)
    return null
  }
}

export async function createTenant(tenantData: {
  subdomain: string
  name: string
  emoji: string
  description?: string
}): Promise<Tenant | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('tenants')
      .insert([tenantData])
      .select()
      .single()

    if (error) {
      console.error('Error creating tenant:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating tenant:', error)
    return null
  }
}

export async function updateTenant(
  subdomain: string, 
  updates: Partial<Tenant>
): Promise<Tenant | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('subdomain', subdomain)
      .select()
      .single()

    if (error) {
      console.error('Error updating tenant:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating tenant:', error)
    return null
  }
}

export async function deleteTenant(subdomain: string): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('tenants')
      .update({ is_active: false })
      .eq('subdomain', subdomain)

    if (error) {
      console.error('Error deleting tenant:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting tenant:', error)
    return false
  }
}

export async function getAllTenants(): Promise<Tenant[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getting all tenants:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error getting all tenants:', error)
    return []
  }
}
