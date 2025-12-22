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
      // Laptop / PC only (>= 1024px)
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 px-6 text-center">
        <div className="max-w-md">
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
            Laptop or PC Required <Laptop className="w-7 h-7" />
          </h1>
          <p className="text-gray-400 text-lg font-semibold">
            You cannot access this code editor on a phone or tablet.
          </p>
          <Image
            src={"/block.png"}
            width={"100"}
            height={"100"}
            alt="Block"
            className="w-40 h-40 my-3 m-auto"
          />
          <p className="text-gray-800 text-lg font-semibold bg-yellow-200 p-2 rounded-md">
            Please open this on a laptop or desktop computer.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
