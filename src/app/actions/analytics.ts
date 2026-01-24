'use server'

import { headers } from 'next/headers'
import { supabase } from '@/lib/supabase'

interface ClientData {
  path: string
  referrer: string | null
  screen_resolution: string
  language: string
  timezone: string
}

export async function logVisit(data: ClientData) {
  const headersList = await headers()
  
  // Tenta pegar o IP real (considerando proxies/Vercel/Cloudflare)
  const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 
             headersList.get('x-real-ip') || 
             'unknown'
             
  const userAgent = headersList.get('user-agent') || 'unknown'
  
  // Tenta extrair localização dos headers (comum em hospedagens como Vercel)
  const country = headersList.get('x-vercel-ip-country') || headersList.get('cf-ipcountry') || null
  const city = headersList.get('x-vercel-ip-city') || null
  const region = headersList.get('x-vercel-ip-region') || null

  try {
    const { data: log, error } = await supabase
      .from('visitor_logs')
      .insert({
        ip_address: ip,
        user_agent: userAgent,
        path: data.path,
        referrer: data.referrer,
        screen_resolution: data.screen_resolution,
        language: data.language,
        timezone: data.timezone,
        country,
        city,
        region,
        // last_seen_at é preenchido automaticamente com o created_at no insert
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, id: null }
    }
    
    return { success: true, id: log.id }
  } catch (error) {
    console.error('Erro ao registrar visita:', error)
    return { success: false, id: null }
  }
}

export async function updateHeartbeat(logId: number) {
  try {
    await supabase
      .from('visitor_logs')
      .update({ last_seen_at: new Date().toISOString() })
      .eq('id', logId)
  } catch (error) {
    console.error('Erro no heartbeat:', error)
  }
}
