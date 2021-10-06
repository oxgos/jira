/** @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import { SearchPanelProps } from './interface'
import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'

const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          type='text'
          placeholder={'项目名'}
          autoComplete='off'
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        ></UserSelect>
      </Form.Item>
    </Form>
  )
}

export default SearchPanel
