import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/user-select'
import { useAddProject, useEditProject } from 'hooks/project'
import { useEffect } from 'react'
import { useProjectModal } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal()
  // 根据editingProject判断用哪个hook
  const useMutateProject = editingProject ? useEditProject : useAddProject

  // mutateAsync是异步，mutate是同步
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  const title = editingProject ? '编辑项目' : '创建项目'

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])
  console.log('projectModalOpen : ', projectModalOpen)
  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={'100%'}
    >
      {isLoading ? (
        <Spin size={'large'} />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={'vertical'}
            style={{ width: '40rem' }}
            onFinish={onFinish}
          >
            <Form.Item
              label={'名称'}
              name={'name'}
              rules={[
                {
                  required: true,
                  message: '请输入项目名'
                }
              ]}
            >
              <Input placeholder={'请输入项目名'} />
            </Form.Item>
            <Form.Item
              label={'部门'}
              name={'organization'}
              rules={[
                {
                  required: true,
                  message: '请输入部门名'
                }
              ]}
            >
              <Input placeholder={'请输入部门名'} />
            </Form.Item>
            <Form.Item label={'负责人'} name={'personId'}>
              <UserSelect defaultOptionName={'负责人'} />
            </Form.Item>
            <Form.Item>
              <Button
                loading={mutateLoading}
                type={'primary'}
                htmlType={'submit'}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  )
}
