"use client";

import StudyDateCalculator from "@/components/StudyDateCalculator";
import ResultsTable from "@/components/ResultsTable";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalculatorSchema, calculatorSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

export default function Home() {
  const form = useForm<CalculatorSchema>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      date: "",
      cohort: "",
      id: "",
    },
  });

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
    <Form {...form}>
      <div
        ref={containerRef}
        className="min-h-screen p-4 lg:py-6 xl:p-15 flex flex-col"
      >
        <Header />
        <StudyDateCalculator />
        <ResultsTable onEmail={handleEmail} onPrint={reactToPrint} />
        <Footer />
      </div>
    </Form>
  );
}
