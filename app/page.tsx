"use client";

import StudyDateCalculator from "@/components/StudyDateCalculator";
import ResultsTable from "@/components/ResultsTable";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalculatorSchema, calculatorSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ThemeButton from "@/components/ThemeButton";

export default function Home() {
  const [submittedData, setSubmittedData] = useState<{
    cohort: Cohort;
    date: string;
    id?: string;
  } | null>(null);
  const form = useForm<CalculatorSchema>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      date: "",
      cohort: "",
      id: "",
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({
    contentRef: containerRef,
    pageStyle: `
    @page {
      margin: 15mm;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  `,
  });

  const handleEmail = async () => {
    if (!submittedData) {
      toast.error(
        "Please select a date and cohort and click the calculate button"
      );
      return;
    }
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current, { scale: 2 });
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = imageUrl;
    link.click();
    toast.success("Screenshot downloaded successfully");
    window.location.href = `mailto:?subject=${submittedData?.cohort}_${submittedData?.date}`;
  };

  return (
    <>
      <ThemeButton />
      <Form {...form}>
        <div ref={containerRef} className="flex-1 flex flex-col">
          <Header />
          <main>
            <StudyDateCalculator setData={setSubmittedData} />
            <ResultsTable
              onEmail={handleEmail}
              onPrint={() => {
                if (!submittedData) {
                  toast.error(
                    "Please select a date and cohort and click the calculate button"
                  );
                  return;
                }
                reactToPrint();
              }}
              data={submittedData}
            />
          </main>
          <Footer />
        </div>
      </Form>
    </>
  );
}
