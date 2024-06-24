import { upload } from '@/api/common'

export const formSchema: any[] = [
  {
    label: '用户名',
    prop: 'name',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '头像',
    prop: 'avatar',
    type: 'upload',
    componentProps: {
      httpRequest: upload // 自定义上传
    },
    change: (formRef: any, response: any) => {
      formRef.setFormItem('uploadFileId', response.uploadFileId)
    },
    span: 12,
    rules: [
      {
        required: false,
        message: '请上传头像',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '邮箱',
    prop: 'email',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '电话',
    prop: 'phone',
    span: 12,
    rules: [
      {
        required: false,
        message: '请输入电话',
        trigger: 'blur'
      }
    ]
  }
]

export const tableSchema = [
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '缩略图',
    prop: 'avatar',
    slot: true
  },
  {
    label: '邮箱',
    prop: 'email'
  }
]
