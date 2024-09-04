'use client'

import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { uploadToS3 } from '@/lib/s3'


const FileUpload = () => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {'application/pdf': [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles);
            const file = acceptedFiles[0];
            if(file.size > 10*1024*1024){//bigger files size than 10mb
                alert('File size exceeds 10MB');
                return;
            }
            try {
                const data = await uploadToS3(file);
                console.log(data);
            } catch (error) {
                console.log(error);
                
            }
        }
    });
    return (
        <div className='bg-slate-400 rounded-xl p-2'>
            <div {...getRootProps({
                className:"border-dashed border-2 border-slate-100 rounded-xl py-16 cursor-pointer flex justify-center items-center flex-col"
            })}>
                <input {...getInputProps()}/>
                <>
                    <Upload className='w-10 h-10 text-slate-500 '/>
                    <p className='mt-2 text-sm '>Drag & drop, or click to select PDF</p>
                </>
            </div>
        </div>
    )
}

export default FileUpload