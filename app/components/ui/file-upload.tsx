"use client"

import { cn } from "@lib/utils"
import { IconUpload, IconX } from "@tabler/icons-react"
import { motion } from "motion/react"
import { useRef, useState } from "react"
import { useDropzone } from "react-dropzone"

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
}

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

interface FileUploadProps extends React.HTMLAttributes<HTMLInputElement> {
  onFilesChange?: (files: File[]) => void
  multiple?: boolean
  accept?: string
}

export const FileUpload = ({
  onFilesChange,
  multiple = false,
  accept,
  ...props
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: File[]) => {
    if (!newFiles || newFiles.length === 0) return

    const filteredFiles = accept
      ? newFiles.filter((file) => file.type.includes(accept))
      : newFiles

    if (filteredFiles.length === 0) return

    const updatedFiles = multiple
      ? [...files, ...filteredFiles]
      : [filteredFiles[0]]
    setFiles(updatedFiles)
    onFilesChange && onFilesChange(updatedFiles)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange && onFilesChange(updatedFiles)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple,
    noClick: true,
    accept: accept ? { [accept]: [] } : undefined,
    onDrop: handleFileChange,
    onDropRejected: (error) => console.log(error),
  })

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => {
            const selectedFiles = e.target.files
            if (!selectedFiles || selectedFiles.length === 0) return
            handleFileChange(Array.from(selectedFiles))
          }}
          className="hidden"
          required
          {...props}
        />

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.filter(Boolean).map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-zinc-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-300 truncate max-w-xs"
                    >
                      {file?.name}
                    </motion.p>
                    <div className="flex gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="p-1 rounded bg-red-600 hover:bg-red-500"
                      >
                        <IconX className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-neutral-800"
                    >
                      {file?.type}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm bg-neutral-800 text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                </motion.div>
              ))}

            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-zinc-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Jogue o arquivo aqui
                    <IconUpload className="h-4 w-4 text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-red-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
