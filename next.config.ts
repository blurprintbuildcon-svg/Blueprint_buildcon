import type { NextConfig } from "next";
import fs from "node:fs";

// Normalize Windows process.cwd() to exact filesystem casing
// to prevent multiple React module instances from being loaded due to casing differences.
if (process.platform === "win32") {
  try {
    const nativeCwd = fs.realpathSync.native(process.cwd());
    if (nativeCwd !== process.cwd()) {
      process.chdir("C:\\");
      process.chdir(nativeCwd);
    }
  } catch { }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER:
      process.env.Whatsup_Number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9561186693",
  },
};

export default nextConfig;
