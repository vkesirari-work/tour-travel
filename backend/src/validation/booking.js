import { z } from "zod";

const bookingBaseSchema = z.object({
  bookingNumber: z.string().trim().min(3),
  guestName: z.string().trim().min(2),
  email: z.email().optional().or(z.literal("")),
  phone: z.string().trim().min(8),
  packageName: z.string().trim().min(2),
  travelVibe: z.enum(["chill", "peace", "wild", "balanced"]).default("balanced"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  travellers: z.coerce.number().int().min(1).default(2),
  totalAmount: z.coerce.number().min(0),
  amountPaid: z.coerce.number().min(0).default(0),
  status: z.enum(["new-lead", "quoted", "confirmed", "on-trip", "completed", "cancelled"]).default("new-lead"),
  source: z.enum(["website", "whatsapp", "instagram", "referral", "manual"]).default("website"),
  notes: z.string().trim().optional(),
});

export const bookingInputSchema = bookingBaseSchema.refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const bookingUpdateSchema = bookingBaseSchema.partial();
