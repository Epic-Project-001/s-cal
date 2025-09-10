"use client";

import Calculator from "@/components/StudyDateCalculator";
import ResultsTable from "@/components/ResultsTable";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({ contentRef: containerRef });

  const handleEmail = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current, { scale: 2 });
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = imageUrl;
    link.click();
    toast.success("Screenshot downloaded successfully");
    window.location.href =
      "mailto:someone@example.com?subject=See attached screenshot";
  };

  return (
    <div ref={containerRef} className="grow flex flex-col">
      <Calculator />
      <ResultsTable onEmail={handleEmail} onPrint={reactToPrint} />
    </div>
  );
}
