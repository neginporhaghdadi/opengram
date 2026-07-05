import { useEffect, useState } from "react";
import { supabase } from "../supabase/storage";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setPosts(data || []);
    }

    setLoading(false);
  };

useEffect(() => {
  fetchPosts();

  const channel = supabase
    .channel("posts-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "posts",
      },
      (payload) => {
        console.log("Realtime:", payload);

        fetchPosts();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  return { posts, loading, fetchPosts };
};