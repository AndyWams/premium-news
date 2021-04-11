import { useEffect, useState } from "react";
import { GetStory } from "../../service";
import { MapTime } from "../../utils/mappers";
const Story = ({ storyId }) => {
  const [story, setStory] = useState([]);
  useEffect(() => {
    const getAllStories = async () => {
      await GetStory(storyId).then((data) => {
        data && data.url && setStory(data);
      });
      return () => {};
    };
    getAllStories();
  }, [storyId]);
  return story && story.url ? (
    <a href={`/news-details/${storyId}`}>
      <div className="list-item">
        <div className="item--title">{story.title}</div>
        <div className="small--text">
          By: <span>{story.by}</span>
        </div>
        <div className="small--text">
          Time: <span>{MapTime(story.time)}</span>
        </div>
      </div>
    </a>
  ) : null;
};

export default Story;
