                const express = require("express");
                const PostModel = require("../Models/Post");

                const { UserModel } = require("../Models/Users");

                const auth = require("../Middleware/authmiddleware");
                const router = express.Router();

                router.get("/:id", async (req, res) => {
                try {
                    const users = await UserModel.findOne({ _id: req.params.id });

                    if (users) {
                    const post = await PostModel.find({ postedBy: req.params.id }).populate({
                        path: "postedBy",
                        select: "name",
                    });
                    res.json({ users, post });
                    console.log(posts);
                    }
                } catch (err) {
                    res.json(err.message);
                }
                });

                router.put("/follow", auth, async (req, res) => {
                try {
                    const follow = await UserModel.findByIdAndUpdate(
                    req.body.followid,
                    { $push: { followers: req.user._id } },
                    { new: true }
                    );

                    if (follow) {
                    const following = await UserModel.findByIdAndUpdate(
                        req.user._id,
                        { $push: { following: req.body.followid } },
                        { new: true }
                    );

                    const result = await following.save();
                    res.json(result);
                    }
                } catch (err) {
                    console.log(err.message);
                }

                router.put("/unfollow", auth, async (req, res) => {
                    try {
                    const follow = await UserModel.findByIdAndUpdate(
                        req.body.followid,
                        { $pull: { followers: req.user._id } },
                        { new: true }
                    );

                    if (follow) {
                        const following = await UserModel.findByIdAndUpdate(
                        req.user._id,
                        { $pull: { following: req.body.followid } },
                        { new: true }
                        );

                        const result = await following.save();
                        res.json(result);
                    }
                    } catch (err) {
                    console.log(err.message);
                    }
                });
                });

                module.exports = router;
