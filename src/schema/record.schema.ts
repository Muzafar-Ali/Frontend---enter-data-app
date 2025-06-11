import { z } from "zod";

export const recordSchema = z.object({
    CNIC: z
    .string({
      required_error: "CNIC is required",
    })
    .regex(/^[0-9]{13}$/, "CNIC must be a 13 digit number"),
});

export type RecordInput = z.infer<typeof recordSchema>;
