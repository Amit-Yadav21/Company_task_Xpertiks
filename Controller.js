const fs = require('fs');

const Create_New_Post = (req, res) => {
    try {
        if (fs.existsSync('./posts.json')) {
            const allposts = JSON.parse(fs.readFileSync('./posts.json'))
            allposts.push(req.body)
            fs.writeFileSync('./posts.json', JSON.stringify(allposts, null, 4))
            console.log(allposts);
            res.json({ posts: allposts })
        } else {
            fs.writeFileSync('./posts.json', JSON.stringify([req.body], null, 4))
        }
    } catch (error) {
        res.send(error.message)
    }
}

const List_all_Posts = (req, res) => {
    try {
        const Posts = JSON.parse(fs.readFileSync('./posts.json'));
        console.log(Posts);
        res.json({ Posts })
    } catch (error) {
        res.send(error.message)
    }
}

const Update_Post = (req, res) => {
    try {
        const AllPost = JSON.parse(fs.readFileSync('./posts.json'));
        const { id, title, body } = req.body;
        for (let element of AllPost) {
            if (element.id === id) {
                element.title = title
                element.body = body
            }
        }
        fs.writeFileSync('./posts.json', JSON.stringify(AllPost, null, 4))
        res.json({ AllPost })
    } catch (error) {
        res.send(error.message)
    }
}

const Delet_Post = (req, res) => {
    try {
        const AllPost = JSON.parse(fs.readFileSync('./posts.json'));
        const updatedArray = AllPost.filter(obj => obj.id !== req.body.id);
        console.log(updatedArray);
        fs.writeFileSync('./posts.json', JSON.stringify(updatedArray, null, 4))
        res.json({ updatedArray })
    } catch (error) {
        res.send(error.message)
    }
}


const Search_Post = (req, res) => {

    try {
        const search = req.body;
        const what_search = search.userId || search.id || search.title || search.body
        const All_Post = JSON.parse(fs.readFileSync('./posts.json'));
        const searchData = All_Post.filter((item) => {
            const userid = item.userId;
            const id = item.id;
            const title = item.title;
            const body = item.body;

            return (
                // userid.includes(what_search) ||
                // id.includes(what_search) ||
                title.includes(what_search) ||
                body.includes(what_search)
            );
        })
        if (searchData.length > 0) {
            res.send({ 'searching data here': searchData })
        }
    } catch (error) {
        res.send(error.message)
    }
}

const List_single_Post_corrosponding_comments = (req, res) => {
    try {
        const AllPost_comment = JSON.parse(fs.readFileSync('./comments.json'));
        const postComments = AllPost_comment.filter(comment => comment.postId === parseInt(req.params.id));
        res.json({ postComments })
    } catch (error) {
        res.send(error.message)
    }
}

const List_Post_with_given_userid_and_fetch_comments = (req, res) => {
    try {
        const AllPost = JSON.parse(fs.readFileSync('./posts.json'));
        const postsByUserId = AllPost.filter(comment => comment.userId === parseInt(req.params.id));

        const AllPost_comment1 = JSON.parse(fs.readFileSync('./comments.json'));
        const postComments1 = AllPost_comment1.filter(comment => comment.postId === parseInt(req.params.id));

        let DataObj = { posts_By_userId: postsByUserId, Comments_By_Id: postComments1 }

        res.json({ DataObj })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {
    Create_New_Post,
    List_all_Posts,
    Update_Post,
    Delet_Post,
    Search_Post,
    List_single_Post_corrosponding_comments,
    List_Post_with_given_userid_and_fetch_comments
}