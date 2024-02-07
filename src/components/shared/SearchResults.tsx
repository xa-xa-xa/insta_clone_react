import { Models } from "appwrite";
import Loader from "../ui/Loader";
import GridPostList from "./GridPostsList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};
const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) {
    return <Loader />;
  }

  if (searchedPosts.documents.lenght) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className=" text-light-4 mt-10 text-center w-full">No Results Found</p>
  );
};

export default SearchResults;
