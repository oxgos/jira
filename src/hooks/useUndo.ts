import { useCallback, useState } from 'react'

interface UndoState<T> {
  present: T
  past: T[]
  future: T[]
}

export const useUndo = <T>(initialData: T) => {
  const [state, setState] = useState<UndoState<T>>({
    present: initialData,
    past: [],
    future: []
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { present, past } = currentState
      if (present === newPresent) return currentState
      return {
        present: newPresent,
        past: [...past, present],
        future: []
      }
    })
  }, [])

  const undo = useCallback(() => {
    setState((currentState) => {
      const { present, past, future } = currentState
      if (past.length === 0) return currentState

      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        present: previous,
        past: newPast,
        future: [present, ...future]
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((currentState) => {
      const { present, past, future } = currentState
      if (future.length === 0) return currentState

      const next = future[0]
      const newFuture = future.slice(1)
      return {
        present: next,
        past: [...past, present],
        future: newFuture
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => ({
      present: newPresent,
      past: [],
      future: []
    }))
  }, [])

  return [
    state,
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
