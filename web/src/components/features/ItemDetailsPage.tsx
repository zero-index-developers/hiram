import type { Item } from "@hiram/shared";
import { mockItems, mockUserProfiles } from "@hiram/shared";
import { CheckCircle2, ShieldCheck, MoreHorizontal, Edit2, Flag } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";
import { PageLayout } from "../layout/PageLayout";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { LogoSymbol } from "../ui/Logo";
import { DateLabel, LocationLabel } from "../ui/MetadataRow";
import { TransactionBadge } from "../ui/TransactionBadge";
import { VerifiedBadge } from "../ui/VerifiedBadge";
import { Popover } from "../ui/Popover";
import { ItemRequestsList } from "./ItemRequestsList";
import { RequestProposalForm } from "./RequestProposalForm";
import { AddItemModal } from "./AddItemModal";

interface ItemDetailsPageProps {
  slug: string;
}

export function ItemDetailsPage({ slug }: ItemDetailsPageProps) {
  const item = useMemo(() => {
    const parts = slug.split("-");
    const id = parts[parts.length - 1];
    return mockItems.find((i) => i.id === id) ?? null;
  }, [slug]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const navigate = useNavigate();

  const getOwnerId = (item: Item): string | undefined =>
    item.ownerId ||
    (typeof item.owner === "object" ? item.owner?.id : undefined) ||
    mockUserProfiles.find(
      (u) =>
        u.name.toLowerCase() ===
        (typeof item.owner === "string"
          ? item.owner
          : item.owner?.name || ""
        ).toLowerCase(),
    )?.id;
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showItemMenu, setShowItemMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [proposalDetails, setProposalDetails] = useState<{
    duration: string;
    tradeOffer: string;
    meetupLoc: string;
    meetupTime: string;
  } | null>(null);

  const ownerId = item ? getOwnerId(item) : undefined;
  const ownerProfile = useUserStore((s) =>
    ownerId ? s.users[ownerId] : undefined,
  );
  const currentUser = useAuthStore((s) => s.user);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-24 text-center">
        <h2 className="text-2xl font-black text-neutral-800">Item Not Found</h2>
        <p className="text-neutral-500 mt-2">
          The item you are looking for does not exist or has been removed.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="mt-6"
          variant="primary"
        >
          Back to Discover
        </Button>
      </div>
    );
  }

  const ownerName =
    typeof item.owner === "string" ? item.owner : item.owner?.name || "Unknown";
  const ownerIsVerified =
    typeof item.owner !== "string" && !!item.owner?.studentId;
  const isOwner = currentUser?.id === ownerId;

  const handleProposalSubmitSuccess = (details: {
    duration: string;
    tradeOffer: string;
    meetupLoc: string;
    meetupTime: string;
  }) => {
    setProposalDetails(details);
    setRequestSubmitted(true);
  };

  return (
    <PageLayout backTo="/">
      <div className="flex-1 min-h-0">
        <div className="h-full p-6 lg:p-10 text-left">
          {requestSubmitted ? (
            /* Success Screen */
            <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 mb-6">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                  Request Submitted!
                </h2>
                <p className="text-neutral-500 text-sm mt-3 leading-relaxed max-w-md mx-auto">
                  Your request for{" "}
                  <span className="font-bold text-neutral-800">
                    "{item.title}"
                  </span>{" "}
                  has been sent to{" "}
                  <span className="font-bold text-neutral-800">
                    {ownerName}
                  </span>
                  . They will be notified to review and approve your proposal.
                </p>

                <div className="mt-8 border border-neutral-100 rounded-2xl p-6 bg-neutral-50/50 text-left space-y-3.5 max-w-md mx-auto text-xs">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="font-bold text-neutral-400 uppercase">
                      Transaction Mode
                    </span>
                    <span className="font-bold text-primary">
                      {item.preferredTransaction}
                    </span>
                  </div>
                  {item.preferredTransaction === "HIRAM" && (
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="font-bold text-neutral-400 uppercase">
                        Requested Duration
                      </span>
                      <span className="font-bold text-neutral-700">
                        {proposalDetails?.duration} Days
                      </span>
                    </div>
                  )}
                  {item.preferredTransaction === "TRADE" && (
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="font-bold text-neutral-400 uppercase">
                        Offered Items
                      </span>
                      <span className="font-bold text-neutral-700">
                        {proposalDetails?.tradeOffer || "N/A"}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="font-bold text-neutral-400 uppercase">
                      Meetup Point
                    </span>
                    <span className="font-bold text-neutral-700">
                      {proposalDetails?.meetupLoc}
                    </span>
                  </div>
                  {proposalDetails?.meetupTime && (
                    <div className="flex justify-between">
                      <span className="font-bold text-neutral-400 uppercase">
                        Proposed Time
                      </span>
                      <span className="font-bold text-neutral-700">
                        {proposalDetails?.meetupTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <Button onClick={() => navigate("/")} variant="primary">
                    Discover More Items
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Details & Request Split Layout */
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Left Column: Media & Product Info */}
              <div className="w-full lg:w-3/5 space-y-8">
                {/* Image display */}
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-primary/10 bg-neutral-50 flex items-center justify-center shadow-sm">
                  {item.image && !imgError ? (
                    <>
                      {!imgLoaded && (
                        <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
                          <LogoSymbol size="xl" className="text-primary/10" />
                        </div>
                      )}
                      <img
                        src={item.image}
                        alt={item.title}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                        className={`w-full h-full object-cover transition duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-neutral-400 gap-2 w-full h-full py-20 bg-neutral-50/50">
                      <LogoSymbol size="xl" className="text-neutral-200" />
                      <span className="text-xs font-bold tracking-wider uppercase opacity-60">
                        No Image Available
                      </span>
                    </div>
                  )}
                  <Badge
                    variant="glass"
                    className="absolute top-4 right-4 z-10"
                  >
                    {item.condition}
                  </Badge>
                </div>{" "}
                {/* Title & Metadata */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Badge variant="outline">{item.category}</Badge>
                      {item.preferredTransaction && (
                        <TransactionBadge transaction={item.preferredTransaction} />
                      )}
                      <DateLabel date={item.createdAt} />
                      <LocationLabel cityCode={item.cityCode} />
                    </div>

                    {/* Item Actions */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowItemMenu(true)}
                        className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors cursor-pointer"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      <Popover 
                        isOpen={showItemMenu} 
                        onClose={() => setShowItemMenu(false)}
                        width="w-48"
                      >
                        <div className="px-1.5 flex flex-col gap-0.5">
                          {isOwner ? (
                            <button 
                              className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors text-left dropdown-item cursor-pointer w-full"
                              onClick={() => { setShowItemMenu(false); setShowEditModal(true); }}
                            >
                              <Edit2 size={16} /> Edit Item
                            </button>
                          ) : (
                            <button 
                              className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left settings-link-rose cursor-pointer w-full"
                              onClick={() => { setShowItemMenu(false); alert('Report feature coming soon!'); }}
                            >
                              <Flag size={16} /> Report Item
                            </button>
                          )}
                        </div>
                      </Popover>
                    </div>
                  </div>
                  <h1 className="text-3xl font-black text-neutral-900 tracking-tight leading-tight">
                    {item.title}
                  </h1>
                  <p className="text-neutral-600 text-base leading-relaxed font-medium whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
                {/* Owner Details Card */}
                <button
                  onClick={() => {
                    const id = getOwnerId(item);
                    if (id) navigate(`/profile/${id}`);
                  }}
                  className="w-full border border-primary/10 rounded-2xl p-5 bg-neutral-50/30 flex items-center justify-between hover:bg-primary/5 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      name={ownerName}
                      size="lg"
                      src={ownerProfile?.avatarUrl ?? undefined}
                    />
                    <div>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                        Lender
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-neutral-800">
                          {ownerName}
                        </span>
                        {ownerIsVerified && <VerifiedBadge iconSize={16} />}
                      </div>
                    </div>
                  </div>
                  {ownerIsVerified && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">
                      <ShieldCheck size={14} /> Campus Verified
                    </div>
                  )}
                </button>
              </div>

              {/* Right Column: Request Proposal Form or Item Requests List */}
              <div className="w-full lg:w-2/5">
                {currentUser?.id === ownerId ? (
                  /* Show Item Requests List if user is the owner */
                  <ItemRequestsList itemName={item.title} />
                ) : (
                  /* Show Request Form if user is not the owner */
                  <RequestProposalForm
                    item={item}
                    onSubmitSuccess={handleProposalSubmitSuccess}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <AddItemModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} />
    </PageLayout>
  );
}
