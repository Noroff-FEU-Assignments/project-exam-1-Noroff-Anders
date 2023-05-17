const wpBaseUrl = 'https://project-exam.wp-andersnes.no/wp-json/wp/v2/posts';
const parentElement = document.getElementById('div-last-post');
let currentPage = 1; 

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
  const posts = await getPosts(currentPage);

  // Clearing the parent element
  parentElement.innerHTML = '';

  posts.forEach((blogpost) => {
    const blogcard = document.createElement('div');
    blogcard.classList.add('blog-card');

    const title = blogpost.title.rendered;
    const featuredImageURL = blogpost._embedded['wp:featuredmedia'][0].source_url;

    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    titleElement.classList.add('blog-card-title');


    const imageElement = document.createElement('img');
    imageElement.src = featuredImageURL;
    imageElement.classList.add('blog-card-image');

    blogcard.appendChild(imageElement);
    blogcard.appendChild(titleElement);
    parentElement.appendChild(blogcard);

    blogcard.addEventListener('click', () => {
      window.location.href = `blogdetail.html?id=${blogpost.id}`;
    });
  });
}


renderBlogCards();