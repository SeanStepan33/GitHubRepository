var express = require('express');
var router = express.Router();

const Thread = require('../models/thread.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');

//Search
router.get('/Search',function(req,res,next) {
    if(req.session.user)
    {
        res.render('SearchMenu', {
            pageTitle: "SearchMenu",
            pageID: "Search Page",
            Location: "../",
            Username: req.session.user
        });
    }
    else
    {
        req.session.redirect = '/Search';
        res.redirect('/login');
    }
});

router.get('/Search/:search_key', function (req, res, next) {
    var findThread = true;
    var findUser = true;
    var findPost = true;

    var SearchResultsThread = [];
    var SearchResultsUser = [];
    var SearchResultsPost = [];

    if (req.session.user) {

        console.log("Search Key:" + req.params.search_key + "\n");

        if(findThread)
        {
            Thread.find({name: req.params.search_key},function(err, search_results_thread) {
                if (err) return next(err);

                console.log("Thread Search Results\n");
                console.log(search_results_thread);
                SearchResultsThread = search_results_thread;
            });
        }

        if(findUser)
        {
            User.find({username: req.params.search_key},function(err, search_results_user) {
                if (err) return next(err);

                console.log("User Search Results\n");
                console.log(search_results_user);
                SearchResultsUser = search_results_user;
            });
        }

        if(findPost)
        {
            Post.find({title: req.params.search_key},function(err, search_results_post) {
                if (err) return next(err);

                console.log("Post Search Results\n");
                console.log(search_results_post);
                SearchResultsThread = search_results_post;
            });
        }

        res.render('ShowSearch', {
            pageTitle: "ShowSearch",
            pageID: "Search Page",
            Location: "../",
            Username: req.session.user,
            SearchResultsThread: SearchResultsThread,
            SearchResultsUser: SearchResultsUser,
            SearchResultsPost: SearchResultsPost
        });

    } else {
        req.session.redirect = '/Search/' + req.params.search_key;
        res.redirect('/login');
    }
});

module.exports = router;