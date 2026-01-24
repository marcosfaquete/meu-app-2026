import { supabase } from '@/lib/supabase'

// Força o componente a não fazer cache, para mostrar o número atualizado sempre que a página carregar
export const revalidate = 0

// Este é um Server Component, ele busca os dados no servidor antes de enviar o HTML
export default async function VisitorCounterDisplay() {
  // Busca apenas a contagem total (count: 'exact') sem trazer os dados pesados (head: true)
  const { count } = await supabase
    .from('visitor_logs')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-medium text-white backdrop-blur-md border border-white/10 shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      {count || 0} Visitantes
    </div>
  )
}