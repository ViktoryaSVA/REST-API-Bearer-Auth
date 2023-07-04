import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Multer } from 'multer';
import { File } from './entities/file.entity';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import {IFileResult} from "../interfaces/file.interface";

@Injectable()
export class FileUploadService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) {}

    async processFile(file: Multer.File): Promise<IFileResult> {
        try {
            if (!file) {
                return { error: 'No file uploaded!' };
            }

            const maxFileSize = 10 * 1024 * 1024;
            if (file.size > maxFileSize) {
                throw new Error('File size exceeds the maximum limit');
            }

            const fileExtension = file.originalname.split('.').pop().toLowerCase();
            if (fileExtension !== 'csv') {
                throw new Error('Invalid file format. Only CSV files are allowed');
            }

            const tableType = this.detectTableType(file);
            switch (tableType) {
                case 'custom':
                    const customDir = join(process.cwd(), 'path', 'to', 'custom');
                    await mkdir(customDir, { recursive: true });

                    const filePathCustom = join(customDir, file.originalname);
                    await fs.promises.writeFile(filePathCustom, file.buffer);

                    return { message: 'File uploaded successfully to the directory', filePath: filePathCustom, type: tableType };
                case 'tableType2':
                    const savedFileTableType2 = await this.fileRepository.save({
                        filename: file.originalname,
                        tableType: 'tableType2',
                        filePath: file.originalname,
                    });

                    return { message: 'File uploaded successfully to the DB', fileId: savedFileTableType2.id };
                default:
                    throw new Error('Invalid table type');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    private detectTableType(file: Multer.File): string {
        if (file.buffer.includes('filename') && file.buffer.includes('filePath')) {
            return 'custom';
        }

        if (file.buffer.includes('filename') && file.buffer.includes('tableType')) {
            return 'tableType2';
        }

        return 'unknown';
    }

}
