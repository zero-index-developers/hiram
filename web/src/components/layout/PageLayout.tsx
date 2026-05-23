import { BackButton } from "../ui/BackButton";

interface PageLayoutProps {
  children: React.ReactNode;
  backTo?: string;
}

export function PageLayout({ children, backTo = "/" }: PageLayoutProps) {
  return (
    <div className="relative max-w-5xl mx-auto px-4 pt-12 pb-12 w-full flex-grow flex flex-col h-[calc(100vh-120px)] min-h-[650px] max-h-[820px] animate-in fade-in duration-300">
      <div className="mb-4 shrink-0 lg:absolute lg:-left-16 lg:top-12 lg:mb-0">
        <BackButton fallbackPath={backTo} />
      </div>
      {children}
    </div>
  );
}
