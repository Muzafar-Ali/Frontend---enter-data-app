import { z } from "zod";

export const userLoginSchema = z.object({
  district: z.string().min(1, 'username is required'),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

// export const recordSchema = z.object({
//   district: z.string().min(1, 'username is required'),
//   police_station: z.string().min(1, 'username is required'),
//   crime: z.string().min(1, 'username is required'),
//   operated_by: z.string().min(1, 'username is required'),
//   CNIC: z.string().min(1, 'username is required'),
//   dens_location: z.string().min(1, 'username is required'),
//   cell_number: z.string().min(1, 'username is required'),
//   by_police: z.object({
//     name: z.string().min(1, 'username is required'),
//     rank: z.string().min(1, 'username is required'),
//     posting: z.string().min(1, 'username is required'),
//   }).optional(),
//   by_political_person: z.object({
//     details: z.string().min(1, 'username is required'),
//   }).optional(),
//   by_others_private: z.object({
//     details: z.string().min(1, 'username is required'),
//   }).optional(),
//   status: z.string().min(1, 'username is required'),
//   CRMS_No: z.string().min(1, 'username is required'),
//   FIR: z.object({
//     FIR_no: z.string().min(1, 'username is required'),
//     FIR_year: z.string().min(1, 'username is required'),
//     FIR_PS: z.string().min(1, 'username is required'),
//     FIR_district: z.string().min(1, 'username is required'),
//   }).optional(),
// })

export type UserLoginInput = z.infer<typeof userLoginSchema>
// export type RecordInput = z.infer<typeof recordSchema>