import { observer } from "mobx-react-lite";
import store from "../stores/newsStore";
const Comments = () => {
  return (
    <div className="comments">
      <h4 className="mb-4">Comments</h4>

      {store.storiesWithComment &&
      Object.keys(store.storiesWithComment).length > 0 ? (
        store.storiesWithComment.map((comment) => (
          <pre
            key={comment.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              Posted by: {comment.user} - {comment.commentContent}
            </span>
            <span onClick={() => store.deleteComment(comment.id)}>&times;</span>
          </pre>
        ))
      ) : (
        <span className="empty--content">No comments</span>
      )}
    </div>
  );
};

export default observer(Comments);
