// project-list.slice.ts
import { RootState } from './../../store/index'
import { createSlice } from '@reduxjs/toolkit'

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    // reduxjs/toolkit内部利用immerjs库把state变成了immutable
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})
// 利用useDispatch,读取projectListActions里的方法
export const projectListActions = projectListSlice.actions

// 利用useSelector,读取根store里的模块里的state
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen
