import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { supabase } from "../supabase/storage";
import { motion } from "motion/react"

const ImageGrid = ({setSelectedImg}) => {
  const { posts, loading, fetchPosts } = usePosts();
const handleDelete = async (post) => {
  const { error: storageError } = await supabase.storage
    .from("images")
    .remove([post.file_path]);

  if (storageError) {
    console.log(storageError);
    return;
  }

  const { error: dbError } = await supabase
    .from("posts")
    .delete()
    .eq("id", post.id);

  if (dbError) {
    console.log(dbError);
    return;
  }

  console.log("Deleted!");

  await fetchPosts();
};

 if (loading) {
  return (
    <div className="loading">
      Loading images...
    </div>
  );
}

  return (
    <div className="img-grid">
      {posts.map((post) => (
       <motion.div
        className="img-wrap"
        key={post.id}
        layout
        onClick={() => setSelectedImg(post.image_url)}
        whileHover={{opacity:1}}
        >
          <motion.img 
          src={post.image_url} alt="image"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1}}
          />
 <button
  className="delete-button"
  onClick={(e) => {
    e.stopPropagation();
    handleDelete(post);
  }}
>
  Delete
</button>

        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
