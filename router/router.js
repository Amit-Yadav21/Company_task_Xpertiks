const express = require('express');
const Router = express.Router()
const controller = require('../controller/logic')

Router.post('/createPost',controller.Create_New_Post)
Router.get('/getPosts',controller.List_all_Posts)
Router.patch('/UpdatePost',controller.Update_Post)
Router.delete('/DeletePost',controller.Delet_Post)
Router.get('/SearchPost',controller.Search_Post)
Router.get('/get/corrosponding/comments/:id',controller.List_single_Post_corrosponding_comments)
Router.get('/get/comments/givenUser/:id',controller.List_Post_with_given_userid_and_fetch_comments)


module.exports = Router