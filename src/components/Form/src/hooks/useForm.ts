import { AxiosResponse } from 'axios';
import { nextTick, ref, unref } from 'vue';
import { FormProps } from '../types';

export function useForm(props: FormProps) {
  const { schema, ...rest } = props;
  const formRef = ref<any>();

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      );
    }
    await nextTick();
    return form as any;
  }
  // 注册
  const register = instance => {
    instance.setProps(rest);
    instance.getSchema(schema);
    formRef.value = instance;
  };

  // methods
  const methods = {
    validate: async () => {
      const form = await getForm();
      return form.validate();
    },
    setValues: async values => {
      const form = await getForm();
      form.setDefautValues(values);
    },
  };

  return [register, methods];
}
