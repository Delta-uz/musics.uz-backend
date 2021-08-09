import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException, UploadedFile, Body, Req, UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from "path";
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes, ApiCookieAuth,
  ApiCreatedResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = file.fieldname + "_" + uniqueSuffix;
        const filepath = filename + extname(file.originalname).toLowerCase()
        req.body.filename = filename;
        req.body.filepath = filepath;
        cb(null, filepath);
      }
    }),
    limits: { files: 1 },
    fileFilter: (req, file, cb) => {
      const validFileTypes = /mp3|ogg|wav/;
      const isValid = validFileTypes.test(extname(file.originalname).toLowerCase());

      if(isValid === true) {
        return cb(null, true);
      }
      return cb(new BadRequestException('File type is not acceptable!'), null);
    }
  }))
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'New file',
    type: FileUploadDto
  })
  @ApiCreatedResponse({
    description: 'File has been uploaded successfully'
  })
  @ApiBadRequestResponse({
    description: 'File is not acceptable'
  })
  create(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All the files returned'
  })
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':filename')
  @ApiOkResponse({
    description: 'File has been found and returned'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that file'
  })
  findOne(@Param('filename') filename: string, @Req() request: Request) {
    return this.filesService.findOne(filename);
  }

  @Delete(':filename')
  @UseGuards(JwtAuthenticationGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiOkResponse({
    description: 'File has been deleted'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that file'
  })
  remove(@Param('filename') filename: string) {
    return this.filesService.remove(filename);
  }
}
