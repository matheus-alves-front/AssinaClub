import multer from 'multer'
import multerS3 from 'multer-s3'
import crypto from 'crypto'
import { S3 } from "@aws-sdk/client-s3"

export const s3 = new S3({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY || '',
    },
})

export const upload = multer({
    storage: multerS3({
        s3,
        bucket: String(process.env.NEXT_PUBLIC_AWS_BUCKET),
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName)
            })
        },
    }),
})