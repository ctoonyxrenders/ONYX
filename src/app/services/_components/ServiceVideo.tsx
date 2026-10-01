// src/app/services/_components/ServiceVideo.tsx
import Image from "next/image";

const FILE_VIDEO = /\.(mp4|webm|ogg)(\?.*)?$/i;

export default function ServiceVideo({
  src,
  poster,
}: {
  src: string | null;
  poster: string;
}) {
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-[#bac3c833]">
      {!src && (
        <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
      )}

      {src && FILE_VIDEO.test(src) && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          preload="metadata"
          playsInline
          poster={poster}
        >
          <source src={src} />
        </video>
      )}

      {src && !FILE_VIDEO.test(src) && (
        <iframe
          src={src}
          title="How we work"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}