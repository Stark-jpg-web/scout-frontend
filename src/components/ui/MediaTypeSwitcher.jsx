import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'

function MediaTypeSwitcher() {
  const { t } = useTranslation()
  const mediaType = useStore((state) => state.mediaType)
  const toggleMediaType = useStore((state) => state.toggleMediaType)
  console.log(mediaType)
  return (
    <>
      <button
        type="button"
        onClick={toggleMediaType}
        className={`control-btn ${mediaType === 'movie' ? 'text-blue-500' : 'text-primary'}`}
      >
        {mediaType === 'movie' ? t('media.shows') : t('media.movies')}
      </button>
    </>
  )
}

export default MediaTypeSwitcher
