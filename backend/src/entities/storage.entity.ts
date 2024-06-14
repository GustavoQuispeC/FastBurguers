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

    @Column()
    quantity: number

}