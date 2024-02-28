import { getTagList } from '@/api/tag'
import { upload } from '@/api/common'

export const formSchema: any[] = [
  {
    label: '标题',
    prop: 'title',
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
    label: '缩略图',
    prop: 'thumbnail',
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
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '分类',
    prop: 'tags',
    type: 'select',
    componentProps: {
      multiple: true,
      clearable: true,
      filterable: true,
      allowCreate: true,
      api: getTagList,
      props: {
        label: 'name',
        value: 'name'
      }
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请选择分类',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '嵌入链接',
    prop: 'link',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入嵌入链接',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '备注',
    prop: 'notes',
    componentProps: {
      type: 'textarea'
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入备注',
        trigger: 'blur'
      }
    ]
  }
]

export const tableSchema = [
  {
    label: '名称',
    prop: 'title'
  },
  {
    label: '缩略图',
    prop: 'thumbnail',
    slot: true
  },
  {
    label: '嵌入链接',
    prop: 'link'
  },
  {
    label: '标签',
    prop: 'tags'
  },
  {
    label: '备注',
    prop: 'notes'
  }
]
