import { useEffect, useRef, useState, type FC } from "react"
import { Layout } from "./components/layouts"
import { Heading, IconButton, Slider, Text, useBoolean } from "@yamada-ui/react"
import { PauseIcon, PlayIcon } from "@yamada-ui/lucide"

const App: FC = () => {
  const [playing, { on: start, off: end }] = useBoolean()
  const [value, setValue] = useState(0)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const valueRef = useRef(value)

  const handlePlay = () => {
    if (playing) return
    start()
    const timerId = setInterval(() => {
      if (valueRef.current === 100) {
        clearInterval(timerId)
        setValue(0)
        end()
      } else {
        setValue((prev) => Math.min(prev + 0.025, 100)) // 0.025ごとに増やす
      }
    }, 25)
    setTimerId(timerId)
  }

  const handleStop = () => {
    if (!playing) return
    clearInterval(timerId!)
    // setValue(0)
    end()
  }

  useEffect(() => {
    valueRef.current = value
  }, [value])

  return <Layout>
    <Heading>seek bar</Heading>
    <Text>{Math.floor(value)}/100秒</Text>
    <Slider value={value} onChange={setValue} min={0} max={100}
      thumbProps={{
        visibility: "hidden",
        _after: {
          content: '""',
          display: "block",
          w: "4",
          h: "4",
          borderRadius: "full",
          bg: "white",
          border: "1px solid",
          bordercolor: "gray.300",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: `${value}%`,
          transition: "left 0",
          visibility: "visible",
        }
      }}
    />
    <IconButton icon={playing ? <PauseIcon /> : <PlayIcon />} onClick={playing ? handleStop : handlePlay} />
  </Layout>
}

export default App