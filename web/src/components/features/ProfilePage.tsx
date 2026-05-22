import { mockItems, mockUserProfiles } from "@hiram/shared";
import axios from "axios";
import {
  Award,
  Bookmark,
  Camera,
  Heart,
  PlusCircle,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
import { PageLayout } from "../layout/PageLayout";
import { EmptyState } from "../ui/EmptyState";
import { TabBar } from "../ui/TabBar";
import { VerifiedBadge } from "../ui/VerifiedBadge";
import { ImageCropModal } from "./ImageCropModal";
import { ItemCard } from "./ItemCard";
import { VerifyStudentId } from "./VerifyStudentId";

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
  const storeUser = useUserStore((s) => userId ? s.users[userId] : undefined);
  const profileUser = isOwnProfile
    ? currentUser
    : storeUser ?? mockUserProfiles.find((u) => u.id === userId) ?? null;

  // Fetch other user's profile from API to get updated avatar
  useEffect(() => {
    if (!userId || isOwnProfile) return;
    const token = useAuthStore.getState().token;
    axios.get(`${API_URL}/users/${userId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }).then((res) => {
      useUserStore.getState().setUser(res.data);
    }).catch(() => {
      // Ignore API error — rely on mock data
    });
  }, [userId, isOwnProfile]);

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
    <PageLayout backTo="/">
      <div className="flex-1 min-h-0 bg-white rounded-3xl overflow-hidden flex flex-col">
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
                <VerifyStudentId
                  verifyId={verifyId}
                  setVerifyId={setVerifyId}
                  onVerify={handleVerify}
                  isVerifying={isVerifying}
                />
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

        <TabBar
          tabs={[
            {
              key: "listings",
              label: `${isOwnProfile ? "My" : ""} Listings (${userListings.length})`,
              icon: PlusCircle,
            },
            ...(isOwnProfile
              ? [
                  {
                    key: "saved",
                    label: `Saved Items (${savedListings.length})`,
                    icon: Bookmark,
                  },
                ]
              : []),
          ]}
          activeTab={activeTab}
          onChange={(key) => setActiveTab(key as "listings" | "saved")}
        />

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto scrollbar-minimal p-8">
          {activeTab === "listings" ? (
            userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userListings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      navigate(`/items/${getItemSlug(item.id, item.title)}`)
                    }
                  >
                    <ItemCard item={item} simple />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Heart}
                title="No listings yet"
                description={
                  isOwnProfile
                    ? "Create a new listing to share resources with your campus community."
                    : "This user has no listings yet."
                }
              />
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
            <EmptyState
              icon={Bookmark}
              title="No saved items"
              description="Explore shared resources and bookmark listings you want to keep track of."
            />
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
    </PageLayout>
  );
}
