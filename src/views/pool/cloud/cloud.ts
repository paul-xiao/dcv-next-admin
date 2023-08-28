import { getCloudTypeList } from '@/api/common';

export const searchSchema = [
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '云商',
    prop: 'cloudType',
    type: 'select',
    componentProps: {
      api: getCloudTypeList,
      props: { label: 'val', value: 'key' },
    },
  },
];
export const schema = [
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '池区域',
    prop: 'cloudRegionName',
  },
  {
    label: '云商',
    isTag: true,
    prop: 'cloudTypeString',
  },
  {
    label: '云类型',
    isTag: true,
    prop: 'cloudBusTypeString',
  },
  {
    label: '创建时间',
    prop: 'createTimeString',
  },
];

export const FormSchema = [
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '云商',
    prop: 'cloudType',
    type: 'select',
    componentProps: {
      api: getCloudTypeList,
      props: { label: 'val', value: 'key' },
    },
  },
];
export const DetailSchema = [
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '池区域',
    prop: 'cloudRegionName',
  },
  {
    label: '云商',
    isTag: true,
    prop: 'cloudTypeString',
  },
  {
    label: '云类型',
    isTag: true,
    prop: 'cloudBusTypeString',
  },
  {
    label: '创建时间',
    prop: 'createTimeString',
  },
];
