import { getTagList } from '@/api/tag'
import { upload } from '@/api/common'

export const schema: any[] = [
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
      console.log(response);
      
      formRef.setFormItem('thumbnail',response.result)
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
    label: '内容',
    prop: 'content',
    span: 12,
    slot: true,
    rules: [
      {
        required: true,
        message: '请输入内容',
        trigger: 'blur'
      }
    ]
  }
]
