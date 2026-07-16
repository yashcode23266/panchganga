import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { festivalDate } from '../utils/format'

function getParts() {
  const diff = Math.max(0, festivalDate().getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Countdown() {
  const { t } = useLanguage()
  const [parts, setParts] = useState(getParts)

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {Object.entries(parts).map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center gap-2 rounded-[0.8rem] bg-white p-6 text-center shadow-md border border-green-100"
        >
          <div className="text-4xl font-extrabold leading-none text-green-700 sm:text-5xl">{String(value).padStart(2, '0')}</div>
          <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-stone-600 sm:text-xs">
            {t(`countdown${label[0].toUpperCase()}${label.slice(1)}`)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Countdown
