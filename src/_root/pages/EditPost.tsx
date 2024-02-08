import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/ui/Loader";
import { useGetPostById } from "@/lib/react-query/queries";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id || "");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start">
          <img src={post?.imageURl} width={36} height={36} alt="add" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Update post</h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
}

export default EditPost;
