import { list as catalogList } from '@/api/catalog';
import { upload, getDict } from '@/api/common';

export const tableSchema: any[] = [
  {
    label: '标题',
    prop: 'title',
  },
  {
    label: '缩略图',
    prop: 'thumbnail',
    slot: true,
  },
  {
    label: '分组',
    prop: 'catalogName',
  },
  {
    label: '标签',
    prop: 'tags',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
];
export const searchSchema: any[] = [
  {
    label: '标题',
    prop: 'title',
  },
  {
    label: '标签',
    prop: 'tags',
  },
  {
    label: '分组',
    type: 'select',
    componentProps: {
      clearable: true,
      filterable: true,
      api: catalogList,
      props: {
        label: 'name',
        value: 'id',
      },
    },
    prop: 'catalogId',
  },
];

export const formSchema: any[] = [
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
    type: 'upload',
    componentProps: {
      httpRequest: upload, // 自定义上传
    },
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
    label: '分类',
    prop: 'catalogId',
    type: 'select',
    componentProps: {
      clearable: true,
      filterable: true,
      api: catalogList,
      props: {
        label: 'name',
        value: 'id',
      },
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请选择分类',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '标签',
    prop: 'tags',
    type: 'select',
    componentProps: {
      multiple: true,
      clearable: true,
      filterable: true,
      allowCreate: true,
      // apiParams: {
      //   code: 'catalogId',
      // },
      api: () => {
        return getDict({ code: 'tag' });
      },
      props: {
        label: 'name',
        value: 'name',
      },
    },
    span: 12,
    rules: [
      {
        required: true,
        message: '请选择分类',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '内容',
    prop: 'content',
    span: 12,
    slot: true,
    rules: [
      {
        required: true,
        message: '请输入内容',
        trigger: 'blur',
      },
    ],
  },
];
