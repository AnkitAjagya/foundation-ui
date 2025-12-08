import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Upload, X, File, Image as ImageIcon, FileText } from "lucide-react";
import { Button } from "./button";

const fileUploadVariants = cva(
  "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-input hover:border-primary hover:bg-primary/5 bg-muted/30",
        ghost: "border-transparent hover:border-input hover:bg-muted/50",
        glass:
          "border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10",
      },
      size: {
        sm: "p-4 min-h-[120px]",
        default: "p-6 min-h-[160px]",
        lg: "p-8 min-h-[200px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">,
    VariantProps<typeof fileUploadVariants> {
  onFilesChange?: (files: File[]) => void;
  value?: File[];
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  preview?: boolean;
  error?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      variant,
      size,
      onFilesChange,
      value = [],
      maxFiles = 5,
      maxSize = 5 * 1024 * 1024, // 5MB default
      acceptedTypes,
      preview = true,
      error,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    };

    const handleFiles = (files: File[]) => {
      const validFiles = files.filter((file) => {
        if (maxSize && file.size > maxSize) return false;
        if (acceptedTypes && !acceptedTypes.some((type) => file.type.match(type))) return false;
        return true;
      });

      const newFiles = [...value, ...validFiles].slice(0, maxFiles);
      onFilesChange?.(newFiles);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      handleFiles(files);
      e.target.value = "";
    };

    const removeFile = (index: number) => {
      const newFiles = value.filter((_, i) => i !== index);
      onFilesChange?.(newFiles);
    };

    const getFileIcon = (file: File) => {
      if (file.type.startsWith("image/")) return <ImageIcon className="h-5 w-5" />;
      if (file.type.includes("pdf")) return <FileText className="h-5 w-5" />;
      return <File className="h-5 w-5" />;
    };

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
      <div className="space-y-3">
        <div
          className={cn(
            fileUploadVariants({ variant, size, className }),
            isDragging && "border-primary bg-primary/10 scale-[1.02]",
            error && "border-destructive",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={handleInputChange}
            multiple={maxFiles > 1}
            accept={acceptedTypes?.join(",")}
            disabled={disabled}
            {...props}
          />

          <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
            <div className="rounded-full bg-primary/10 p-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {acceptedTypes ? acceptedTypes.join(", ") : "Any file type"} •{" "}
                Max {formatFileSize(maxSize)}
              </p>
            </div>
          </div>
        </div>

        {/* File previews */}
        {preview && value.length > 0 && (
          <div className="space-y-2 animate-fade-in">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 group"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-muted text-muted-foreground">
                    {getFileIcon(file)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

export { FileUpload, fileUploadVariants };
