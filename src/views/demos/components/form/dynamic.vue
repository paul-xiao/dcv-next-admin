<template>
  <div class="p-5">
    <IForm @register="registerForm" @submit="onSubmit"> </IForm>
  </div>
</template>
<script lang="ts" setup>
  import { useForm, IForm } from '@/components/Form';
  const schema = [
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
      label: '缩略图',
      prop: 'thumbnail',
      span: 12,
      rules: [
        {
          required: true,
          message: '请输入缩略图',
          trigger: 'blur',
        },
      ],
    },
    {
      label: '正文',
      prop: 'content',
      slot: true,
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
      label: '标签',
      prop: 'tags',
      type: 'select',
      span: 12,
      componentProps: {
        options: [
          {
            label: 'JS',
            value: 'JS',
          },
        ],
      },
      rules: [
        {
          required: true,
          message: '请输入标题',
          trigger: 'blur',
        },
      ],
    }
  ];
  const [registerForm, { setValues }]: any = useForm({
    labelWidth: 100,
    foot: true,
    schema,
  });

  function onSubmit(form) {
    setValues();
  }
</script>
