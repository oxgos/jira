import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from './index'
import { useAsync } from 'hooks/use-async'

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  const { run, isLoading /* error */ } = useAsync(undefined, {
    throwOnError: true
  })
  // 默认表单提交方式
  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    // 如果要用try...catch捕获，需要用await、async
    // run(login(values)).catch(onError)
    try {
      await run(login(values))
    } catch (e) {
      onError(e as Error)
    }
    // await run(login(values))
    // console.log(error, '我是error') // null,因为setState是异步，异步跟同步混用，只能用try...catch...
    // if (error) {
    //   onError(error)
    // }
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name='username'
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input
          placeholder={'用户名'}
          type='text'
          autoComplete='off'
          id={'username'}
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input
          placeholder={'密码'}
          type='password'
          id={'password'}
          autoComplete='off'
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type='primary'>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default Login
