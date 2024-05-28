import { Controller, HttpStatus, Param, ParseFilePipeBuilder, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
    ) {}
    
    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile(
        new ParseFilePipeBuilder()
        .addMaxSizeValidator({
            maxSize: 300000,
            message: 'El archivo es muy largo, el tamaño maximo es de 200KB',
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    ) file: Express.Multer.File) {
        return this.filesService.uploadImage(file, productId);
    }

}