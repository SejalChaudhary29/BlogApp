document.addEventListener("DOMContentLoaded", function() {
    const blogList = document.getElementById("blogList");
    const addBlogBtn = document.getElementById("addBlogBtn");
    const addBlogModal = document.getElementById("addBlogModal");
    const addBlogForm = document.getElementById("addBlogForm");
    const closeModal = document.querySelector(".close");
    
    // Function to display blogs on the home page
    function displayBlogs() {
        blogList.innerHTML = ""; // Clear previous content
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        blogs.forEach((blog, index) => {
            const blogItem = document.createElement("div");
            blogItem.className = "blog-item";
            blogItem.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.description}</p>
                <button class="read-blog" data-index="${index}">
                 <a href="blog.html" class= 'read'> Read More</a></button>
                <button class="delete-blog" data-index="${index}">Delete</button>
            `;
            blogList.appendChild(blogItem);
        });

        // Add event listeners to "Read More" and "Delete" buttons
        const readButtons = document.querySelectorAll(".read-blog");
        readButtons.forEach(button => {
            button.addEventListener("click", showBlog);
        });

        const deleteButtons = document.querySelectorAll(".delete-blog");
        deleteButtons.forEach(button => {
            button.addEventListener("click", deleteBlog);
        });
    }

    // Function to open the add blog modal
    function openAddBlogModal() {
        addBlogModal.style.display = "block";
    }

    // Function to close the add blog modal
    function closeAddBlogModal() {
        addBlogModal.style.display = "none";
        addBlogForm.reset(); // Clear form fields after closing
    }

    // Function to handle form submission for adding a new blog
    function addBlog(event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const poster = document.getElementById("poster").value;
        const description = document.getElementById("description").value;
        const content = document.getElementById("content").value;
        const posterImage = document.getElementById("posterImage").files[0];
    
        const newBlog = { title, poster, description, content, posterImage };
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push(newBlog);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        displayBlogs();
        closeAddBlogModal();
    }

    
    // Function to show a single blog post on a separate page
    function showBlog(event) {
        const index = event.target.getAttribute("data-index");
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        const blogPost = blogs[index];
        const blogPostHTML = `
        <article class="single-blog">
        <h2>${blogPost.title}</h2>
        <img src="${blogPost.posterImage}" alt="Blog Poster">
        <p><strong>Poster:</strong> ${blogPost.poster}</p>
        <p>${blogPost.content}</p>
        <a href="index.html">Back to Home</a>
    </article>
        `;

        document.getElementById("blogPost").innerHTML = blogPostHTML;
    }

    // Function to handle deleting a blog post
    function deleteBlog(event) {
        const index = event.target.getAttribute("data-index");
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        if (confirm("Are you sure you want to delete this blog post?")) {
            blogs.splice(index, 1);
            localStorage.setItem("blogs", JSON.stringify(blogs));
            displayBlogs();
        }
    }

    // Event listeners
    addBlogBtn.addEventListener("click", openAddBlogModal);
    addBlogForm.addEventListener("submit", addBlog);
    closeModal.addEventListener("click", closeAddBlogModal);

    // Call the displayBlogs function when the page loads
    displayBlogs();
});
