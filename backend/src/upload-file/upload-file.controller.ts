import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnsupportedMediaTypeResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UploadFileService } from "./upload-file.service";

@Controller("upload-file")
export class UploadFileController {
  constructor(private readonly fileService: UploadFileService) {}

  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiOperation({
    summary: "upload single file to storage",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      properties: {
        status: {
          type: "string",
          default: "failed",
        },
        code: {
          default: 500,
          type: "number",
        },
        message: {
          type: "string",
          default: "INTERNAL SERVER ERROR",
        },
        error: {
          type: "string",
          default: "Internal Server Error",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body
  ) {
    return await this.fileService.uploadSingleFile(file);
  }
}
