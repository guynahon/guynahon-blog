// this function gets subject and posts array and return an array of posts fron one input subject.
// this helps load the wanted posts to each subject page
// and in the home page it helps us divide the posts by category
export function filterPostsBySubject (subject, posts) {
    return posts.filter(post => post.subject === subject);
}