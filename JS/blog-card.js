const wpBaseUrl = 'https://project-exam.wp-andersnes.no/wp-json/wp/v2/posts';
const perPage = 4; // Number of posts to fetch per page
const parentElement = document.getElementById('div-last-post');
let currentPage = 1; // Track the current page
let currentBlogPostTitle = '';

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

  parentElement.innerHTML = '';

  posts.forEach((blogpost) => {
    const blogcard = document.createElement('div');
    blogcard.classList.add('blog-card');

    const title = blogpost.title.rendered;
    const featuredImageURL = blogpost._embedded['wp:featuredmedia'][0].source_url;
    const altText = blogpost._embedded['wp:featuredmedia'][0].alt_text;

    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    titleElement.classList.add('blog-card-title');


    const imageElement = document.createElement('img');
    imageElement.src = featuredImageURL;
    imageElement.alt = altText || 'Image';
    imageElement.classList.add('blog-card-image');

    blogcard.appendChild(imageElement);
    blogcard.appendChild(titleElement);
    parentElement.appendChild(blogcard);

    blogcard.addEventListener('click', () => {
      const titleQueryParam = encodeURIComponent(blogpost.title.rendered);
      sessionStorage.setItem('currentBlogPostTitle', blogpost.title.rendered);
      window.location.href = `blogdetail.html?id=${blogpost.id}&title=Blogcoin+|+${titleQueryParam}`;
    });
    
  });
}


function handleNextButtonClick() {
  const blogContainer = document.getElementById('blogContainer');
  const indicators = document.querySelectorAll('.indicator');
  
  currentPage++; 

  if (currentPage > 3) {
    currentPage = 1; // Go back to the starting page
  }
  
  blogContainer.style.opacity = 0; 
  indicators[currentPage - 1].classList.add('active'); 
  
  setTimeout(() => {
    renderBlogCards(); 
    
 
    blogContainer.style.opacity = 1;
  }, 500); 

  indicators[currentPage - 2 >= 0 ? currentPage - 2 : 2].classList.remove('active');
}

function handleBackButtonClick() {
  const blogContainer = document.getElementById('blogContainer');
  const indicators = document.querySelectorAll('.indicator');
  
  currentPage--; 
  
  if (currentPage < 1) {
    currentPage = 3; // Go back to the starting page
  }
  
  blogContainer.style.opacity = 0; 
  indicators[currentPage - 1].classList.add('active'); 
  
  setTimeout(() => {
    renderBlogCards(); // Render the previous set of posts
    
   
    blogContainer.style.opacity = 1;
  }, 500); 
  
  const previousIndicatorIndex = (currentPage - 1 + 1) % 3;
  indicators[previousIndicatorIndex].classList.remove('active');
}

  renderBlogCards();



const nextButton = document.getElementById('btn-right');
nextButton.addEventListener('click', handleNextButtonClick);

const backButton = document.getElementById('btn-left');
backButton.addEventListener('click', handleBackButtonClick);


renderBlogCards();