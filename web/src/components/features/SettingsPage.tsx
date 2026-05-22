import {
  CheckCircle2,
  Hash,
  Loader2,
  LogOut,
  Mail,
  Monitor,
  Moon,
  Settings,
  ShieldCheck,
  ShieldX,
  Sliders,
  Sun,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import { animateThemeToggle } from "../../utils/themeAnimation";
import { TabBar } from "../ui/TabBar";

type Tab = "account" | "preferences";

const tabs: { key: Tab; label: string; icon: typeof Settings }[] = [
  { key: "account", label: "Account", icon: Settings },
  { key: "preferences", label: "Preferences", icon: Sliders },
];

export function SettingsPage() {
  const { user, isLoading, verifyAccount, unverifyAccount, logout } =
    useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [verifyId, setVerifyId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [unverifyConfirm, setUnverifyConfirm] = useState(false);

  const handleVerify = async () => {
    if (!verifyId.trim()) return;
    setIsVerifying(true);
    const success = await verifyAccount(verifyId.trim());
    setIsVerifying(false);
    if (success) setVerifyId("");
  };

  const handleUnverify = async () => {
    await unverifyAccount();
    setUnverifyConfirm(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-0 w-full max-w-4xl mx-auto px-4 py-8 flex-grow animate-in fade-in duration-300">
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onChange={(key) => setActiveTab(key as Tab)}
        variant="vertical"
      />

      <div className="flex-1 min-w-0">
        {activeTab === "account" ? (
          <div className="max-w-2xl space-y-8">
            <section>
              <h3 className="text-sm font-black text-neutral-800 mb-4">
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <Mail size={18} className="text-neutral-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-bold text-neutral-800 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <User size={18} className="text-neutral-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Name
                    </p>
                    <p className="text-sm font-bold text-neutral-800 truncate">
                      {user?.name}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-black text-neutral-800 mb-4">
                Campus Verification
              </h3>
              {user?.studentId ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <ShieldCheck
                      size={20}
                      className="text-emerald-500 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-emerald-600">
                        Verified Account
                      </p>
                      <p className="text-[11px] text-emerald-600 font-medium">
                        ID: {user.studentId}
                      </p>
                    </div>
                    <button
                      onClick={() => setUnverifyConfirm(true)}
                      className="shrink-0 p-1.5 rounded-lg text-rose-500 settings-btn-rose transition-colors cursor-pointer"
                    >
                      <ShieldX size={16} />
                    </button>
                  </div>
                  {unverifyConfirm && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-rose-700">
                        Are you sure? This will remove your campus verification
                        status.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={handleUnverify}
                          disabled={isLoading}
                          className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1"
                        >
                          {isLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <XCircle size={14} />
                          )}
                          Yes, Remove
                        </button>
                        <button
                          onClick={() => setUnverifyConfirm(false)}
                          className="px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-600 text-xs font-bold hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl p-4">
                  <Hash size={16} className="text-orange-500 shrink-0" />
                  <span className="text-xs font-bold text-orange-700 whitespace-nowrap">
                    Verify Student ID:
                  </span>
                  <div className="flex w-full sm:w-auto">
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
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-r-lg flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isVerifying ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="pt-4 flex justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs font-bold text-neutral-500 bg-white px-3 py-2 rounded-xl settings-link-rose transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </section>
          </div>
        ) : (
          <div className="max-w-2xl space-y-8">
            <section>
              <h3 className="text-sm font-black text-neutral-800 mb-4">
                Appearance
              </h3>
              <ThemeSelector />
            </section>
            <section>
              <h3 className="text-sm font-black text-neutral-800 mb-4">
                Notifications
              </h3>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <p className="text-xs font-bold text-neutral-400">
                  Notification preferences coming soon.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

const themeOptions: {
  mode: "light" | "dark" | "system";
  icon: typeof Sun;
  label: string;
}[] = [
  { mode: "light", icon: Sun, label: "Light" },
  { mode: "dark", icon: Moon, label: "Dark" },
  { mode: "system", icon: Monitor, label: "System" },
];

function ThemeSelector() {
  const { mode, setMode } = useThemeStore();

  return (
    <div className="grid grid-cols-3 gap-3">
      {themeOptions.map((opt) => {
        const isActive = mode === opt.mode;
        const Icon = opt.icon;
        return (
          <button
            key={opt.mode}
            onClick={(e) =>
              animateThemeToggle(e.currentTarget as HTMLElement, () =>
                setMode(opt.mode),
              )
            }
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              isActive
                ? "border-primary bg-primary/5 text-primary"
                : "border-neutral-100 bg-neutral-50 text-neutral-500 hover:border-neutral-200 hover:text-neutral-700"
            }`}
          >
            <Icon size={22} />
            <span className="text-xs font-bold">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
