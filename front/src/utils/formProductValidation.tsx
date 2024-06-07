import {IProductProps, IProducErrorProps} from '../interfaces/IProduct';

export function validateProductForm(values: IProductProps): IProducErrorProps {
    let errors: IProducErrorProps = {
      name: "",
        description: "",
        price: "",
        stock: "",
        imgUrl: "",
        discount: "",
        categoryID: "",
    };
    if (!values.name) {
        errors.name = "Nombre es requerido";
    }
    if (!values.description) {
        errors.description = "Descripción es requerida";
    }
    if (!values.price) {
        errors.price = "Precio es requerido";
    }
    if (!values.stock) {
        errors.stock = "Stock es requerido";
    }
    if (!values.imgUrl) {
        errors.imgUrl = "Imagen es requerida";
    }
    if (!values.discount) {
        errors.discount = "Descuento es requerido";
    }
    if (!values.categoryID) {
        errors.categoryID = "Categoría es requerida";
    }
    return errors;
}
  
    
  
 