export const loginSchema = [
    {
      prop: 'email',
      labelWidth: '0',
      componentProps: {
        placeholder: '邮箱'
      },
      rules: [
        {
          required: true,
          message: 'please input your email',
          trigger: 'blur'
        }
      ]
    },
    {
      prop: 'password',
      labelWidth: '0',
      componentProps: {
        type: 'password',
        placeholder: '密码'
      },
      rules: [
        {
          required: true,
          message: 'please input password',
          trigger: 'blur'
        }
      ]
    }
  ]
  