"use client";

import { Button } from "./ui/button";
import { RiPrinterLine, RiSendPlaneFill } from "react-icons/ri";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { toast } from "sonner";

interface Data {
  name: string;
  count: string;
  date: string;
  window: string;
}

interface TableHeader {
  label: string;
  key: keyof Data;
}

const data: Data[] = Array.from({ length: 10 }, (_, index) => ({
  name: "Screening",
  count: `Visit ${index + 1}`,
  date: "2021-01-01",
  window: "01 Jan 2025 to 05 Jan 2025",
}));

const tableHeaders: TableHeader[] = [
  { label: "Vist name", key: "name" },
  { label: "Visit", key: "count" },
  { label: "Date", key: "date" },
  { label: "Visit Window", key: "window" },
];

export default function ResultsTable() {
  const tableContainerRef = useRef<HTMLTableElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef: tableContainerRef });

  const handleDownload = async () => {
    if (!tableContainerRef.current) return;
    const canvas = await html2canvas(tableContainerRef.current, { scale: 2 });
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
    <div className="flex-1">
      <div className="flex justify-end gap-2 px-4 lg:px-6 xl:px-15">
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="text-[#2E191466] w-[127px]"
        >
          <RiSendPlaneFill size={14} className="text-[#A49896]" />
          Email
        </Button>
        <Button
          variant="destructive"
          className="w-[127px]"
          onClick={reactToPrintFn}
        >
          <RiPrinterLine size={14} />
          Print
        </Button>
      </div>

      <div
        ref={tableContainerRef}
        className="overflow-x-auto px-4 lg:px-6 xl:px-15 py-6 lg:py-10"
      >
        <table className="w-full table-fixed overflow-x-auto border-collapse divide-y divide-[#6E504933]">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="font-normal py-2 text-left text-[13px] text-[#2E19149E]"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6E504933]">
            {data.map((item, index) => (
              <tr key={item.name + index}>
                {tableHeaders.map((header) => (
                  <td className="py-4 text-[#281D1B]" key={header.key}>
                    {item[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
