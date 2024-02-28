export const loginSchema = [
    {
      prop: 'email',
      labelWidth: '0',
      componentProps: {
        placeholder: '用户名'
      },
      rules: [
        {
          required: true,
          message: '请输入用户名',
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
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    }
  ]
  