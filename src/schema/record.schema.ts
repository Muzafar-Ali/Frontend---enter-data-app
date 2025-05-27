import { z } from "zod";

const byPoliceSchema = z.object({
  name: z.string().optional(),
  rank: z.string().optional(),
  posting: z.string().optional(),
})
.optional()
.refine((data) => {
  // if by_police is undefined or empty object, that's ok
  if (!data) return true;

  const filledFields = [data.name, data.rank, data.posting].filter(Boolean);

  // if no field filled, it's okay (empty optional)
  if (filledFields.length === 0) return true;

  // if some fields filled, all must be filled (length must be 3)
  return filledFields.length === 3;
}, {
  message: "All By Police Fields are required",
});

const FIRSchema = z.object({
    FIR_no: z.string().optional(),
    FIR_year: z.string().optional(),
    FIR_PS: z.string().optional(),
    FIR_district: z.string().optional(),
  })
  .optional()
  .refine((data) => {
    if (!data) return true; // All of FIR is optional
    const filled = [data.FIR_no, data.FIR_year, data.FIR_PS, data.FIR_district].filter(Boolean);
    if (filled.length === 0) return true; // All empty is valid
    return filled.length === 4; // All must be filled if any is
  }, {
    message: "All FIR fields are required",
  });


export const recordSchema = z.object({
  district: z.string().min(1, "District is required"),
  police_station: z.string().min(1, "Police station is required"),
  crime: z.string().min(1, "Crime is required"),
  operated_by: z.string().min(1, "Operated by is required"),
  CNIC: z
    .string()
    .regex(/^[0-9]{13}$/, "CNIC must be a 13-digit number"),
  dens_location: z.string().min(1, "Dens location is required"),
  cell_number: z.string().min(1, "Mobile number is required"),
  by_police: byPoliceSchema,
  by_political_person: z.object({
    details: z.string().optional(),
  }),
  by_others_private: z.object({
    details: z.string().optional(),
  }),
  status: z.string({
    required_error: "Status is required"
  })
  .refine(val => ['Active', 'Inactive', 'Reactive'].includes(val), {
    message: 'Enter "Active", "Inactive", or "Reactive"',
  }), 
  CRMS_No: z.string().optional(),
  FIR: FIRSchema
});

export type RecordInput = z.infer<typeof recordSchema>;
