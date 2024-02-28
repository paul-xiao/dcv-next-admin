export const loginSchema = [
    {
      prop: 'userName',
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
      prop: 'passWord',
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
    },
    {
      prop: 'verifyCode',
      labelWidth: '0',
      componentProps: {
        placeholder: '验证码'
      },
      rules: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ]
    }
  ]
  