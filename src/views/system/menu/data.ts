export const tableSchema = [
  {
    label: 'ID',
    prop: 'id',
  },
  {
    label: 'PID',
    prop: 'pid',
  },
  {
    label: '标题',
    prop: 'title',
  },
  {
    label: '路径',
    prop: 'path',
  },
  {
    label: '组件',
    prop: 'component',
  },
  {
    label: '图标',
    prop: 'icon',
  },
  {
    label: '排序',
    prop: 'sort',
  },
  {
    label: '是否隐藏',
    prop: 'hidden',
  },
];

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
    label: 'pid',
    prop: 'pid',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入pid',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '路径',
    prop: 'path',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入路径',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '组件',
    prop: 'component',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入组件',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '图标',
    prop: 'icon',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入图标',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '排序',
    prop: 'sort',
    span: 12,
    rules: [
      {
        required: true,
        message: '请输入图标',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '是否隐藏',
    prop: 'hidden',
    type: 'select',
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请选择是否隐藏',
        trigger: 'blur',
      },
    ],
  },
];
