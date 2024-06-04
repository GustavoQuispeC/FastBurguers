import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'testimony'})
export class Testimony {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ type: 'varchar', length: 50, nullable: false })
name: string;

@Column({ type: 'varchar', length: 50, unique: true, nullable: false })
email: string;

@Column({ type: 'text', nullable: false })
description: string;

@Column({ type: 'varchar', length: 5, nullable: false })
punctuation: string;

}