import GridPostsList from "@/components/shared/GridPostsList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPost } from "@/lib/react-query/queries";
import { useState } from "react";

function Expolore() {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchQuery = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPost(debouncedSearchQuery);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  // ====
  const showSearchResults = !!searchValue;
  const showPosts =
    !showSearchResults &&
    posts.pages.every(({ documents }) => documents.lenght === 0);
  return (
    <div className="explore-container">
      <div className="explore-innner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg mt-3 bg-dark-4">
          <img
            src="/public/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search posts"
            className="flex"
          />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="body-bold md:h3-bold w-full">Popular Today</h2>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full min-w-5">
        {showSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : showPosts ? (
          <p className="text-light-4 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, idx) => (
            <GridPostsList
              key={`page-${idx}`}
              posts={item.documents}
              showUser={true}
              showStats={true}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Expolore;
