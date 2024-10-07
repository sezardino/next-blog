import { createSSRClient } from "@/lib/supabase";
import { randomUUID } from "crypto";

export const uploadFileToStorage = async (file: File, prePath?: string) => {
  const supabase = createSSRClient();

  return await supabase.storage
    .from("storage")
    .upload(`${prePath + "/"}${randomUUID()}`, file);
};

export const getFilePublicPath = (path: string) => {
  const supabase = createSSRClient();

  return supabase.storage.from("storage").getPublicUrl(path).data.publicUrl;
};

export const deleteFileFromStorage = async (path: string) => {
  const supabase = createSSRClient();

  return await supabase.storage.from("storage").remove([path]);
};
