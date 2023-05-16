const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const wpBaseUrl = 'https://project-exam.wp-andersnes.no/wp-json/wp/v2/posts';
const postUrl = `${wpBaseUrl}/${postId}`;

const parentElement = document.getElementById('container-blog-detail');


async function getPost() {
  try {
    const response = await fetch(postUrl);
    const post = await response.json();
    return post;
  } catch (error) {
    console.log(error);
  }
}

async function renderBlogPost() {
    const post = await getPost();
  
    // Render the blog post details on the page
    const title = document.createElement('h1');
    title.textContent = post.title.rendered.textContent; // Assign the title text
  
   // Render the blog post details on the page
   const content = document.createElement('p');
   content.textContent = post.content.rendered; // Assign the title text
    // Render the title and content elements on the page as desired
    // ...
    parentElement.appendChild(title);
    parentElement.appendChild(content);
  }

renderBlogPost();