import {ICategory,IErrorCategory} from "@/interfaces/ICategory";

export function formCategoryValidation(values: ICategory): IErrorCategory {
  let errors: IErrorCategory = {
    name: "",
  };

  if (!values.name.trim()) {
    errors.name = "El campo nombre es requerido";
  }

  return errors;
}