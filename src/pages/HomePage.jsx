import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation()

  return (
    <main className="bg-background text-white h-screen">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {t('app.name')}
        </h1>

      <p className="text-base text-muted">{t('app.tagline')}</p>
    </main>
  )
}

export default HomePage
