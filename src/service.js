import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    // toast.error(error.message);
    return Promise.reject(error);
  }

  if (!expectedError) {
    console.log(error.message);
    return Promise.reject(error);
  }
});
const newStoriesUrl = `${baseUrl}/newstories.json`;
const storyUrl = `${baseUrl}/item/`;
export const GetStory = async (storyId) => {
  const result = await axios
    .get(`${storyUrl + storyId}.json`)
    .then(({ data }) => data);
  return result;
};
export const GetStoryIds = async () => {
  const result = await axios.get(newStoriesUrl).then(({ data }) => data);
  return result;
};
