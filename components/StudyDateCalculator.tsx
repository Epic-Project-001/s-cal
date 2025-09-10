"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
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
import { DateInput } from "./Input/DateInput";
import { cohortOptions } from "@/lib/data/cohortOptions";
import { add } from "date-fns";

export default function StudyDateCalculator() {
  const form = useFormContext<CalculatorSchema>();

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  console.log(add(form.watch("date"), { days: 1 }));

  return (
    <div className="mx-auto max-w-[431px] px-4 w-full flex my-10 lg:my-20 flex-col items-center">
      <h1 className="font-bold text-[28px]">Study date calculator</h1>
      <p>Enter the starting date and study cohort below</p>
      <form onSubmit={onSubmit} className="space-y-4 w-full mt-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DateInput
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date?.toLocaleString())}
                  className="bg-[#723C3117] border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cohort"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full bg-[#723C3117] border-none">
                    <SelectValue placeholder="Select cohort" />
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
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Participant ID (optional)"
                  className="bg-[#723C3117] border-none"
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
          <Button variant="ghost" className="text-destructive w-full">
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
