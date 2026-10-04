"use client";

import { useState } from "react";

type Props = {
  /** Two photos to toggle between: [primary, alternate]. */
  photos: readonly [string, string];
  name: string;
};

/**
 * Profile photo that swaps to the alternate shot on click/tap/keyboard.
 * Both images stay mounted and stacked, so they load up front and the swap
 * is just an opacity fade with no network wait or flicker.
 */
export function ProfilePhoto({ photos, name }: Props) {
  const [showAlt, setShowAlt] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowAlt((v) => !v)}
      aria-pressed={showAlt}
      aria-label={`Switch ${name}'s profile photo`}
      className="relative block size-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crt"
    >
      {photos.map((src, i) => {
        const visible = (i === 1) === showAlt;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            // Only the visible photo is announced; the button label covers the action.
            alt={visible ? name : ""}
            aria-hidden={!visible}
            loading="eager"
            decoding="async"
            draggable={false}
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-300 motion-reduce:transition-none ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </button>
  );
}
