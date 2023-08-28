import { unref } from 'vue';
export function useDescription(conf: IDescrition) {
  const descRef = ref();
  // 绑定 Ref
  function register(instance) {
    console.log(instance);

    descRef.value = instance;

    conf && instance.setDescSchema(conf.schema);
  }

  async function getDesc() {
    const desc = unref(descRef);
    if (!desc) {
      console.error(
        'The desc instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      );
    }
    await nextTick();
    return desc as any;
  }
  // set data
  const hooks: any = {
    setDescData: async data => {
      const desc = await getDesc();
      desc?.setDescData(data);
    },
  };

  return [register, { ...hooks }];
}
