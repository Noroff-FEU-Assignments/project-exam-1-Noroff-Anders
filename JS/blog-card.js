const wpBaseUrl = 'https://project-exam.wp-andersnes.no/wp-json/wp/v2/posts';
const perPage = 4; // Number of posts to fetch per page
const parentElement = document.getElementById('div-last-post');
let currentPage = 1; // Track the current page

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

  // Clear the parent element
  parentElement.innerHTML = '';

  posts.forEach((blogpost) => {
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

// Function to handle the next button click event
function handleNextButtonClick() {
  currentPage++; // Increment the current page

  if (currentPage > 3) {
    currentPage = 1; // Go back to the starting page
  }
  renderBlogCards(); // Render the next set of posts
}

function handleBackButtonClick() {
  currentPage--; // Increment the current page
  if (currentPage < 1) {
    currentPage = 3; // Go back to the starting page
  }

  renderBlogCards(); // Render the next set of posts
}

// Attach the next button click event listener
const nextButton = document.getElementById('btn-right');
nextButton.addEventListener('click', handleNextButtonClick);

const backButton = document.getElementById('btn-left');
backButton.addEventListener('click', handleBackButtonClick);

// Initial rendering of the blog cards
renderBlogCards();