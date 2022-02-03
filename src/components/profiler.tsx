import React, { ProfilerOnRenderCallback, ProfilerProps } from 'react'

type props = {
  metaData?: any
  phases?: ('mount' | 'update')[]
} & Omit<ProfilerProps, 'onRender'>

let queue: unknown[] = []

const sendProfileQueue = () => {
  if (!queue.length) {
    return
  }
  const queueToSend = [...queue]
  queue = []
  console.log(queueToSend)
}

setInterval(sendProfileQueue, 5000)

export const Profiler = ({ metaData, phases, ...props }: props) => {
  const reportProfile: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    // 判断是否指定阶段记录，没传入，记录所有阶段
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
      })
    }
  }

  return <React.Profiler onRender={reportProfile} {...props}></React.Profiler>
}
