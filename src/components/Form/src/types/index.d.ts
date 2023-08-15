export interface FormItem {
  label?: string;
  labelWidth?: string;
  prop: string;
  type?: string;
  span?: number;
  slot?: boolean;
  rules?: any[];
  componentProps?: any;
  change?: Function;
}

export interface SelectOption {
  label?: String;
  value?: String;
}
