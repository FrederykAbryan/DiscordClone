"use client"

import { UploadDropzone } from '@/lib/uploadthing'
import "@uploadthing/react/styles.css"
import Image from 'next/image'
import { X } from 'lucide-react'

type FileUploadProps = {
    onChange: (url ? : string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}

const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className='relative h-20 w-20'>
        <Image 
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        alt="Upload"
        src={value}
        className='rounded-full'
        />
        <button onClick={() => onChange("")}
        className='bg-rose-500 text-white p-1 rounded-full absolute right-0 top-0 shadow-sm'
        type='button'>
          <X className="absolute right-0 top-0 h-4 w-4" />
        </button>
      </div>
    )
  }
  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
    }}
    onUploadError={(err: Error) => {
        console.error(err)
    }}
    />
  )
}

export default FileUpload