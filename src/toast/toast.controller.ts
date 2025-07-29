import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ToastService } from './toast.service';
import { CreateToastDto } from './dto/create-toast.dto';
import { UpdateToastDto } from './dto/update-toast.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('toast')
export class ToastController {
  constructor(private readonly toastService: ToastService) {}

  @Post()
  create(@Body() createToastDto: CreateToastDto) {
    return this.toastService.create(createToastDto);
  }

  @Get()
  findAll() {
    return this.toastService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toastService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToastDto: UpdateToastDto) {
    return this.toastService.update(+id, updateToastDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toastService.remove(+id);
  }

  // upload.controller.ts

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // 파일 저장 경로
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // 파일 확장자
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Image uploaded successfully',
      filename: file.filename,
      url: `/uploads/${file.filename}`, // 접근 가능한 URL
    };
  }
}
