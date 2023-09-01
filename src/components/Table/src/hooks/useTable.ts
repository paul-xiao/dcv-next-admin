import { AxiosResponse } from 'axios';
import { ref, unref } from 'vue';
import { ITableColumn, ITableSearch, ITableConf, IPageProps, UseTableReturnType } from '../types';
export interface ITableProps {
  title: string;
  conf?: ITableConf;
  api?: (params?: any) => Promise<AxiosResponse<any, any>>;
  schema: ITableColumn[];
  search?: ITableSearch;
  page: IPageProps | boolean;
}

export function useTable(props: ITableProps): UseTableReturnType {
  const tableRef = ref<any>(null);

  // 注册
  const register = instance => {
    instance.setProps(props);
    tableRef.value = instance;
  };

  function reload() {
    unref(tableRef)?.onLoad();
  }
  // methods
  const methods = {
    reload,
    add: () => unref(tableRef)?.handleAdd(),
  };

  return [register, methods];
}
