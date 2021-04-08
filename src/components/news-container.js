import { Fragment } from "react";
import Story from "./story";
import Spinner from "./spinner/spinner";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";
import store from "../stores/newsStore";
import { observer } from "mobx-react-lite";

const NewsContainer = () => {
  const { count } = useInfiniteScroll();
  return (
    <Fragment>
      <h1>News Feed</h1>
      <hr />
      {store.loading ? (
        <Spinner />
      ) : (
        store.storyIds
          .slice(0, count)
          .map((storyId) => <Story key={storyId} storyId={storyId} />)
      )}
    </Fragment>
  );
};

export default observer(NewsContainer);
