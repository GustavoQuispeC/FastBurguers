import { InsertErrorProductProps, InsertProductProps } from "@/interfaces/IProduct";


export function insertProductValidation(values: InsertProductProps): InsertErrorProductProps {
  let errors: InsertErrorProductProps = {
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    size: "",
    discount: "",
    categoryID: "",
  };

  if (!values.name.trim()) {
    errors.name = "El campo nombre es requerido";
  } else if (!values.description.trim()) {
    errors.description = "El campo descripción es requerido";
  } else if (!values.price) {
    errors.price = "El campo precio es requerido";
  } else if (!values.stock) {
    errors.stock = "El campo stock es requerido";
  } else if (!values.imgUrl) {
    errors.imgUrl = "El campo imagen es requerido";
  } else if (!values.size.trim()) {
    errors.size = "El campo tamaño es requerido";
  } else if (!values.discount) {
    errors.discount = "El campo descuento es requerido";
  } else if (!values.categoryID.trim()) {
    errors.categoryID = "El campo categoría es requerido";
  }

  return errors;
}