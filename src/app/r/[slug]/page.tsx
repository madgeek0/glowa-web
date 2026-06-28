import { supabase } from '@/lib/supabase'

type Props = {
  params: Promise<{
    slug: string
  }>
}

interface RoutineStep {
  title: string
}

interface Routine {
  name: string
  category: string
  steps: RoutineStep[]
}

export default async function SharedRoutinePage({
  params,
}: Props) {
  const { slug } = await params

  const { data } = await supabase
    .from('shared_routines')
    .select('*')
    .eq('share_slug', slug)
    .single()

  if (!data) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#F7F3FF] via-[#FAF6FF] to-white flex flex-col justify-between py-12 px-6 font-sans antialiased text-[#1A1820]">
        <div className="my-auto max-w-md mx-auto w-full text-center">
          {/* Centered magnifying glass / not found icon */}
          <div className="relative inline-flex items-center justify-center p-4 bg-purple-100/50 rounded-full mb-6">
            <svg className="w-10 h-10 text-[#9E7AEB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <svg className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#1A1820] mb-2">
            Routine not found
          </h1>

          <p className="text-sm text-purple-950/60 mb-8 max-w-xs mx-auto">
            This shared routine may have expired or is unavailable.
          </p>

          <a
            href="https://apps.apple.com/app/id6749804492"
            className="inline-flex items-center justify-center bg-white hover:bg-purple-50/50 active:scale-[0.98] border border-purple-100 text-[#9E7AEB] font-bold py-3.5 px-8 rounded-full shadow-sm transition-all duration-200"
          >
            Download Glowa
          </a>
        </div>
      </main>
    )
  }

  const routine = data.routine_payload as Routine

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F7F3FF] via-[#FAF6FF] to-white flex flex-col justify-between py-12 px-6 font-sans antialiased text-[#1A1820]">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center p-3 bg-purple-100/50 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-[#9E7AEB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" fill="currentColor" fillOpacity="0.15" />
            </svg>
            <svg className="w-4 h-4 text-purple-300 absolute -top-1 -right-1 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>

          <p className="text-xs font-bold tracking-widest uppercase text-[#9E7AEB] mb-2">
            Shared from Glowa
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1820] max-w-sm mx-auto">
            {routine.name}
          </h1>

          <div className="mt-3">
            <span className="text-xs text-[#9E7AEB] font-semibold bg-[#9E7AEB]/10 px-3 py-1 rounded-full uppercase tracking-wider">
              {routine.category} routine • {routine.steps.length} steps
            </span>
          </div>
        </div>

        {/* Routine Card */}
        <div className="bg-white/90 backdrop-blur-sm border border-purple-100/60 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(158,122,235,0.06)] mb-8 flex-1">
          <h2 className="text-xs font-bold tracking-wider uppercase text-purple-900/60 mb-5">
            Routine Steps
          </h2>

          <div className="space-y-3">
            {routine.steps.map((step: RoutineStep, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 border-b border-purple-50/50 last:border-0"
              >
                <div className="w-8 h-8 rounded-full bg-[#9E7AEB]/10 text-[#9E7AEB] font-bold text-sm flex items-center justify-center shrink-0 border border-[#9E7AEB]/5">
                  {index + 1}
                </div>

                <p className="font-semibold text-[#2D2A37] text-base leading-relaxed">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-auto text-center w-full">
          <p className="text-sm font-semibold tracking-wide text-purple-950/50 mb-4">
            Build routines you&apos;ll actually keep.
          </p>

          <a
            href={`glowa://r/${slug}`}
            className="block w-full bg-[#9E7AEB] hover:bg-[#8D65E0] text-white text-center py-4 rounded-[24px] font-bold text-base shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all duration-200"
          >
            Open in Glowa
          </a>

          <a
            href="https://apps.apple.com/app/id6749804492"
            className="inline-flex items-center justify-center gap-1.5 mt-4 text-[#9E7AEB] hover:text-[#8D65E0] font-bold text-sm transition-colors duration-200"
          >
            Download Glowa
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </main>
  )
}