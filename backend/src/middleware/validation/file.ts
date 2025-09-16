import { z } from "zod";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFile(file: any) {
  const schema = z
    .any()
    .refine((f) => f && ALLOWED_MIME_TYPES.includes(f.mimetype), {
      message: "Invalid file type. Only JPEG and PNG are allowed.",
    })
    .refine((f) => f && f.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 5MB.",
    });

  return schema.parse(file); // will throw ZodError if invalid
}