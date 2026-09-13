import { useTranslation } from 'react-i18next'
import EmptyState from '../components/library/EmptyState'
import { ImLibrary } from 'react-icons/im'
import CollectionFilterToolbar from '../components/library/CollectionFilterToolbar.jsx'
function LibraryPage() {
  const { t } = useTranslation()

  return (
    <CollectionFilterToolbar/>
    // <EmptyState
    //   title={t('library.emptyWatchlistTitle')}
    //   descreption={t('library.emptyWatchlistDesc')}
    //   icon={<ImLibrary className="text-6xl" />}
    //   actionLabel={t('library.exploreDiscover')}
    //   actionTo="/discover"
    // />
  )
}

export default LibraryPage
