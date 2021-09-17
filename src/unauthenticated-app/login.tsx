import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'

const Login = () => {
  const { login } = useAuth()
  // 默认表单提交方式
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values)
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name='username'
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} type='text' id={'username'} />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} type='password' id={'password'} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={'submit'} type='primary'>
          登陆
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
