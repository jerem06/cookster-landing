"use client";

import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  profileUrl?: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) =>
        url.profileUrl ? (
          <a
            key={index}
            href={url.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="h-10 w-10 bg-background rounded-full border-2 border-gray-800"
              src={url.imageUrl}
              width={40}
              height={40}
              alt={`Avatar ${index + 1}`}
            />
          </a>
        ) : (
          <Image
            key={index}
            className="h-10 w-10 bg-background rounded-full border-2 border-gray-800"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        )
      )}
      {(numPeople ?? 0) > 0 && (
        <a className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black">
          +{numPeople}
        </a>
      )}
    </div>
  );
};

export default AvatarCircles;
