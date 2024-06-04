import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { OrderDetails } from "./orderdetails.entity";
import { Categories } from "./categories.entity";
import { SizeProduct } from "src/enum/sizeProduct.enum";

@Entity({name: 'products'})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 100, nullable: false, unique:true})
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({type: 'int', nullable: false})
    stock: number;

    @Column({type: 'text',default: 'https://www.pngitem.com/pimgs/m/407-4074353_defectos-criticos-de-un-producto-hd-png-download.png'})
    imgUrl?: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    discount: number;

    @Column({ type: 'enum', enum: SizeProduct, default: SizeProduct.PERSONAL })
    size: SizeProduct;

    @ManyToOne(() => Categories, (category) => category.products)
    category: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[];
}