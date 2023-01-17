// import { diskStorage } from "multer";
// import {v4 as uuidv4} from 'uuid';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

// const fs = require('fs');
// const FileType = require('file-type');

// import path = require('path');
// import { filter } from "rxjs";

// type validFileExtension = "png" | "jpg" | 'jpeg';
// type validMimeType = "image/png" | "image/jpg" | 'image/jpeg';

// const validFileExtensions: validFileExtension[] = ["png", "jpg", "jpeg"];
// const validMimeTypes: validMimeType[] = ["image/png", "image/jpg", "image/jpeg"];

// export const saveImageToStorage = {
//     storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//             const fileExnsion: string = path.extname(file.originalname);
//             const fileName: string = uuidv4()+fileExnsion

//             cb(null, fileName)
//         },


//     }),
//     filter: (req, file, cb) => {
//         const allowedMimeTypes: validMimeType[] = validMimeTypes
//         allowedMimeTypes.includes(file.mimeType) ? cb(null, true) : cb(null, false)
//     }
// }

export const imageFileFilter = (req: any, file, cb) => {
    const fileExtName = path.extname(file.originalname);
    if (['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(fileExtName)) {
        cb(null, true);
    } else {

        return cb(new HttpException('Only Image Files are Aloowed!', HttpStatus.BAD_REQUEST), false);
    }
}

export const editFileName = (req: any, file, cb) => {
    const name = uuid.v4();
    const fileExtName = path.extname(file.originalname);
    const dir = `./uploads`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')

    cb(null, `${name}-${randomName}${fileExtName}`)
}