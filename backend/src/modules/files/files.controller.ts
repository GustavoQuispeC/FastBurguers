import { Controller, HttpStatus, Param, ParseFilePipeBuilder, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuards } from "src/guards/auth.guard";

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
    ) {}
    
    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @UseGuards(AuthGuards)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload image',
        required: true,
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
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