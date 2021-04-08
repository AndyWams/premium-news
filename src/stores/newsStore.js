import { makeAutoObservable } from "mobx";
import { GetStoryIds } from "../service";
import { DB_CONFIG } from "../config/config";
import firebase from "firebase";
import "firebase/database";
class Store {
  storyIds = [];
  loading = false;
  comments = [];
  newComment = "";
  user = "anonymous";
  newsId;
  constructor() {
    makeAutoObservable(this);
    if (!firebase.apps.length) {
      this.myApp = firebase.initializeApp(DB_CONFIG);
    } else {
      this.myApp = firebase.app();
    }
    this.database = this.myApp.database().ref().child("comments");
  }

  setstoryIds(news) {
    this.storyIds = news;
  }
  setStory(storyId) {
    this.story = storyId;
  }
  setLoading(val) {
    this.loading = val;
  }
  getStoryIds = async () => {
    store.setLoading(true);
    await GetStoryIds().then((data) => {
      if (data) {
        store.setLoading(false);
        store.setstoryIds(data);
      }
    });
  };
  getStoryId(id) {
    this.newsId = id;
  }
  addComment() {
    this.comments.push(this.newComment);
    this.database.push().set({
      commentContent: this.newComment,
      user: this.user,
      newsId: this.newsId,
    });
    this.newComment = "";
  }
  handleChange(input) {
    this.newComment = input;
  }
  onLoadComments() {
    const previousComments = [...store.comments];
    //Datasnapshot
    this.database.on("child_added", (snap) => {
      previousComments.push({
        id: snap.key,
        commentContent: snap.val().commentContent,
        user: snap.val().user,
        newsId: snap.val().newsId,
      });
      store.comments = previousComments;
    });
  }
}
const store = new Store();
store.getStoryIds();
store.onLoadComments();
export default store;
