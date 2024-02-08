import { Link } from "react-router-dom";
import { Button } from "../ui";

type UserCardProps = {
  user: any;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      {" "}
      <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            className="h-14 w-14 rounded-full"
          />
          <p className="body-bold">{user?.name}</p>
          <div className="small-regular text-light-3">@{user?.username}</div>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap">
            Follow
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
