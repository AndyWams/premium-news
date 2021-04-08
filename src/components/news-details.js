import { useState, useEffect, Fragment } from "react";
import { GetStory } from "../service";
import Spinner from "./spinner/spinner";
import store from "../stores/newsStore";
import { observer } from "mobx-react-lite";
import Comments from "./comments";

const NewsDetails = ({ match }) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  store.getStoryId(match.params.id);
  useEffect(() => {
    const getItem = async () => {
      try {
        const paramsId = match.params.id;
        setLoading(true);
        await GetStory(paramsId).then((data) => {
          if (data) {
            setLoading(false);
            data && data.url && setDetails(data);
          }
        });
      } catch (ex) {}
    };
    getItem();
    return () => {};
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
            <div className="item--title">{details.title}</div>
            <div className="small--text">by: {details.by}</div>
            <div className="item--url">
              <a href={details.url} target="_blank" rel="noreferrer">
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
