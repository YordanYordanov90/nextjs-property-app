"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { revalidatePath } from "next/cache";
import { getPublicIdFromUrl } from "@/lib/utils";

export async function getAllProperties() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
}

export const getSingleProperty = async (id: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      ownerId: true,
      owner:{
        select:{
          clerkId: true
        }
      },
      name: true,
      type: true,
      description: true,
      street: true,
      city: true,
      state: true,
      zipcode: true,
      images: true,
      beds: true,
      baths: true,
      squareFeet: true,
      amenities: true,
      monthlyRate: true,
      weeklyRate: true,
      nightlyRate: true,
      sellerName: true,
      sellerEmail: true,
      sellerPhone: true,
    },
  });
  return property;
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryResponse = {
  secure_url: string;
};

export async function addProperty(formData: FormData) {
  try {
    // Get the authenticated user
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to add a property");
    }

    // Get the clerk user's database ID
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //image uploads
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<CloudinaryResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                folder: "property-listings",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryResponse);
              }
            )
            .end(buffer);
        }
      );

      imageUrls.push(result.secure_url);
    }

    //  amenities
    const amenities = formData.getAll("amenities") as string[];

    // Create the property
    await prisma.property.create({
      data: {
        ownerId: user.id,
        name: formData.get("name") as string,
        type: formData.get("type") as string,
        description: formData.get("description") as string,
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipcode: formData.get("location.zipcode") as string,
        beds: parseInt(formData.get("beds") as string),
        baths: parseInt(formData.get("baths") as string),
        squareFeet: parseInt(formData.get("square_feet") as string),
        amenities: amenities,
        nightlyRate: formData.get("rates.nightly")
          ? parseInt(formData.get("rates.nightly") as string)
          : null,
        weeklyRate: formData.get("rates.weekly")
          ? parseInt(formData.get("rates.weekly") as string)
          : null,
        monthlyRate: formData.get("rates.monthly")
          ? parseInt(formData.get("rates.monthly") as string)
          : null,
        sellerName: formData.get("sellerName") as string,
        sellerEmail: formData.get("sellerEmail") as string,
        sellerPhone: formData.get("sellerPhone") as string,
        images: imageUrls,
      },
    });
    console.log("Property added successfully");

    return { success: true };
  } catch (error) {
    console.log("Error adding property:", error);
    throw error;
  }
}

export async function findUserProperties() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be logged in to access your properties.");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found in database.");
  }

  const properties = await prisma.property.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
}

export async function deleteProperty(propertyId: string) {
  // 1) Ensure the user is logged in
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be logged in to delete a property.");
  }

  // 2) Find the user in your DB (assuming you store clerkId -> user table)
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) {
    throw new Error("User not found in the database.");
  }

  // 3) Check the property belongs to that user
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  const images = property?.images as string[]; // array of secure_urls

  // For each URL, parse out the public_id
  for (const url of images) {
    const publicId = getPublicIdFromUrl(url);
    if (!publicId) continue;
    await cloudinary.uploader.destroy(publicId);
  }

  if (!property) {
    throw new Error("Property not found.");
  }
  if (property.ownerId !== user.id) {
    return {
      success: false,
      error: "You are not authorized to delete this property.",
    };
  }

  // 4) Delete the property
  await prisma.property.delete({
    where: { id: propertyId },
  });

  return { success: true };
}

export async function updateProperty(propertyId: string, formData: FormData) {
  try {
    // 1) Ensure the user is logged in
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to update a property.");
    }

    // 2) Find the user in your DB
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error("User not found in the database.");
    }

    // 3) Check the property belongs to that user
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new Error("Property not found.");
    }
    if (property.ownerId !== user.id) {
      return {
        success: false,
        error: "You are not authorized to update this property.",
      };
    }

    // 4) Collect new data from formData
    const newName = formData.get("name") as string;
    const newType = formData.get("type") as string;
    const newDescription = formData.get("description") as string;
    const newStreet = formData.get("location.street") as string;
    const newCity = formData.get("location.city") as string;
    const newState = formData.get("location.state") as string;
    const newZip = formData.get("location.zipcode") as string;
    const newBeds = parseInt(formData.get("beds") as string, 10);
    const newBaths = parseInt(formData.get("baths") as string, 10);
    const newSqFt = parseInt(formData.get("square_feet") as string, 10);

    const amenities = formData.getAll("amenities") as string[];

    const newNightly =
      formData.get("rates.nightly") !== null
        ? parseInt(formData.get("rates.nightly") as string, 10)
        : null;
    const newWeekly =
      formData.get("rates.weekly") !== null
        ? parseInt(formData.get("rates.weekly") as string, 10)
        : null;
    const newMonthly =
      formData.get("rates.monthly") !== null
        ? parseInt(formData.get("rates.monthly") as string, 10)
        : null;

    const newSellerName = formData.get("sellerName") as string;
    const newSellerEmail = formData.get("sellerEmail") as string;
    const newSellerPhone = formData.get("sellerPhone") as string;

    // 5) Handle image uploads IF new images were provided
    const imageFiles = formData.getAll("images") as File[];
    let imageUrls = property.images; // keep old images by default

    // If the user uploaded new images, overwrite the old ones
    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      const newUploads: string[] = [];

      for (const file of imageFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryResponse>(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "auto",
                  folder: "property-listings",
                },
                (error, res) => {
                  if (error) reject(error);
                  else resolve(res as CloudinaryResponse);
                }
              )
              .end(buffer);
          }
        );

        newUploads.push(result.secure_url);
      }

      imageUrls = newUploads; // Overwrite existing images with new ones
    }

    // 6) Update the property in Prisma
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        name: newName,
        type: newType,
        description: newDescription,
        street: newStreet,
        city: newCity,
        state: newState,
        zipcode: newZip,
        beds: newBeds,
        baths: newBaths,
        squareFeet: newSqFt,
        amenities: amenities,
        nightlyRate: newNightly,
        weeklyRate: newWeekly,
        monthlyRate: newMonthly,
        sellerName: newSellerName,
        sellerEmail: newSellerEmail,
        sellerPhone: newSellerPhone,
        images: imageUrls,
      },
    });

    console.log("Property updated successfully");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating property:", error);
    return { success: false, error: error.message };
  }
}



export async function bookmarkProperty(propertyId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not logged in" };
  }

  // 1) Find user in DB
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) {
    return { success: false, error: "User not found" };
  }

  // 2) Find property
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  if (!property) {
    return { success: false, error: "Property not found" };
  }

  // 3) Check if user has this property bookmarked
  const userWithBookmarks = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      bookmarks: {
        where: { id: propertyId },
        select: { id: true },
      },
    },
  });

  if (!userWithBookmarks) {
    return { success: false, error: "User not found or no bookmarks." };
  }

  // Check array length for 0 or > 0
  const alreadyBookmarked = userWithBookmarks?.bookmarks.length > 0 

  if (alreadyBookmarked) {
    // Remove bookmark
    await prisma.user.update({
      where: { id: user.id },
      data: {
        bookmarks: {
          disconnect: { id: propertyId },
        },
      },
    });
    return { success: true, message: "Bookmark removed" };
  } else {
    // Add bookmark
    await prisma.user.update({
      where: { id: user.id },
      data: {
        bookmarks: {
          connect: { id: propertyId },
        },
      },
    });
    return { success: true, message: "Bookmark added" };
  }
}

export async function findBookmarkedProperties() {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not logged in" };
  }

 
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }, 
    include: {
      bookmarks: true, 
    },
  });

  if (!user) {
    return { success: false, error: "User not found." };
  }

  

  return { success: true, properties: user.bookmarks };
}

