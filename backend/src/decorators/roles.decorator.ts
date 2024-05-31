import { SetMetadata } from "@nestjs/common";
import { Role } from "../enum/roles.enum";

export const Roles = (...arreglo: Role[]) => ( 
    SetMetadata('elRol', arreglo) 
)
