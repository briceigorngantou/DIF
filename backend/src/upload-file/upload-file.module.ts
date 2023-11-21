import { FirebaseService } from './firebase/firebase.service';
import { Module, UnsupportedMediaTypeException } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports: [
    AuthModule,
    FirebaseModule.forRoot({
      googleApplicationCredential: `${process.cwd()}/service-account-credentials.json`,
    }),
    MulterModule.register({
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|pdf)$/)) {
          return cb(
            new UnsupportedMediaTypeException(
              'Only image files and pdf files are allowed!',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService, FirebaseService],
})
export class UploadFileModule {}
