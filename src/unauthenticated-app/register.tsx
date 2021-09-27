import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from './index'
import { useAsync } from 'hooks/use-async'

const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  // 默认表单提交方式
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (values.password !== cpassword) {
      onError(new Error('请确认两次输入密码相同'))
      return
    }
    try {
      await run(register(values))
    } catch (e) {
      onError(e as Error)
    }
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
          id={'username'}
          autoComplete='off'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: '确认密码' }]}
      >
        <Input
          placeholder={'请确认密码'}
          type='password'
          id={'password'}
          autoComplete='off'
        />
      </Form.Item>
      <Form.Item
        name='cpassword'
        rules={[{ required: true, message: '请确认密码' }]}
      >
        <Input
          placeholder={'请确认密码'}
          type='password'
          id={'cpassword'}
          autoComplete='off'
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type='primary'>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default Register
