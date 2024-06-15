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

    @Column({type: 'varchar', length: 100,nullable:true})
    drink:string

    @Column({ type: 'decimal', precision: 10, nullable:true})
    drinkPrice: number

    @Column({type: 'varchar', length: 100, default:"default"})
    sizeProduct:string
}