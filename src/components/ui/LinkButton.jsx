import { Link } from 'react-router-dom'

function LinkButton({ icon, actionTo, text,className=' '}) {

  return (
    <Link
      to={actionTo}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-md text-sm ${className}`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

export default LinkButton