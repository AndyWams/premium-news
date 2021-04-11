import { useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import store from "../../stores/newsStore";
import Spinner from "../spinner/spinner";
import Comments from "../comments/comments";

const NewsDetails = ({ match }) => {
  const { title, by, url } = store.story;
  const loading = store.loading;
  useEffect(() => {
    const getItem = async () => {
      const storyId = match.params.id;
      store.getStoryId(storyId);
      await store.getStory();
    };
    getItem();
  }, [match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <h1>News Details</h1>
          <hr />
          <div className="details-content">
            <div className="item--title">{title}</div>
            <div className="small--text">by: {by}</div>
            <div className="item--url">
              <a href={url} target="_blank" rel="noreferrer">
                Read more...
              </a>
            </div>
            <div className="comment--section">
              <textarea
                name=""
                cols="30"
                value={store.newComment}
                rows="10"
                placeholder="Write comment here..."
                onChange={(e) => store.handleChange(e.target.value)}
              />
              <button
                className="btn--primary"
                onClick={() => store.addComment()}
                disabled={store.disabled}
              >
                Post
              </button>
            </div>
          </div>
          <Comments />
        </section>
      )}
    </Fragment>
  );
};

export default observer(NewsDetails);
