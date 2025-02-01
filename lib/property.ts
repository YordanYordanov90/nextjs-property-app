import * as z from "zod";

export const propertyFormSchema = z.object({
  name: z.string().min(1, "Property name is required"),
  type: z.string().min(1, "Property type is required"),
  description: z.string().optional(),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().min(5, "Valid zipcode is required"),
  beds: z.number().min(1, "Number of beds is required"),
  baths: z.number().min(1, "Number of baths is required"),
  squareFeet: z.number().min(1, "Square footage is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  nightlyRate: z.number().optional(),
  weeklyRate: z.number().optional(),
  monthlyRate: z.number().optional(),
  sellerName: z.string().optional(),
  sellerEmail: z.string().email().optional(),
  sellerPhone: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
});