"use client";

import { useState, useCallback, type ComponentProps } from "react";
import Image from "next/image";

export type ProgressiveImageProps = ComponentProps<typeof Image> & {
  wrapperClassName?: string;
  onRetry?: () => void;
};

export default function ProgressiveImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  priority = false,
  loading,
  decoding = "async",
  onLoad,
  onError,
  onRetry,
  fill,
  ...props
}: ProgressiveImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setStatus("loaded");
      onLoad?.(e);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setStatus("error");
      onError?.(e);
    },
    [onError]
  );

  const handleRetry = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setStatus("loading");
      onRetry?.();
    },
    [onRetry]
  );

  const resolvedLoading = priority ? "eager" : (loading ?? "lazy");

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? "absolute inset-0 h-full w-full" : ""
      } ${wrapperClassName}`}
    >
      {/* Dark Brutalist Skeleton Shimmer */}
      {status !== "loaded" && (
        <div
          aria-hidden="true"
          className={`skeleton-shimmer absolute inset-0 z-0 transition-opacity duration-300 ${
            status === "error" ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Controlled Error Fallback */}
      {status === "error" ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center border border-bone/10 bg-coal p-4 text-center">
          <span className="font-mono text-xs text-ash">Image unavailable</span>
          {alt && (
            <span className="mt-1 line-clamp-1 font-mono text-[10px] text-ash/60">
              {alt}
            </span>
          )}
          {onRetry && (
            <button
              type="button"
              onClick={handleRetry}
              className="mt-2.5 border border-bone/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-bone transition-colors hover:border-blood hover:text-blood"
            >
              Retry
            </button>
          )}
        </div>
      ) : (
        /* Image Element */
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          loading={resolvedLoading}
          decoding={decoding}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ease-out ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
