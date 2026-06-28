type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function SharedRoutinePage({
  params,
}: Props) {
  const { slug } = await params

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 32,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>✨ Shared Routine</h1>

      <p>
        Shared routine slug:
      </p>

      <h2>{slug}</h2>
    </main>
  )
}
