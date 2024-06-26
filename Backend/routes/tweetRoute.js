import express from "express";

import { createTweet, deleteTweet, getAlltweet, getfollowingTweet, likeordislike } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();
router.route("/create").post(isAuthenticated,createTweet);
router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
router.route("/like/:id").put(isAuthenticated,likeordislike);
router.route("/getalltweet/:id").get(isAuthenticated,getAlltweet);
router.route("/getfollowingtweet/:id").get(isAuthenticated,getfollowingTweet);
export default router;