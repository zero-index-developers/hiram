import type { Item } from "@hiram/shared";
import { mockUserProfiles } from "@hiram/shared";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { DateLabel, LocationLabel } from "../ui/MetadataRow";
import { TransactionBadge } from "../ui/TransactionBadge";
import { CompactItemImage, DetailItemImage } from "./ItemImage";

interface DiscoverMasterDetailProps {
  filteredItems: Item[];
  selectedItem: Item | undefined;
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
}

export function DiscoverMasterDetail({
  filteredItems,
  selectedItem,
  selectedItemId,
  onSelectItem,
}: DiscoverMasterDetailProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();
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

  const handleRequestClick = () => {
    if (!selectedItem) return;
    if (!isAuthenticated) {
      setAuthModalOpen(true, "login");
    } else {
      const slug =
        selectedItem.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") +
        "-" +
        selectedItem.id;
      window.history.pushState(null, "", `/items/${slug}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Left Master List */}
      <div className="lg:w-2/5 w-full flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-minimal shrink-0">
        {filteredItems.slice(0, 25).map((item) => {
          const isSelected = selectedItemId === item.id;
          const ownerName =
            typeof item.owner === "string"
              ? item.owner
              : item.owner?.name || "Unknown";
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-primary/10 hover:border-primary/30 hover:bg-neutral-50/50 bg-white"
              }`}
            >
              {/* Compact Image */}
              <CompactItemImage src={item.image} title={item.title} />

              {/* Metadata Summary */}
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <TransactionBadge
                    transaction={item.preferredTransaction}
                    compact
                  />
                  <span className="text-[9px] text-neutral-400 font-bold">
                    {item.condition}
                  </span>
                </div>
                <h5
                  className={`font-black text-sm truncate ${isSelected ? "text-primary" : "text-neutral-800"}`}
                >
                  {item.title}
                </h5>
                <span className="text-[10px] text-neutral-400 font-bold truncate">
                  By {ownerName}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Detail Pane */}
      {selectedItem &&
        (() => {
          const detailOwnerId = getOwnerId(selectedItem);
          const ownerProfile = detailOwnerId
            ? useUserStore.getState().users[detailOwnerId]
            : undefined;
          return (
            <div className="flex-1 lg:w-3/5 w-full bg-white border border-primary/20 rounded-2xl overflow-hidden shadow-sm sticky top-32 flex flex-col animate-in fade-in zoom-in-95 duration-200">
              {/* Visual Image Banner */}
              <div className="relative h-64 bg-neutral-50 flex items-center justify-center border-b border-primary/5">
                <DetailItemImage
                  key={selectedItem.id}
                  src={selectedItem.image}
                  title={selectedItem.title}
                />
                <Badge variant="glass" className="absolute top-4 right-4 z-20">
                  {selectedItem.condition}
                </Badge>
              </div>

              {/* Information details */}
              <div className="p-8 flex flex-col gap-6">
                {/* Category & Date Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{selectedItem.category}</Badge>
                  {selectedItem.preferredTransaction && (
                    <TransactionBadge
                      transaction={selectedItem.preferredTransaction}
                    />
                  )}
                  <DateLabel date={selectedItem.createdAt} />
                  <LocationLabel cityCode={selectedItem.cityCode} />
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-2xl font-black text-neutral-900 leading-tight">
                    {selectedItem.title}
                  </h4>
                  <p className="text-neutral-600 text-sm mt-3.5 leading-relaxed font-medium">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Lender Profile Card + CTA */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      const id = getOwnerId(selectedItem);
                      if (id) navigate(`/profile/${id}`);
                    }}
                    className="flex-1 flex items-center justify-between cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={
                          typeof selectedItem.owner === "string"
                            ? selectedItem.owner
                            : selectedItem.owner?.name || "Unknown"
                        }
                        size="md"
                        src={ownerProfile?.avatarUrl ?? undefined}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-neutral-800 flex items-center gap-1">
                          {typeof selectedItem.owner === "string"
                            ? selectedItem.owner
                            : selectedItem.owner?.name || "Unknown"}
                          <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                        </span>
                      </div>
                    </div>
                  </button>

                  <Button
                    onClick={handleRequestClick}
                    variant="primary"
                    className="px-6 py-3 text-sm flex items-center gap-2 font-black shadow-md shadow-primary/10 hover:translate-y-[-1px] active:translate-y-[1px] transition-all shrink-0"
                  >
                    Request <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
