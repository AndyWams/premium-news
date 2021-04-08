import { makeAutoObservable, observable, action } from "mobx";
import { GetStoryIds } from "../service";
import { DB_CONFIG } from "../config/config";
import firebase from "firebase/app";
import "firebase/database";
class Store {
  storyIds = [];
  loading = false;
  comments = [];
  newComment = "";
  user = "anonymous";
  newsId;
  constructor() {
    makeAutoObservable(this, {
      storyIds: observable,
      loading: observable,
      comments: observable,
      newComment: observable,
      user: observable,
      newsId: observable,
      onLoadComments: action,
      getStoryIds: action,
      setstoryIds: action,
      setStory: action,
      setLoading: action,
      getStoryId: action,
      addComment: action,
      handleChange: action,
      deleteComment: action,
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
  setstoryIds(ids) {
    this.storyIds = ids;
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
  deleteComment(noteId) {
    this.database.child(noteId).remove();
  }
}

const store = new Store();
store.getStoryIds();
store.onLoadComments();
export default store;
