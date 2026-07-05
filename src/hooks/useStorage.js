import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase/storage";

export const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const uploaded = useRef(false);
  
useEffect(() => {
  if (!file || uploaded.current) return;

  uploaded.current = true;

  let progressValue = 0;

  const interval = setInterval(() => {
    progressValue += Math.floor(Math.random() * 15);

    if (progressValue > 90) {
      progressValue = 90;
    }

    setProgress(progressValue);
  }, 300);

  const uploadFile = async () => {
    const extension = file.name.split(".").pop();
    const filePath = `posts/${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      clearInterval(interval);
      setError(uploadError.message);
      uploaded.current = false;
      return;
    }

    clearInterval(interval);
    setProgress(100);

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    setUrl(publicUrl);

    const { error: dbError } = await supabase
      .from("posts")
      .insert([
        {
          image_url: publicUrl,
          file_path: filePath,
        },
      ]);

    if (dbError) {
      setError(dbError.message);
    }
  };

  uploadFile();

  return () => clearInterval(interval);
}, [file]);

  return { progress, url, error };
};