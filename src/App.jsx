import { Suspense, useState } from 'react'
import './styles.css'

import Cups from './Cups'
// Comment the above and uncomment the following to import the WebGL BG lazily for faster loading times
// const Bananas = lazy(() => import('./Bananas'))

export default function App() {
  const [speed, set] = useState(1)
  return (
    <>
      <Suspense fallback={null}>
        <Cups speed={speed} />
      </Suspense>
    </>
  )
}
