import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({default: false})
    isAdmin: boolean;

    @Column({default: false})
    isSuperAdmin: boolean;

    @Column({ type: 'int', nullable: true })
    phone: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    country: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    city: string;
}