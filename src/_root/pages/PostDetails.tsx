import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById } from "@/lib/react-query/queries";
import { formatRelativeDate } from "@/lib/utils";
import { Models } from "appwrite";
import { Link, useNavigate, useParams } from "react-router-dom";

function PostDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  const { user } = useUserContext();

  const { mutate: deletePost } = useDeletePost();

  // FIXME: KNOWN ISSUE: The delete does not work properly with appwrite for documents with
  // relationship attributes. Need to whatch out for the fix on appwrite side
  // const [isDeleted, setIsDeleted] = useState(false);
  const handleDeletePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    post: Models.Document
  ) => {
    e.stopPropagation();

    deletePost({ postId: id, imageId: post.imageId });
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.$creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator avatar"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>

                  <div className="flex-center  gap-2 text-light-3">
                    <p className="subtile-semibold lg:small-regular">
                      {formatRelativeDate(post?.$createdAt)}
                    </p>
                    |
                    <p className="subtile-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user?.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src="/public/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={(e) => handleDeletePost(e, post)}
                  variant="ghost"
                  className={`ghost_details-delte_btn ${
                    user?.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src="/public/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                    itemID={post?.imageId}
                    id={post?.creator.$id}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className=" flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, idx: number) => (
                  <li key={tag + idx} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
