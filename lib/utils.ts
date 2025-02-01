import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getPublicIdFromUrl(url: string): string | null {
  
  const parts = url.split("/property-listings/");
  if (parts.length < 2) return null; 
  
  const afterFolder = parts[1]; 
  // 2. Remove the file extension
  const fileName = afterFolder.split(".")[0]; 
  
  
  return `property-listings/${fileName}`;
}