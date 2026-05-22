import type { User } from "@hiram/shared";
import { mockItems, mockUserProfiles } from "@hiram/shared";
import {
  ArrowRight,
  Award,
  Bookmark,
  Camera,
  Hash,
  Heart,
  Loader2,
  PlusCircle,
  Trash2,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { BackButton } from "../ui/BackButton";
import { VerifiedBadge } from "../ui/VerifiedBadge";
import { ImageCropModal } from "./ImageCropModal";
import { ItemCard } from "./ItemCard";

interface ProfilePageProps {
  userId?: string;
}

export function ProfilePage({ userId }: ProfilePageProps) {
  const {
    user: currentUser,
    updateAvatar,
    removeAvatar,
    verifyAccount,
  } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"listings" | "saved">("listings");
  const [verifyId, setVerifyId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingImageSrc, setPendingImageSrc] = useState("");
  const [showCropModal, setShowCropModal] = useState(false);

  const isOwnProfile = !userId || userId === currentUser?.id;
  const profileUser: User | null | undefined = isOwnProfile
    ? currentUser
    : mockUserProfiles.find((u) => u.id === userId);

  const getItemSlug = (id: string, title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    id;

  const getOwnerId = (item: (typeof mockItems)[0]): string | undefined =>
    item.ownerId ||
    (typeof item.owner === "object" ? item.owner?.id : undefined);

  // Manage saved items in localStorage, fallback to items '1' and '3' if empty initially
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const stored = localStorage.getItem("hiram_saved_items");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return ["1", "3"];
      }
    }
    const initial = ["1", "3"];
    localStorage.setItem("hiram_saved_items", JSON.stringify(initial));
    return initial;
  });

  if (!profileUser) return null;

  // Filter listings owned by this profile user
  const userListings = mockItems.filter((item) => {
    const itemOwnerId = getOwnerId(item);
    if (itemOwnerId) return itemOwnerId === profileUser.id;
    const ownerName =
      typeof item.owner === "string" ? item.owner : item.owner?.name || "";
    return ownerName.toLowerCase() === profileUser.name.toLowerCase();
  });

  // Filter saved listings (only for own profile)
  const savedListings = mockItems.filter((item) => savedIds.includes(item.id));

  const handleAvatarClick = () => {
    if (!isOwnProfile) return;
    if (currentUser?.avatarUrl) {
      setPendingImageSrc(currentUser.avatarUrl);
      setShowCropModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPendingImageSrc(reader.result);
        setShowCropModal(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    updateAvatar(croppedDataUrl);
    setShowCropModal(false);
    setPendingImageSrc("");
  };

  const handleCropModalClose = () => {
    setShowCropModal(false);
    setPendingImageSrc("");
  };

  const getInitials = (name: string) => {
    return name.trim().charAt(0).toUpperCase();
  };

  const handleUnsave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = savedIds.filter((savedId) => savedId !== id);
    setSavedIds(updated);
    localStorage.setItem("hiram_saved_items", JSON.stringify(updated));
  };

  const handleVerify = async () => {
    if (!verifyId.trim()) return;
    setIsVerifying(true);
    await verifyAccount(verifyId);
    setIsVerifying(false);
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 pt-6 pb-4 w-full flex-grow flex flex-col h-[calc(100vh-120px)] min-h-[650px] max-h-[820px] animate-in fade-in duration-300">
      {/* Floating Back Button */}
      <div className="mb-4 shrink-0 lg:absolute lg:-left-16 lg:top-6 lg:mb-0">
        <BackButton fallbackPath="/" />
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-3xl overflow-hidden">
        {/* Profile Banner Background */}
        <div className="h-32 bg-gradient-to-r from-primary/15 via-primary/5 to-primary/20 shrink-0 relative" />

        {/* Profile Info / Stats Section */}
        <div className="px-8 pb-6 border-b border-neutral-100 bg-white shrink-0 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 -mt-16 relative z-10">
            {/* Profile Avatar */}
            <div
              className={`relative w-28 h-28 shrink-0 ${isOwnProfile ? "cursor-pointer" : ""}`}
            >
              <div
                onClick={handleAvatarClick}
                className={`w-28 h-28 rounded-full border-4 border-white bg-neutral-100 shadow-md overflow-hidden flex items-center justify-center ${isOwnProfile ? "group" : ""}`}
              >
                {profileUser.avatarUrl ? (
                  <img
                    src={profileUser.avatarUrl}
                    alt={profileUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-primary">
                    {getInitials(profileUser.name)}
                  </span>
                )}
                {isOwnProfile && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                    <Camera className="text-white w-6 h-6" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Profile Details */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl font-black text-neutral-900 leading-tight">
                  {profileUser.name}
                </h2>
                {profileUser.studentId && <VerifiedBadge iconSize={22} />}
              </div>
              {/* Verification CTA — only for own profile when unverified */}
              {isOwnProfile && !currentUser?.studentId && (
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Hash size={16} className="shrink-0" />
                    <span className="text-xs font-bold whitespace-nowrap">
                      Verify Student ID:
                    </span>
                  </div>
                  <div className="flex w-full sm:w-auto relative">
                    <input
                      type="text"
                      value={verifyId}
                      onChange={(e) => setVerifyId(e.target.value)}
                      placeholder="e.g. 2021-12345-MN-0"
                      className="w-full sm:w-44 bg-white border border-orange-200 rounded-l-lg py-1.5 px-3 text-xs font-medium focus:outline-none focus:border-orange-400 transition-colors"
                    />
                    <button
                      onClick={handleVerify}
                      disabled={isVerifying || !verifyId.trim()}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-r-lg flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      {isVerifying ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <ArrowRight size={14} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Stats Card */}
          <div className="flex justify-center gap-6 py-2 px-6 rounded-2xl bg-neutral-50 border border-neutral-100/80 self-center md:self-auto shadow-sm">
            <div className="text-center flex flex-col items-center">
              <span className="text-xs text-neutral-400 font-bold flex items-center gap-1 mb-0.5">
                <Award className="w-3.5 h-3.5 text-primary" /> Karma
              </span>
              <span className="text-base font-black text-neutral-800">342</span>
            </div>
            <div className="w-px bg-neutral-200/60 my-1" />
            <div className="text-center flex flex-col items-center">
              <span className="text-xs text-neutral-400 font-bold flex items-center gap-1 mb-0.5">
                <Users className="w-3.5 h-3.5 text-primary" /> Followers
              </span>
              <span className="text-base font-black text-neutral-800">148</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-100 bg-white shrink-0">
          <button
            onClick={() => setActiveTab("listings")}
            className={`flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "listings"
                ? "border-primary text-primary"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            {isOwnProfile ? "My Listings" : "Listings"} ({userListings.length})
          </button>
          {isOwnProfile && (
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === "saved"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Saved Items ({savedListings.length})
            </button>
          )}
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto scrollbar-minimal p-8 bg-neutral-50/20">
          {activeTab === "listings" ? (
            userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userListings.map((item) => (
                  <div key={item.id} onClick={() => navigate(`/items/${getItemSlug(item.id, item.title)}`)}>
                    <ItemCard item={item} simple />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-primary/5 shadow-sm max-w-lg mx-auto">
                <Heart className="w-12 h-12 text-neutral-300 mb-3" />
                <h3 className="font-extrabold text-neutral-700 text-sm">
                  No listings yet
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs font-medium">
                  {isOwnProfile
                    ? "Create a new listing to share resources with your campus community."
                    : "This user has no listings yet."}
                </p>
              </div>
            )
          ) : savedListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedListings.map((item) => (
                <div key={item.id} className="relative group">
                  <ItemCard item={item} hideMeta />
                  <button
                    onClick={(e) => handleUnsave(e, item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-neutral-500 hover:text-red-500 flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100 z-20 cursor-pointer border border-neutral-100"
                    title="Unsave listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-primary/5 shadow-sm max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 text-neutral-300 mb-3" />
              <h3 className="font-extrabold text-neutral-700 text-sm">
                No saved items
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs font-medium">
                Explore shared resources and bookmark listings you want to keep
                track of.
              </p>
            </div>
          )}
        </div>
      </div>
      <ImageCropModal
        imageSrc={pendingImageSrc}
        isOpen={showCropModal}
        hasExistingAvatar={!!currentUser?.avatarUrl}
        onCrop={handleCropComplete}
        onRemove={removeAvatar}
        onClose={handleCropModalClose}
      />
    </div>
  );
}
