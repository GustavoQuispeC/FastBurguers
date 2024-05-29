import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { FilesService } from "./files.service";
import { CloudinaryConfig } from "src/config/cloudinary";
import { FileUploadRepository } from "./files.repository";
import { FilesController } from "./files.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    providers: [FilesService, CloudinaryConfig, FileUploadRepository],
    controllers: [FilesController],
})

export class FilesModule {}