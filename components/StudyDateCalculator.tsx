"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { useForm } from "react-hook-form";
import { calculatorSchema, CalculatorSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StudyDateCalculator() {
  const form = useForm<CalculatorSchema>({
    resolver: zodResolver(calculatorSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="max-w-[431px] mx-auto w-full flex flex-col items-center">
      <h1 className="font-bold text-[28px]">Study date calculator</h1>
      <p>Enter the starting date and study cohort below</p>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4 w-full mt-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    className="w-full bg-[#723C3117] border-none"
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-[#723C3117] border-none">
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Cohort 1</SelectItem>
                    <SelectItem value="2">Cohort 2</SelectItem>
                    <SelectItem value="3">Cohort 3</SelectItem>
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
      </Form>
    </div>
  );
}
