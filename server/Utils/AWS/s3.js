import aws from "aws-sdk";
import { options } from "joi";


const s3Bucket = new aws.S3({
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    region:"ap-south-1",

});

export const s3Upload = (options) =>{
    return new Promise((resolve,reject)=>{
        s3Bucket.upload(options,(error,data)=>{
            if(error) return reject(error);
            return resolve(data);
        })
    })
}