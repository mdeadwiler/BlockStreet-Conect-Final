# BlockStreet Connect

![app1](/images/wireframedesign.jpg)
![WF3](/images/2ebce5c4-bdd1-4b50-97c5-327541fcc746.jpeg) ![WF](/images/wireFrame.jpg) 



## ***About & How it started:***

* I started this project by planning out a web application focused on connecting enthusiasts from the crypto, stock trading, and tech communities. I got my base idea from the old app Twitter. I outlined my initial idea and feature set exploring the app "X", "Thread", and Trello.
* BlockStreet Connect is a community-driven platform designed for crypto traders, day traders, and tech enthusiasts to share thoughts, accomplishments, goals, and frustrations. The platform enables users to connect and network with like-minded individuals through posts and comments.
* The goal was to create a community-driven space where users could connect and network.


* Trello helped me orgainze my day to day tasks.
[Trello Board](https://trello.com/b/tyN7ADHC/blockstreet-connect)

### ***Key Features***

* User Authentication: Register and log in to create personalized profiles.
* Post Management: Create, read, update, and delete posts (max length: 300 characters).
* User Interaction: Comment on posts and view all user activity in a live feed.
* Dynamic Content: Posts can include text, with future plans to support images and videos(Stretch-Goals).

#### ***My Tech Stack***

* Frontend: HTML, CSS, EJS templates.
* Backend: Node.js, Express.
* Database: MongoDB, Mongoose.
* Authentication: Session management for secure user authentication. 

>>***Proud Code Syntax***
```Javascript
router.get("/viewAll", async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate("author").sort({ createdAt: -1});
    
    const postsWithComments = await Promise.all(allPosts.map(async (post) => {
      const comments = await Comment.find({ post: post._id }).populate("author")
      return {...post.toObject(), comments}
    }))

    res.render("pages/viewAll.ejs", { posts: postsWithComments });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
```

>#### ***Goals***

![APP](/images/clientside.jpeg)


### ***Roadmap***
* Initial Setup: Created folder structure, server configuration, and basic routes.
* Core Functionality: Implemented CRUD operations for posts and comments.
* User Authentication: Built sign-in and sign-up pages for user management.
* Styling with CSS: Designed an urban-themed interface using custom CSS and integrated Google Fonts.

#### ***Stretch Goals***
* Friend Requests: Enable users to connect and build their network.
* Media Support: Allow users to add images and videos to their posts.
* Notifications: Implement notifications for comments and post interactions.
