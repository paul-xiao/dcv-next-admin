import { upload } from '@/api/common';
import { list as roleList } from '@/api/role';

export const formSchema: any[] = [
  {
    label: '用户名',
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
    label: '头像',
    prop: 'avatar',
    type: 'upload',
    componentProps: {
      httpRequest: upload, // 自定义上传
    },
    change: (formRef: any, response: any) => {
      formRef.setFormItem('uploadFileId', response.uploadFileId);
    },
    span: 12,
    rules: [
      {
        required: false,
        message: '请上传头像',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '角色',
    prop: 'roleId',
    type: 'select',
    componentProps: {
      api: roleList,
      props: {
        label: 'name',
        value: 'id'
      }
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请选择角色',
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
    label: '电话',
    prop: 'phone',
    span: 12,
    rules: [
      {
        required: false,
        message: '请输入电话',
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

export const tableSchema = [
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '缩略图',
    prop: 'avatar',
    slot: true,
  },
  {
    label: '角色',
    prop: 'roleId',
    slot: true,
  },
  {
    label: '邮箱',
    prop: 'email',
  },
];
