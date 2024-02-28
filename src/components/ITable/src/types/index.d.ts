export type DefaultRow = any;
export interface ITableOptionProps {
  conf: ITableConf;
  columns: ITableColumn[];
}
export interface ITableConf {
  addBtn?: boolean;
  editBtn?: boolean;
  viewBtn?: boolean;
  delBtn?: boolean;
  batchDel?: boolean;
  stripe?: boolean;
  border?: boolean;
  height?: string | number | undefined;
  fixed?: boolean;
  size?: 'small';
  optWidth?: string | number;
}
export interface ITableColumn {
  id?: string;
  prop: string;
  label: string;
  width?: string;
  slot?: boolean;
  formslot?: boolean;
  rules?: any[];
}
export interface IPageProps {
  current?: number;
  size?: number;
  total?: number;
}
export interface ITableSearch {
  schema?: any;
}

export interface TableProps<T> {
  data: T[];
  option: any;
  page: IPageProps;
  modelValue: String | Object;
}
// export interface TableActionType {
//   reload: (opt?: any) => Function<void>;
// }

export type RegisterFn = (tableInstance: any) => void;

export type UseTableReturnType = [RegisterFn, TableActionType];
