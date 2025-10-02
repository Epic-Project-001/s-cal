"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { CalculatorSchema } from "@/lib/validation";
import { cohortOptions } from "@/lib/data/cohortOptions";

interface StudyDateCalculatorProps {
  setData: (data: { cohort: Cohort; date: string; id?: string }) => void;
}

export default function StudyDateCalculator({
  setData,
}: StudyDateCalculatorProps) {
  const form = useFormContext<CalculatorSchema>();

  const onSubmit = form.handleSubmit((data) => {
    setData({ ...data, cohort: data.cohort as Cohort });
  });

  return (
    <div className="mx-auto max-w-[1000px] px-4 w-full flex my-10 lg:my-20 flex-col items-cente">
      <div className="mx-auto max-w-[431px] px-4 w-full flex my-10 lg:my-20 flex-col items-center">
        <h1 className="font-bold text-[28px]">Study Visit Date Calculator</h1>
        <p className="text-sm text-gray-500 text-center text-balance mt-4">
          Select the study Phase and enter the start date for that Phase. This
          will generate a list of dates for <strong>future visits</strong>{" "}
          factoring in visit windows.
        </p>
        <form onSubmit={onSubmit} className="space-y-4 w-full mt-8">
          <FormField
            control={form.control}
            name="cohort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phase</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-[#723C3117] border-none">
                      <SelectValue placeholder="Select Phase" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cohortOptions.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label} Phase
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              const cohort = form.watch("cohort"); // watch selected cohort

              let dateLabel = "Start Date";
              if (cohort === "randomized_intervention") {
                dateLabel = "Start date for Day 1 Baseline";
              } else if (cohort === "ati") {
                dateLabel = "Start date for Day 1A";
              } else if (cohort === "follow_up") {
                dateLabel = "Start date for Day 1F";
              }

              return (
                <FormItem>
                  <FormLabel>{dateLabel}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      placeholder="Date"
                      className="bg-[#723C3117] border-none block"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participant ID (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Participant ID (optional)"
                    className="bg-[#723C3117] border-none"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 6) {
                        value = value.slice(0, 6);
                      }
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 items-center mt-8">
            <Button variant="destructive" type="submit" className="w-full">
              Calculate
            </Button>
            <Button
              onClick={() => form.reset({})}
              variant="ghost"
              className="text-destructive w-full"
              type="button"
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
      <p className="text-sm text-gray-500 text-center text-balance mb-8">
        <strong>Disclaimer:</strong> This study visit calculator is provided as
        a supplementary tool to assist with scheduling in accordance with the
        study Protocol (and any Amendments thereto). It is intended for
        convenience only and does not replace, override, or supersede the
        Protocol or associated study documents. In the event of any
        discrepancies between this tool and the Protocol, the Protocol and
        sponsor guidance take precedence. Users are responsible for ensuring
        compliance with the Protocol and for verifying all visit schedules
        accordingly. Based on protocol 221794 dated 20 Mar 2025.
      </p>
    </div>
  );
}
