const wpUrl = 'https://project-exam.wp-andersnes.no/wp-json/wp/v2/posts?_embed'

const parentElement = document.getElementById('div-last-post');


async function getPosts() {
    try {
        const response = await fetch(wpUrl)
        const posts = await response.json()
        return posts
    } catch (error) {
        console.log(error)
    }
}

async function renderblogcard() {
    const post = await getPosts();
        post.forEach((blogpost) => {

            const blogcard = document.createElement('div');
            blogcard.classList.add('blog-card');

            const title = blogpost.title.rendered;
            const featuredImageURL = blogpost._embedded['wp:featuredmedia']['0'].source_url;
        
            // Create a new element for the title
            const titleElement = document.createElement('h1');
            titleElement.textContent = title;
            titleElement.classList.add('blog-card-title');
        
            // Create a new element for the featured image
            const imageElement = document.createElement('img');
            imageElement.src = featuredImageURL;
            imageElement.classList.add('blog-card-image');
        
            // Append the title and image elements to a parent element

            blogcard.appendChild(imageElement);
            blogcard.appendChild(titleElement);
            parentElement.appendChild(blogcard);
            
         });

}

renderblogcard();