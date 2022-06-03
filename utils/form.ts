type TranformerFunc = (d: string) => unknown;
type ValidatorFunc = (d: unknown) => Promise<null | string>;

export interface IFieldSchema {
  label: string;
  type?: string;
  req?: true;
  transform?: TranformerFunc;
  validate?: ValidatorFunc;
}
export interface IFormSchema {
  [field: string]: IFieldSchema;
}

export interface IFieldError {
  n: number;
  msg: string;
}
export interface IErrorObject {
  [field: string]: IFieldError;
}

export function transform(
  value: string,
  type: string | undefined,
  func: unknown | undefined
): unknown {
  let transformer: TranformerFunc = (d) => d;
  switch (type) {
    case "number":
      transformer = parseInt;
      break;
    case "timestamp":
      transformer = (d: string): number => new Date(d).getTime();
      break;
    case "custom":
      transformer = <TranformerFunc>func;
      break;
  }
  return transformer(value);
}

export function initErrorObject(...fields: string[]): IErrorObject {
  const obj: IErrorObject = {};
  for (const field of fields) {
    obj[field] = {
      n: 0,
      msg: "",
    };
  }
  return obj;
}

export function setFieldError(
  obj: IErrorObject
): (field: string, msg: string) => void {
  return function (field: string, msg: string) {
    obj[field].n++;
    obj[field].msg = msg;
  };
}
