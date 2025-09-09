import { z } from "zod";

export const calculatorSchema = z.object({
  date: z.string().min(1, "Date is required"),
  cohort: z.string().min(1, "Cohort is required"),
  id: z.optional(z.string()),
});

export type CalculatorSchema = z.infer<typeof calculatorSchema>;
