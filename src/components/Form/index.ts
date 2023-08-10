import IForm from "./src/index.vue";
import IFormItem from "./src/components/FormItem.vue";
import ISelect from "./src/components/Select.vue";
import IUpload from "./src/components/Upload.vue";
import { useForm } from "./src/hooks/useForm";
export type FormInstance = InstanceType<typeof IForm>;
export { IForm, IFormItem, ISelect, IUpload, useForm };
export * from "./src/types/index.d";
export default IForm;
