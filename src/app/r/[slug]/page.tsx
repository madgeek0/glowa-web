import { supabase } from '@/lib/supabase'

type Props = {
  params: Promise<{
    slug: string
  }>
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
      <main style={{ padding: 32 }}>
        <h1>Routine not found</h1>
      </main>
    )
  }

  const routine = data.routine_payload

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 32,
      }}
    >
      <h1>{routine.name}</h1>

      <p>Category: {routine.category}</p>

      <h2>Steps</h2>

      <ul>
        {routine.steps.map(
          (step: any, index: number) => (
            <li key={index}>
              {step.title}
            </li>
          )
        )}
      </ul>
    </main>
  )
}