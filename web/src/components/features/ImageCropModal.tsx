import { RotateCw, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";

interface ImageCropModalProps {
  imageSrc: string;
  isOpen: boolean;
  hasExistingAvatar: boolean;
  isUploading?: boolean;
  onCrop: (croppedDataUrl: string) => void | Promise<void>;
  onRemove: () => void;
  onClose: () => void;
}

export function ImageCropModal({
  imageSrc,
  isOpen,
  hasExistingAvatar,
  isUploading = false,
  onCrop,
  onRemove,
  onClose,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    onCrop(dataUrl);
    setIsProcessing(false);
  }, [croppedAreaPixels, imageSrc, onCrop]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="text-lg font-black text-neutral-900">Crop Photo</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cropper */}
        <div className="relative w-full h-80 bg-neutral-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom & Rotate Controls */}
        <div className="flex items-center justify-center gap-6 px-6 py-3 border-b border-neutral-100">
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-bold text-neutral-500 w-12 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <div className="w-px h-6 bg-neutral-200" />
          <button
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
            title="Rotate"
          >
            <RotateCw size={16} />
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => {
              onRemove();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            {hasExistingAvatar ? "Remove current" : "Cancel"}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-bold rounded-full border border-primary/10 bg-white text-neutral-700 hover:bg-primary/5 hover:text-primary transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={createCroppedImage}
              disabled={isProcessing || isUploading}
              className="px-6 py-2 text-sm font-bold rounded-full bg-primary text-white hover:bg-primary/95 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing
                ? "Saving..."
                : isUploading
                  ? "Uploading..."
                  : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
