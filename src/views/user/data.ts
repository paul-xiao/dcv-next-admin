import { upload } from '@/api/common';
export const schema: any[] = [
  {
    label: '用户名称',
    prop: 'name',
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
    label: '用户头像',
    prop: 'avatar',
    type: 'upload',
    componentProps: {
      httpRequest: upload, // 自定义上传
    },
    change: (formRef: any, response: any) => {
      formRef.setFormItem('thumbnail', response);
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
    label: '邮箱',
    prop: 'email',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '手机号',
    prop: 'phone',
    span: 12,
    rules: [
      {
        required: false,
        message: '请输入手机号',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '性别',
    prop: 'sex',
    span: 12,
    rules: [
      {
        required: false,
        message: '请输入性别',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '生日',
    prop: 'birthday',
    span: 12,
    rules: [
      {
        required: false,
        message: '请输入生日',
        trigger: 'blur',
      },
    ],
  },
];

export const changgePwdFormSchema: any[] = [
  {
    label: '旧密码',
    prop: 'password',
    componentProps: {
      type: 'password',
      placeholder: '请输入旧密码',
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入旧密码',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '新密码',
    prop: 'newPassword',
    componentProps: {
      type: 'password',
      placeholder: '请输入新密码',
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入新密码',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '确认密码',
    prop: 'rePassword',
    componentProps: {
      type: 'password',
      placeholder: '请输入确认密码',
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请再次输入新密码',
        trigger: 'blur',
      },
    ],
  },
];
