export const loginSchema = [
  {
    prop: 'email',
    labelWidth: '0',
    componentProps: {
      placeholder: '邮箱',
    },
    rules: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
      },
    ],
  },
  {
    prop: 'password',
    labelWidth: '0',
    componentProps: {
      type: 'password',
      placeholder: '密码',
    },
    rules: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
  },
  {
    prop: 'captcha',
    labelWidth: '0',
    componentProps: {
      placeholder: '验证码',
    },
    rules: [
      {
        required: false,
        message: '请输入验证码',
        trigger: 'blur',
      },
    ],
  },
];
