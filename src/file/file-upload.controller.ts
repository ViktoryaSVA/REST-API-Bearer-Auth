import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { Multer } from 'multer';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {IFileResult} from "../interfaces/file.interface";

@Controller()
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @UseGuards(JwtAuthGuard)
    @Post('file-upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Multer.File): Promise<IFileResult> {
        return this.fileUploadService.processFile(file);
    }
}
