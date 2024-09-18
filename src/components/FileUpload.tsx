'use client'

import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Loader2, Upload } from 'lucide-react'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'


const FileUpload =  () => {
    const [uploading, setUploading] = useState(false);
    const mutation = useMutation({
        mutationFn: async ({
            file_key,
            file_name,
        }: {
            file_key: string,
            file_name: string,
        }) => {
            try {
                const response = await axios.post("/api/create-chat", { file_key, file_name });
                return response.data;
            } catch (error) {
                console.error("Error in API call:", error);
                throw new Error("Failed to create chat");
            }
        },
        onError: (error) => {
            toast.error(error.message || "Error creating chat");
        },
        onSuccess: (data) => {
            console.log("Chat created successfully:", data);
            toast.success(data.message);
        }
    })

    const { getRootProps, getInputProps } = useDropzone({
        accept: {'application/pdf': [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles);
            const file = acceptedFiles[0];
            if(file.size > 10*1024*1024){//bigger files size than 10mb
                toast.error("File size is too big");
                return;
            }
            try {
                setUploading(true);
                const data = await uploadToS3(file);

                if (!data?.file_key || !data?.file_name) {
                    toast.error("Error occurred while uploading file to S3");
                    return;
                }

                mutation.mutate(data);
            } catch (error) {
                console.error("Error uploading file to S3:", error);
                toast.error("Error uploading file to S3");
            } finally{
                setUploading(false);
            }
        }
    });
    return (
        <div className='bg-slate-400 rounded-xl p-2'>
            <div {...getRootProps({
                className:"border-dashed border-2 border-slate-100 rounded-xl py-16 cursor-pointer flex justify-center items-center flex-col"
            })}>
                <input {...getInputProps()}/>
                {(uploading || mutation.isPending) ? (
                    <>
                        <Loader2 className='w-10 h-10 text-red-500 animate-spin'/>
                    </>
                ):(
                    <>
                        <Upload className='w-10 h-10 text-slate-500 '/>
                        <p className='mt-2 text-sm '>Drag & drop, or click to select PDF</p>
                    </>
                )}
                
            </div>
        </div>
    )
}

export default FileUpload