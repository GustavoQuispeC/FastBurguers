import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Categories } from "./categories.entity";
import { SizeProduct } from "src/enum/sizeProduct.enum";
import { ProductRating } from "./productrating.entity";
import { OrderDetailsProducts } from "./ordersdetailsProduct.entity";

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

    @Column({default:true})
    condition: boolean;

    @Column({default:false})
    is_deleted: boolean;

    @ManyToOne(() => Categories, (category) => category.products)
    category: Categories;

    @OneToMany(() => OrderDetailsProducts, (orderDetailsProducts) => orderDetailsProducts.products)
    orderDetailsProducts: OrderDetailsProducts[];

    @OneToMany(() => ProductRating, (productRatings) => productRatings.product)
    productRatings: ProductRating;
}