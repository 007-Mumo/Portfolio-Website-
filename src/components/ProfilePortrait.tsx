import { ImageIcon } from "lucide-react";
import { site } from "@/data/site";

export function ProfilePortrait() {
  return <figure className="w-full max-w-[420px] mx-auto lg:mx-0">
    <div className="profile-frame relative aspect-[4/5] border border-border bg-card overflow-hidden">
      {site.profilePhoto ? <img src={site.profilePhoto} alt={site.name} className="h-full w-full object-cover" /> :
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <ImageIcon size={40} strokeWidth={1} aria-hidden="true" />
          <span className="font-mono text-xs tracking-[0.14em]">PROFILE PHOTO</span>
        </div>}
      <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary" />
      <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-destructive" />
    </div>
    <figcaption className="font-mono text-[10px] sm:text-[11px] text-muted-foreground mt-4 leading-relaxed">ELECTRICAL &amp; ELECTRONICS ENGINEERING</figcaption>
  </figure>;
}
