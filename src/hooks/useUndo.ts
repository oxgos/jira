import { useCallback, useReducer } from 'react'

interface UndoState<T> {
  present: T
  past: T[]
  future: T[]
}

/** 两种写法 */
// const SET = 'SET'
// const UNDO = 'UNDO'
// const REDO = 'REDO'
// const RESET = 'RESET'
// interface UndoAction<T> {
//   type: typeof SET | typeof UNDO | typeof REDO | typeof RESET
//   newPresent?: T
// }
enum ACTION_TYPE {
  SET = 'SET',
  UNDO = 'UNDO',
  REDO = 'REDO',
  RESET = 'RESET'
}
type UndoAction<T> = {
  type: ACTION_TYPE
  newPresent?: T
}

// reducer的工作机制: 从前一个state,推断出下一个state
const undoReducer = <T>(currentState: UndoState<T>, action: UndoAction<T>) => {
  const { type, newPresent } = action
  const { present, past, future } = currentState

  switch (type) {
    case ACTION_TYPE.SET: {
      if (present === newPresent) return currentState

      return {
        present: newPresent,
        past: [...past, present],
        future: []
      }
    }

    case ACTION_TYPE.UNDO: {
      if (past.length === 0) return currentState

      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        present: previous,
        past: newPast,
        future: [present, ...future]
      }
    }

    case ACTION_TYPE.REDO: {
      if (future.length === 0) return currentState

      const next = future[0]
      const newFuture = future.slice(1)
      return {
        present: next,
        past: [...past, present],
        future: newFuture
      }
    }

    case ACTION_TYPE.RESET: {
      return {
        present: newPresent,
        past: [],
        future: []
      }
    }

    default:
      return currentState
  }
}

export const useUndo = <T>(initialData: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    present: initialData,
    past: [],
    future: []
  } as UndoState<T>)

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const set = useCallback(
    (newPresent: T) =>
      dispatch({
        type: ACTION_TYPE.SET,
        newPresent
      }),
    []
  )

  const undo = useCallback(
    () =>
      dispatch({
        type: ACTION_TYPE.UNDO
      }),
    []
  )

  const redo = useCallback(
    () =>
      dispatch({
        type: ACTION_TYPE.REDO
      }),
    []
  )

  const reset = useCallback(
    (newPresent: T) =>
      dispatch({
        type: ACTION_TYPE.RESET,
        newPresent
      }),
    []
  )

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
