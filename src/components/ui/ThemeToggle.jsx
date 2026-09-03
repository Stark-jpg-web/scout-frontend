import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'

function ThemeToggle() {
  const { t } = useTranslation()
  const theme = useStore((state) => state.theme)
  const toggleTheme = useStore((state) => state.toggleTheme)

  return (
    <button
      type="button"
      className="control-btn"
      onClick={toggleTheme}
      aria-label={t(
        theme === 'dark' ? 'theme.switchToLight' : 'theme.switchToDark'
      )}
    >
      <span aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  )
}

export default ThemeToggle
