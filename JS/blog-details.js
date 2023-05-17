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
  title.textContent = post.title.rendered; // Assign the title text

  // Render the blog post details on the page
  const content = document.createElement('div');
  content.innerHTML = post.content.rendered; // Assign the content as HTML

  // Wrap images with a container and add classes
  const images = content.querySelectorAll('img');
  images.forEach((image) => {
    const container = document.createElement('div');
    container.classList.add('image-container');
    image.parentNode.insertBefore(container, image);
    container.appendChild(image);

    // Add click event listener to each image
    image.addEventListener('click', (event) => {
      event.stopPropagation(); // Stop event propagation to prevent closing the popup

      // Hide other open popups
      const openPopups = document.querySelectorAll('.image-container.popup');
      openPopups.forEach((popup) => {
        popup.classList.remove('popup');
      });

      container.classList.add('popup');
    });
  });

  // Add click event listener to the document to close the popup when clicked outside the image or overlay
  document.addEventListener('click', (event) => {
    const openPopups = document.querySelectorAll('.image-container.popup');
    openPopups.forEach((popup) => {
      if (!popup.contains(event.target) && !event.target.classList.contains('overlay')) {
        popup.classList.remove('popup');
      }
    });
  });

  parentElement.appendChild(title);
  parentElement.appendChild(content);
}

renderBlogPost();
