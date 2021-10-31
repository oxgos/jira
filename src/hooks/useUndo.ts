import { useCallback, useState } from 'react'

export const useUndo = <T>(initialData: T) => {
  const [present, setPresent] = useState(initialData)
  const [past, setPast] = useState<T[]>([])
  const [future, setFuture] = useState<T[]>([])

  const canUndo = past.length !== 0
  const canRedo = future.length !== 0

  const set = useCallback(
    (newPresent: T) => {
      if (present === newPresent) return
      setPresent(newPresent)
      setPast([...past, present])
      setFuture([])
    },
    [past, present]
  )

  const undo = useCallback(() => {
    if (past.length === 0) return

    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)
    setFuture([present, ...future])
    setPresent(previous)
    setPast(newPast)
  }, [future, past, present])

  const redo = useCallback(() => {
    if (future.length === 0) return

    const next = future[0]
    const newFuture = future.slice(1)
    setFuture(newFuture)
    setPresent(next)
    setPast([...past, present])
  }, [future, past, present])

  const reset = useCallback((newPresent: T) => {
    setPresent(newPresent)
    setPast([])
    setFuture([])
  }, [])

  return [
    {
      present,
      past,
      future
    },
    {
      set,
      undo,
      redo,
      reset,
      canUndo,
      canRedo
    }
  ] as const
}
