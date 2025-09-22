"use client";

import { Button } from "./ui/button";
import { RiPrinterLine, RiSendPlaneFill } from "react-icons/ri";
import { useRef } from "react";
import { tableData } from "@/lib/data/tableData";
import { CalculatorSchema } from "@/lib/validation";
import { useFormContext } from "react-hook-form";
import { addDays, format, subDays } from "date-fns";

interface ResultTableProps {
  onPrint: () => void;
  onEmail: () => void;
}

const tableHeaders: string[] = ["Number", "Visit name", "Date", "Visit Window"];

const formatDate = (date: Date) => format(date, "dd MMM yyyy");

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="py-2 pr-2 text-[#281D1B] dark:text-[#E4DAD7]">{children}</td>
  );
}

export default function ResultsTable({ onPrint, onEmail }: ResultTableProps) {
  const form = useFormContext<CalculatorSchema>();
  const tableContainerRef = useRef<HTMLTableElement>(null);

  const cohort = form.watch("cohort") as Cohort;
  const date = form.watch("date");

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-end gap-2">
        <Button
          onClick={onEmail}
          variant="secondary"
          className="text-[#2E191466] dark:text-[#EBD5D166] w-[127px]"
        >
          <RiSendPlaneFill
            size={14}
            className="text-[#A49896] dark:text-[#EBD5D166]"
          />
          Email
        </Button>
        <Button variant="destructive" className="w-[127px]" onClick={onPrint}>
          <RiPrinterLine size={14} />
          Print
        </Button>
      </div>
      <div ref={tableContainerRef} className="overflow-x-auto py-6 lg:py-10">
        <table className="w-full table-fixed overflow-x-auto border-collapse divide-y divide-[#6E504933] dark:divide-[#B6979133]">
          <thead>
            <tr>
              {tableHeaders.map((item) => (
                <th
                  key={item}
                  className="font-normal pr-2 py-2 text-left text-[13px] text-[#2E19149E] dark:text-[#EBD5D19E]"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6E504933] dark:divide-[#B6979133]">
            {form.formState.isSubmitSuccessful &&
              tableData[cohort].map((item, index) => {
                const visitDate = addDays(date, item.planned_visit_interval);
                const visitWindow =
                  typeof item.allowed_interval_visit === "number"
                    ? `${formatDate(
                        subDays(visitDate, item.allowed_interval_visit)
                      )} to ${formatDate(
                        addDays(visitDate, item.allowed_interval_visit)
                      )}`
                    : item.allowed_interval_visit;

                return (
                  <tr key={item.interval}>
                    <TableCell>Visit {index + 1}</TableCell>
                    <TableCell>{item.interval}</TableCell>
                    <TableCell>{`${formatDate(visitDate)}`}</TableCell>
                    <TableCell>{visitWindow}</TableCell>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
