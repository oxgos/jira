import { useMount } from '../hooks'
import { useArray } from '../hooks/useArray'

const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: 'jack', age: 25 },
    { name: 'ma', age: 22 }
  ]
  const { value, clear, removeIndex, add } = useArray(persons)
  useMount(() => {
    // 测试下面语句执行是否有类型报错提示
    // console.log(value.notExist)
    // add({name: 'david'})
    // removeIndex('123')
  })
  return (
    <div>
      <button onClick={() => add({ name: 'john', age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: '50px' }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person, index) => (
        <div style={{ marginBottom: '30px' }} key={person.name}>
          <span style={{ color: 'red' }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  )
}
export default TsReactTest
