import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createTenant, getAllTenants } from '@/lib/redis'

export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tenants = await getAllTenants()
    return NextResponse.json(tenants)
  } catch (error) {
    console.error('Error getting tenants:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { subdomain, name, emoji, description } = await request.json()

    if (!subdomain || !name || !emoji || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9-]+$/
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json({ 
        error: 'Subdomain can only contain lowercase letters, numbers, and hyphens' 
      }, { status: 400 })
    }

    const tenant = await createTenant(subdomain, {
      name,
      emoji,
      description,
    })

    if (!tenant) {
      return NextResponse.json({ error: 'Failed to create tenant' }, { status: 500 })
    }

    return NextResponse.json(tenant, { status: 201 })
  } catch (error) {
    console.error('Error creating tenant:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
