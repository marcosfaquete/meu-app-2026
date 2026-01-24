'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { logVisit, updateHeartbeat } from '@/app/actions/analytics'

export function VisitorTracker() {
  const pathname = usePathname()
  const logIdRef = useRef<number | null>(null)
  const initialized = useRef(false)

  useEffect(() => {
    // Previne execução dupla em desenvolvimento (React Strict Mode)
    // Mas garante que execute quando o pathname mudar
    
    const register = async () => {
      // Coleta dados que só existem no navegador
      const data = {
        path: pathname,
        referrer: document.referrer || null,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }

      const result = await logVisit(data)
      if (result.success && result.id) {
        logIdRef.current = result.id
      }
    }

    register()

    // Heartbeat: Atualiza o "visto por último" a cada 30 segundos
    // Isso permite calcular o tempo total: last_seen_at - created_at
    const interval = setInterval(() => {
      if (logIdRef.current) {
        updateHeartbeat(logIdRef.current)
      }
    }, 30000)

    return () => {
      clearInterval(interval)
      logIdRef.current = null
    }
  }, [pathname])

  return null
}
