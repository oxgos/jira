import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from './index'

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  // 默认表单提交方式
  const handleSubmit = (values: { username: string; password: string }) => {
    // 如果要用try...catch捕获，需要用await、async
    login(values).catch(onError)
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
        <LongButton htmlType={'submit'} type='primary'>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default Login
