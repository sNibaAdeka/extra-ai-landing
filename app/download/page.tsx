import type { Metadata } from "next";
import { DownloadExperience } from "./DownloadExperience";

export const metadata: Metadata = {
  title: "Download Extra AI — macOS and Windows",
  description: "Choose the Extra AI desktop installer for macOS or Windows.",
};

export default function DownloadPage() {
  return <DownloadExperience />;
}
