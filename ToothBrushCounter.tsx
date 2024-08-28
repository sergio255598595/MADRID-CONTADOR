"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocalStorage } from "usehooks-ts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [count, setCount] = useLocalStorage("toothBrushCount", 0)
  const [animateCount, setAnimateCount] = useState(count)

  useEffect(() => {
    setAnimateCount(count)
  }, [count])

  const increment = () => setCount((prev) => Math.min(prev + 1, 270))
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0))

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Contador de Cepillados para Madrid
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-bold">
          <AnimatePresence mode="wait">
            <motion.span
              key={animateCount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {animateCount}
            </motion.span>
          </AnimatePresence>
          /270
        </div>
        <div className="flex space-x-4">
          <Button onClick={decrement} disabled={count === 0}>-</Button>
          <Button onClick={increment} disabled={count === 270}>+</Button>
        </div>
        <p className="text-center text-muted-foreground">
          {count === 270 ? "¡Has llegado a Madrid!" : `${270 - count} cepillados más para llegar a Madrid`}
        </p>
      </CardContent>
    </Card>
  )
}