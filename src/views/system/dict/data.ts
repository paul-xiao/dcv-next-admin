
export const formSchema: any[] = [
  {
    label: '名称',
    prop: 'name',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '编码',
    prop: 'code',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入编码',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '父级ID',
    prop: 'pid',
    span: 12,
    rules: [
      {
        required: false,
        message: '请输入父级ID',
        trigger: 'blur'
      }
    ]
  }
]

export const tableSchema = [
  {
    label: 'ID',
    prop: 'id'
  },
  {
    label: 'PID',
    prop: 'pid'
  },
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '编码',
    prop: 'code'
  }
]
