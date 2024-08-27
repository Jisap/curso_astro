
import { getPostLikes } from "./posts/get-posts-likes.action";
import { updatePostsLikes } from "./posts/update-post-likes.action";

export const server = {
  getPostLikes,
  updatePostsLikes,
};