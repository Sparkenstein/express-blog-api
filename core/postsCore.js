const dbInstance = require("../db");

const createPost = payload => {
    const { title, slug, author, excerpt, preview, post, tags, blog, category, createDate } = payload;
    const { authorId, blogId } = dbInstance.getAuthorAndBlogID.get(author.toLowerCase(), blog.toLowerCase());

    const r = dbInstance.registerPost.run(
        title,                       // Title
        post,                        // Body
        tags.join(),                 // Tags, nullable
        slug,                        // Slug
        category,                    // Category, nullable
        createDate,                  // Create_Date
        excerpt,                     // excerpt, nullable
        preview,                     // Preview_Image, nullable
        Number(authorId),            // Author_ID
        Number(blogId)               // Blog_ID
    );

    return r;
};

const getPostByTags = (blog, tags) => {
    return dbInstance.getPostByTags.all(blog, `%${tags}%`);
};

const getPostByAuthor = (blog, author) => {
    return dbInstance.getPostByAuthor.all(author.toLowerCase(), blog);
};

const getPostBySlug = (blog, slug) => {
    return dbInstance.getPostBySlug.all(slug.toLowerCase(), blog);
};

const getAllPosts = (blog, queryParams) => {
    const { pageSize, pageNumber } = queryParams;
    if (!pageSize && !pageNumber) {
        return dbInstance.getAllPosts.all(blog);
    }
    const offset = pageSize * pageNumber;
    return dbInstance.getAllPostsWithLimit.all(blog, pageSize, offset);
};

module.exports = {
    createPost,
    getPostByTags,
    getPostByAuthor,
    getPostBySlug,
    getAllPosts
};