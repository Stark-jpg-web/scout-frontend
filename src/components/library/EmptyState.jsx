import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GiCompass } from 'react-icons/gi'
import LinkButton from '../ui/LinkButton'
function EmptyState({
  icon = <GiCompass />,
  title,
  descreption,
  actionLabel,
  actionTo = '/',
}) {
  const { t } = useTranslation()

  return (
    <div className="external-border rounded-xl border-2 border-border p-2 relative ">
      <div
        className="absolute top-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_10px_rgba(215,168,71,0.35)]"
        aria-hidden="true"
      ></div>
      <div className="internal-border shadow-inner rounded-xl border-2 border-dashed border-border bg-surface/50 p-12 text-center">
        <div className=" icon flex justify-center items-center text-primary  text-6xl animate-pulse bg-gradient-to-b from-primary   bg-clip-text ">
          {icon}
        </div>
        <div className="text-group my-4">
          <h1 className="text-primary text-3xl">{title}</h1>
          <p className="text-secondary text-lg">{descreption}</p>
        </div>
        {actionLabel && (
          <div className="action-button">
            <LinkButton
              icon={<GiCompass />}
              actionTo={actionTo}
              text={actionLabel}
              className=""
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState
