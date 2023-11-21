import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

import * as dotenv from "dotenv";

dotenv.config();

type FilePayload = {
  folder_name: string;
  file: string;
  file_type: "images" | "documents";
  buffer: Buffer;
};
@Injectable()
export class FirebaseService {
  constructor(@InjectFirebaseAdmin() readonly firebase: FirebaseAdmin) {}

  async createFiles(payload: FilePayload) {
    try {
      const bucket: string = process.env.FIREBASE_BUCKET_URL;
      const file_id = this.firebase.storage
        .bucket(bucket)
        .file(`${payload.folder_name}/${payload.file}`);

      const fileResponse = file_id.createWriteStream().end(payload.buffer);

      // return fileResponse.on("finish", () => {
      return `https://firebasestorage.googleapis.com/v0/b/digitalinnovationfestival.appspot.com/o/${payload.folder_name}%2F${payload.file}?alt=media`;
      // console.log(url);
      // return url;
      // });
    } catch (error) {
      return new InternalServerErrorException(JSON.stringify(error));
    }
  }
}
