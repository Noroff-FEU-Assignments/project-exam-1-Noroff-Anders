const wpUrl = 'https://project-exam.wp-andersnes.no/wp-json/wp/v2/'


async function getPosts() {
    try {
        const response = await fetch(wpUrl + 'posts?_embed')
        const posts = await response.json()
        console.log(posts)
    } catch (error) {
        console.log(error)
    }
}

getPosts();