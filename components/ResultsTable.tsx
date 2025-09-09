import { Button } from "./ui/button";
import { RiPrinterLine, RiSendPlaneFill } from "react-icons/ri";

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
  console.log(data);
  return (
    <div className="flex-1">
      <div className="flex justify-end gap-2">
        <Button variant="secondary" className="text-[#2E191466] w-[127px]">
          <RiSendPlaneFill size={14} className="text-[#A49896]" />
          Email
        </Button>
        <Button variant="destructive" className="w-[127px]">
          <RiPrinterLine size={14} />
          Print
        </Button>
      </div>
      <table className="w-full table-fixed overflow-x-auto border-collapse mt-10 divide-y divide-[#6E504933]">
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
  );
}
