import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'storage'
})
export class Storage {
    @PrimaryGeneratedColumn('uuid')
    id: string;


}