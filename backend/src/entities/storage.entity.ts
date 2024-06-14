import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'storage'
})
export class Storage {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    id_user: string

    @Column()
    id_product: string

    @Column()
    quantity: number

}