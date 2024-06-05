export const schema: any[] = [
  {
    label: '标题',
    prop: 'title',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入标题',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '图片',
    prop: 'thumbnail',
    type: 'upload',
    componentProps: {
      action: '/api/upload', // 自定义上传
    },
    change: (formRef: any, response: any) => {
      formRef.setFormItem('uploadFileId', response.uploadFileId);
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入标题',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '备注',
    prop: 'notes',
    span: 12,
    componentProps: {
      type: 'textarea',
      rows: 4,
    },
    rules: [
      {
        required: true,
        message: '请输入备注',
        trigger: 'blur',
      },
    ],
  },
];


export const tableSchema = [{
  label: '名称',
  prop: 'title',
},
{
  label: '图片',
  prop: 'thumbnail',
},
{
  label: '备注',
  prop: 'notes',
},
{
  label: '创建时间',
  prop: 'createTime',
}]