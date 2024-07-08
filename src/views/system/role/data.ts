export const formSchema: any[] = [
  {
    label: '角色名称',
    prop: 'name',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入角色名称',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '权限',
    prop: 'permissions',
    span: 12,
    rules: [
      {
        required: false,
        message: '请输入权限',
        trigger: 'blur',
      },
    ],
  },
];

export const tableSchema = [
  {
    label: 'ID',
    prop: 'id',
  },
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '权限',
    prop: 'permissions',
  },
];
