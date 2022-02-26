import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { Gratitude } from './GratitudeList'

export default function Gratidude({ gratitude }: { gratitude: Gratitude }) {
  const [formattedDate, setFormattedDate] = useState<string | null>("")
  useEffect(() => {
    setFormattedDate(format(new Date(gratitude.created_at), 'yyyy-MM-dd'))
  }, [])

  return (
    <div className='gratitude-root'>
      <div style={{ display: 'flex' }}>
        <div>TODO: name</div>
        <div>{formattedDate}</div>
      </div>

      <div>
        <div><span className='for-because-words'>I am grateful for</span> {gratitude.for}</div>
        <div><span className='for-because-words'>Because</span> {gratitude.because}</div>
      </div>

      <style jsx>
        {`
          .gratitude-root {
            border: 2px solid black;
            border-radius: 5px;
            padding: 5px;
            margin: 5px;
          }

          .for-because-words {
            opacity: 0.7;
          }
        `}
      </style>
    </div>
  )
}