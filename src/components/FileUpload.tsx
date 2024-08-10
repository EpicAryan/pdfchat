'use client'

import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

const FileUpload = () => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {'application/pdf': [".pdf"]},
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
        }
    });
    return (
        <div className='bg-slate-400 rounded-xl p-2'>
            <div {...getRootProps({
                className:"border-dashed border-2 border-slate-100 rounded-xl py-8 cursor-pointer flex justify-center items-center flex-col"
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