import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import toStream = require("buffer-to-stream");

@Injectable()
export class FileUploadRepository {
    async uploadImage(
        file: Express.Multer.File,
    ) : Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if(error) return reject(error);
                    resolve(result);
                });
            toStream(file.buffer).pipe(upload)
        });
    }
}