import {
  ITEM_CATEGORIES,
  ITEM_CONDITIONS,
  PROGRAM_TAGS,
  TRANSACTION_TYPES,
} from "@hiram/shared";
import { Image, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { Modal } from "../ui/Modal";
import { Select, type SelectOption } from "../ui/Select";
import { AlertBanner } from "../ui/AlertBanner";
import { ModalFooter } from "../ui/ModalFooter";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const toOptions = (items: { slug: string; name: string }[]): SelectOption[] =>
  items.map((i) => ({ value: i.slug, label: i.name }));

const CATEGORY_OPTIONS = toOptions(ITEM_CATEGORIES);
const CONDITION_OPTIONS = toOptions(ITEM_CONDITIONS);
const TRANSACTION_OPTIONS = toOptions(TRANSACTION_TYPES);
const PROGRAM_OPTIONS = toOptions(PROGRAM_TAGS);

export function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [program, setProgram] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim() || title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters";
    if (!description.trim() || description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters";
    if (!category) newErrors.category = "Please select a category";
    if (!condition) newErrors.condition = "Please select a condition";
    if (!transactionType)
      newErrors.transactionType = "Please select a transaction type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageDataUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setCondition("");
    setTransactionType("");
    setProgram("");
    setImageDataUrl("");
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <div className="px-8 pt-8 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/5 p-2.5 rounded-xl border border-primary/10">
            <Plus size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black text-neutral-900 tracking-tight">
              List a New Item
            </h2>
            <p className="text-neutral-500 text-sm mt-0.5">
              Share your item with the campus community
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {errors.title ||
          errors.description ||
          errors.category ||
          errors.condition ||
          errors.transactionType ? (
            <AlertBanner title="Please fill the required fields"><ul className="mt-1 list-disc list-inside">{Object.values(errors).map((err, i) => (<li key={i}>{err}</li>))}</ul></AlertBanner>
          ) : null}

          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. HP Prime Graphing Calculator"
              className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-neutral-50/50 text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item — condition, what's included, any special notes..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-neutral-50/50 text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-1.5">
                Category
              </label>
              <Select
                value={category}
                onChange={setCategory}
                options={CATEGORY_OPTIONS}
                placeholder="Select category"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-1.5">
                Condition
              </label>
              <Select
                value={condition}
                onChange={setCondition}
                options={CONDITION_OPTIONS}
                placeholder="Select condition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-1.5">
                Transaction Type
              </label>
              <Select
                value={transactionType}
                onChange={setTransactionType}
                options={TRANSACTION_OPTIONS}
                placeholder="Select type"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-1.5">
                Program (optional)
              </label>
              <Select
                value={program}
                onChange={setProgram}
                options={PROGRAM_OPTIONS}
                placeholder="Select program"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-1.5">
              Image (optional)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-36 rounded-xl border-2 border-dashed border-primary/10 bg-neutral-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center overflow-hidden group"
            >
              {imageDataUrl ? (
                <>
                  <img
                    src={imageDataUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-bold">
                      Click to change
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors cursor-pointer border-2 border-white z-10"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-400">
                  <Image size={28} />
                  <p className="text-xs font-bold">Click to upload an image</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <ModalFooter onCancel={handleClose} onConfirm={handleSubmit} confirmLabel="List Item" />
      </div>
    </Modal>
  );
}
