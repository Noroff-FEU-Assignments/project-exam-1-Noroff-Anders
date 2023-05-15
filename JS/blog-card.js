const wpBaseUrl = 'https://project-exam.wp-andersnes.no/wp-json/wp/v2/posts';
const perPage = 10;
const parentElement = document.getElementById('div-last-post');

async function getPosts(page) {
    const url = `${wpBaseUrl}?_embed&per_page=${perPage}&page=${page}`;
    try {
    const response = await fetch(url);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.log(error);
  }
}

async function renderBlogCards() {
  let page = 1;
  let allPosts = [];

  while (true) {
    const posts = await getPosts(page);

    if (posts.length === 0) {
      // No more posts, exit the loop
      break;
    }

    allPosts = allPosts.concat(posts);
    page++;

    if (page > 12) {
      // Maximum limit reached (optional)
      break;
    }
  }

  allPosts.forEach((blogpost) => {
    const blogcard = document.createElement('div');
    blogcard.classList.add('blog-card');

    const title = blogpost.title.rendered;
    const featuredImageURL = blogpost._embedded['wp:featuredmedia'][0].source_url;

    // Create a new element for the title
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    titleElement.classList.add('blog-card-title');

    // Create a new element for the featured image
    const imageElement = document.createElement('img');
    imageElement.src = featuredImageURL;
    imageElement.classList.add('blog-card-image');

    // Append the title and image elements to the parent element
    blogcard.appendChild(imageElement);
    blogcard.appendChild(titleElement);
    parentElement.appendChild(blogcard);
  });
}

renderBlogCards();