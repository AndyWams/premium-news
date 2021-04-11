import {
  makeAutoObservable,
  observable,
  action,
  configure,
  computed,
} from "mobx";
import { GetStoryIds, GetStory } from "../service";
import { DB_CONFIG } from "../config/config";
import firebase from "firebase/app";
import "firebase/database";

class Store {
  storyIds = [];
  story = {};
  loading = false;
  comments = [];
  newComment = "";
  user = "anonymous";
  newsId;
  disabled = true;
  constructor() {
    makeAutoObservable(this, {
      storyIds: observable,
      stories: observable,
      story: observable,
      loading: observable,
      comments: observable,
      newComment: observable,
      user: observable,
      newsId: observable,
      disabled: observable,
      onLoadComments: action,
      getStoryIds: action,
      getStoryId: action,
      getStory: action,
      addComment: action,
      handleChange: action,
      deleteComment: action,
      storiesWithComment: computed,
    });
    configure({
      enforceActions: "never",
      useProxies: "never",
    });
    //initialize firebase
    if (!firebase.apps.length) {
      this.myApp = firebase.initializeApp(DB_CONFIG);
    } else {
      this.myApp = firebase.app();
    }
    this.database = this.myApp.database().ref().child("comments");
  }
  onLoadComments() {
    const previousComments = [...this.comments];
    //Datasnapshot
    this.database.on("child_added", (snap) => {
      this.comments.push({
        id: snap.key,
        commentContent: snap.val().commentContent,
        user: snap.val().user,
        newsId: snap.val().newsId,
      });
    });
    this.comments = previousComments;
  }
  getStoryIds = async () => {
    this.loading = true;
    await GetStoryIds().then((data) => {
      if (data) {
        this.loading = false;
        this.storyIds = data;
      }
    });
  };
  getStoryId(id) {
    this.newsId = id;
  }
  getStory = async () => {
    this.loading = true;
    await GetStory(this.newsId).then((data) => {
      if (data && data.url) {
        this.loading = false;
        this.story = data;
      }
    });
  };
  addComment() {
    this.database.push().set({
      commentContent: this.newComment,
      user: this.user,
      newsId: this.newsId,
    });
    this.newComment = "";
    this.disabled = true;
  }
  handleChange(input) {
    if (input.length > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
    this.newComment = input;
  }
  deleteComment(postId) {
    this.comments = removeComment(this.comments, postId);
    this.database.child(postId).remove();
  }
  get storiesWithComment() {
    const comments_ = [...this.comments];
    const swc = comments_.filter((comment) => comment.newsId === this.newsId);
    return this.comments.length !== 0 ? swc : null;
  }
}

const store = new Store();
store.getStoryIds();
store.onLoadComments();
export default store;
//Helper method
const removeComment = (comments, id) => {
  return comments.filter((comment) => comment.id !== id);
};
