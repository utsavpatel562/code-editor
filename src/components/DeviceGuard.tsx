"use client";

import { useEffect, useState } from "react";
import { Laptop } from "lucide-react";
import Image from "next/image";

export default function DeviceGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsAllowed(window.innerWidth >= 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Prevent hydration mismatch
  if (isAllowed === null) return null;

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur p-8 text-center shadow-xl">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800">
            <Laptop className="h-7 w-7 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-white mb-3">
            Laptop or PC Required
          </h1>

          {/* Description */}
          <p className="text-gray-400 mb-6">
            This code editor is optimized for larger screens and cannot be
            accessed on mobile or tablet devices.
          </p>

          {/* Image */}
          <Image
            src="/block.png"
            alt="Access Blocked"
            width={160}
            height={160}
            className="mx-auto mb-6 opacity-90"
            priority
          />

          {/* Highlight Message */}
          <div className="rounded-lg bg-yellow-300/90 px-4 py-3 text-sm font-semibold text-gray-900">
            Please open this on a laptop or desktop computer.
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
