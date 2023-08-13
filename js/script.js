const addBlogBtn = document.getElementById('add-blog-btn');
const closeBlogBtn = document.getElementById('close-blog-btn');
const addBlogSection = document.querySelector('#overlay');
const blogContainer = document.querySelector('#blog-container');
const createBlogBtn = document.querySelector('#create-blog-btn');
const BlogImgUrl = document.querySelector('#post-url');
const BlogTitle = document.querySelector('#blog-title');
const BlogDesc = document.querySelector('#blog-desc');
const BlogContent = document.querySelector('#main-blog');

// Demo blog data                          
const demoBlog = [
    {
        ImgURL: 'https://cdn.pixabay.com/photo/2023/08/02/12/39/bird-8165143_1280.jpg',
        title: 'Parrot',
        desc: `Parrots are birds of the order Psittaciformes.[1][2][3] There are about 372 species in 86 genera. They are found in most tropical and subtropical regions. The greatest diversity of parrots is found in South America and Australasia.
        Parrots are intelligent birds.`,
        content: `Parrots are birds of the order Psittaciformes.[1][2][3] There are about 372 species in 86 genera. They are found in most tropical and subtropical regions. The greatest diversity of parrots is found in South America and Australasia.
Parrots are intelligent birds. They have relatively large brains,[4] they can learn, and they can use simple tools.[5] Because some species have the ability to make sounds like human voices and have plumages with bright colors, many species are kept as pets. This includes some endangered and protected species. ` },
   
];

addBlogBtn.addEventListener('click', () => {
    addBlogSection.classList.add('active-add-blog');
    document.body.style.overflow = 'hidden';
});

closeBlogBtn.addEventListener('click', () => {
    hideAddBlogModal();
});

function showBlog(title, imageUrl, description, content) {
    // Hide the blog container and show the individual blog content
    blogContainer.style.display = 'none';
  

    const blogContent = document.createElement('section');
    blogContent.id = 'blog-content';
    blogContent.classList.add('flex');

    const headerDiv = document.createElement('header');
    headerDiv.classList.add('flex');

    const leftContentDiv = document.createElement('div');
    leftContentDiv.classList.add('left-content', 'flex');

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const h3 = document.createElement('h3');
    h3.textContent = description;

    leftContentDiv.appendChild(h2);
    leftContentDiv.appendChild(h3);

    const rightContentDiv = document.createElement('div');
    rightContentDiv.classList.add('right-content');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'blog-image';

    rightContentDiv.appendChild(img);

    headerDiv.appendChild(leftContentDiv);
    headerDiv.appendChild(rightContentDiv);

    const mainContentDiv = document.createElement('div');
    mainContentDiv.classList.add('main-content');

    const p = document.createElement('p');
    p.textContent = content;

    mainContentDiv.appendChild(p);


    blogContent.appendChild(headerDiv);
    blogContent.appendChild(mainContentDiv);

    // Add the blog content to the body
    document.body.appendChild(blogContent);

    // Show the back button and hide the add blog button
    document.getElementById('back-btn').style.display = 'grid';
    document.getElementById('add-blog-btn').style.display = 'none';
}

function hideBlog() {
    // Show the blog container and remove the individual blog content
    blogContainer.style.display = 'flex';
    document.getElementById('blog-content').remove();
    
    const footer = document.getElementById('footer');
    footer.style.display = 'block'; 
   
    
    // Show the add blog button and hide the back button
    document.getElementById('add-blog-btn').style.display = 'grid';
    document.getElementById('back-btn').style.display = 'none';
}

function createBlogPostElement(title, imageUrl, description, content) {
    const article = document.createElement('article');
    article.classList.add('blog', 'flex');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'blog-image';

    imageDiv.appendChild(img);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');

    const h1 = document.createElement('h1');
    h1.textContent = title;

    titleDiv.appendChild(h1);

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');

    const p = document.createElement('p');
    p.textContent = description;

    descDiv.appendChild(p);

    const readMoreBtn = document.createElement('button');
    readMoreBtn.id = 'read-more-btn';
    readMoreBtn.textContent = 'Read More';

    readMoreBtn.addEventListener('click', () => {
        window.scrollTo({top: 0})
        showBlog(title, imageUrl, description, content);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const confirmation = confirm('Are you sure you want to delete this blog?');
        if (confirmation) {
            deleteBlog(title); // Call the deleteBlog function with the title of the blog
        }
    });

    article.appendChild(imageDiv);
    article.appendChild(titleDiv);
    article.appendChild(descDiv);
    article.appendChild(readMoreBtn);
    article.appendChild(deleteBtn); 
    return article;
}

function addBlogPost(title, imageUrl, description, content) {
    const blogData = {
        ImgURL: imageUrl,
        title,
        desc: description,
        content,
    };

    const blogPostElement = createBlogPostElement(
        title,
        imageUrl,
        description,
        content
    );
 
    blogContainer.appendChild(blogPostElement);

    let existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    existingBlogs.push(blogData);
    localStorage.setItem('blogs', JSON.stringify(existingBlogs));

    loadBlogPosts(); // Refresh the blog posts after adding
}

function deleteBlog(title) {
    let existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    existingBlogs = existingBlogs.filter(blog => blog.title !== title);
    localStorage.setItem('blogs', JSON.stringify(existingBlogs));
    loadBlogPosts(); // Refresh the blog posts after deletion
}


function loadBlogPosts() {
   
    let existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    if (existingBlogs.length > 0) {
        blogContainer.innerHTML = '';
        existingBlogs.forEach((blogData) => {
            const blogPostElement = createBlogPostElement(
                blogData.title,
                blogData.ImgURL,
                blogData.desc,
                blogData.content
            );
            blogContainer.appendChild(blogPostElement);
        });
    }
}

function addDemoBlogPosts() {
    for (const blogData of demoBlog) {
        const blogPostElement = createBlogPostElement(
            blogData.title,
            blogData.ImgURL,
            blogData.desc,
            blogData.content
        );
        blogContainer.appendChild(blogPostElement);
    }
}

function handleAddBlogFormSubmit(event) {
    event.preventDefault();

    const title = BlogTitle.value;
    const imageUrl = BlogImgUrl.value;
    const description = BlogDesc.value;
    const content = BlogContent.value;

    if (!title || !imageUrl || !description || !content) {
        alert('Please fill in all fields.');
        return;
    }

    addBlogPost(title, imageUrl, description, content);

    BlogTitle.value = '';
    BlogImgUrl.value = '';
    BlogDesc.value = '';
    BlogContent.value = '';

    hideAddBlogModal();
}

function hideAddBlogModal() {
    addBlogSection.classList.remove('active-add-blog');
    document.body.style.overflow = 'auto';
}

createBlogBtn.addEventListener('click', handleAddBlogFormSubmit);
window.addEventListener('load', loadBlogPosts);
window.addEventListener('load', addDemoBlogPosts);

// Back button functionality
const backButton = document.getElementById('back-btn');
backButton.addEventListener('click', hideBlog);