import { motion, AnimatePresence } from "framer-motion"
import Cake from "./components/Cake.js"
import Candle from "./components/Candle.js"
import { useEffect, useState } from "react"
import useKey from "./hooks/useKey.js"

function App() {

  const [candles, setCandles] = useState<{x: number, y: number, out: boolean, visible: boolean}[]>([])

  const addCandle = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const newCandles = [...candles]
    newCandles.forEach((candle) => {
      if (candle.visible === false) newCandles.splice(newCandles.indexOf(candle), 1)
    })
    setCandles(newCandles)
    const {clientX, clientY} = e
    setCandles([...candles, {x: clientX, y: clientY, out: false, visible: true}])
  }

  const handleBodyClick = (i: number) => {
    const newCandles = [...candles]
    newCandles[i].visible = false
    newCandles[i].out = true
    setCandles(newCandles)
  } 

  const handleFlameClick = (i: number) => {
    const newCandles = [...candles]
    newCandles[i].out = !newCandles[i].out
    setCandles(newCandles)
  }

  useEffect(() => {
    const handleResize = () => {
      setCandles([])
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [blowOut, setBlowOut] = useState(false)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)
      analyser.smoothingTimeConstant = 0.8
      analyser.fftSize = 1024
      microphone.connect(analyser)
      analyser.connect(javascriptNode)
      javascriptNode.connect(audioContext.destination)
      javascriptNode.addEventListener("audioprocess" ,() => {
        const array = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(array)
        let values = 0
        const length = array.length
        for (let i = 0; i < length; i++) {
          values += (array[i])
        }
        const average = values / length
        if (average > 100) {
          setBlowOut(true)
        }
      })
    }).catch(err => {
      console.log(err)
    })
    return () => {
      removeEventListener('audioprocess', () => {})
    }
  }, [])

  useEffect(() => {
    if (blowOut) {
      setTimeout(() => {
        setBlowOut(false)
      }, 100)
    }
  }, [blowOut, candles])

  useEffect(() => {
    if (blowOut) {
      const newCandles = [...candles]
      newCandles.forEach((candle) => {
        candle.out = candle.out ? true : Math.random() < 0.03
      })
      setCandles(newCandles)
    }
  }, [blowOut, candles])

  useKey("Space", () => {
    const newCandles = [...candles]
    newCandles.forEach((candle) => {
      candle.out = false
    })
    setCandles(newCandles)
  })

  return (
    <div className="bg-gradient-to-br from-green-900 via-yellow-900 to-red-900 relative min-h-screen min-w-screen">
      <AnimatePresence>
      {
        candles.map((candle, i) => (
          candle.visible && <motion.div
            initial={{y: -100}}
            animate={{y: 0}}
            exit={{y: -500}}
          key={i} className="absolute z-[12]">
            <Candle handleBodyClick={() => {
              handleBodyClick(i)
            }} handleFlameClick={() => {
              handleFlameClick(i)
            }} style={{top: candle.y - 125 + 'px', left: candle.x - 25 + 'px'}} out={candle.out} />
          </motion.div>
        ))
      }
      </AnimatePresence>
      <Cake addCandle={addCandle} />
    </div>
  )
}

export default App
