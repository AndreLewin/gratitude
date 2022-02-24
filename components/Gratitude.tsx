import { Gratitude } from './IndexConnected'

export default function Gratidude({ gratitude }: { gratitude: Gratitude }) {
  return (
    <div className='gratitude-root'>
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