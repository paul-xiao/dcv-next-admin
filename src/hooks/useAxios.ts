// useAxios.js
import { ref } from 'vue';
import axios, { AxiosRequestConfig } from 'axios';

export default function useAxios(url: string, options: AxiosRequestConfig<any> | undefined) {
  const data = ref(null);
  const error = ref();
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await axios.get(url, options);
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
}
