import { SizeProduct } from "src/enum/sizeProduct.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'storage'
})
export class Storage {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    idUser: string

    @Column()
    idProduct: string

    @Column({ type: 'enum', enum: SizeProduct})
    productSize:SizeProduct

    @Column()
    quantity: number
}