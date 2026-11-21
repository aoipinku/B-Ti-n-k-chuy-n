import { useState } from "react";
import { BookOpen } from "lucide-react";

interface StoryImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export function StoryImage({ src, alt, className = "", caption }: StoryImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#151e38] to-slate-950 text-amber-200/80 p-8 text-center ${className}`}
      >
        <BookOpen className="w-8 h-8 mb-3 opacity-70" />
        <p className="font-display text-sm">{caption || alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
