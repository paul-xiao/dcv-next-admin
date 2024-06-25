import IForm from "./src/index.vue";
import IFormItem from "./src/components/FormItem.vue";
import IFormSelect from "./src/components/IFormSelect.vue";
import IFormUpload from "./src/components/IFormUpload.vue";
import { useForm } from "./src/hooks/useForm";
export type FormInstance = InstanceType<typeof IForm>;
export { IForm, IFormItem, IFormSelect, IFormUpload, useForm };
export default IForm;
