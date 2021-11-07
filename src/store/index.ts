// store总入口
import { configureStore } from '@reduxjs/toolkit'
import { projectListSlice } from 'screens/project-list/project-list.slice'

export const rootReducer = {
  // 每个局部store的slice片段
  projectList: projectListSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
