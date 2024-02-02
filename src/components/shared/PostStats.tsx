import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";
import { getLikeIconUrl } from "@/lib/utils";
import { Models } from "appwrite";
import { useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deletSavedPost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likes: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedPostRecord = currentUser?.save.find(
      (record: Models.Document) => record.$id === post.$id
    );
    if (savedPostRecord) {
      setIsSaved(false);
      deletSavedPost(savedPostRecord?.$id);
    } else {
      savePost({ postId: post.$id, userId });
      console.log("🚀 ~ handleSavePost ~ { postId: post.$id, userId }:", {
        postId: post.$id,
        userId,
      });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={getLikeIconUrl(likes, userId)}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <div className="small-medium lg:base-medium">0</div>
      </div>

      <div className="fle gap-2">
        <img
          src={
            isSaved
              ? "/public/assets/icons/saved.svg"
              : "/public/assets/icons/save.svg"
          }
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
        <p className="small-medium lg:base-medium"></p>
      </div>
    </div>
  );
};

export default PostStats;
