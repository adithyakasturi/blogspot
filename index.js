document.addEventListener('DOMContentLoaded', function() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogContainer = document.getElementById('blogcontainer');

    if (!blogContainer) {
        console.error("Element with ID 'blogcontainer' not found!");
        return;
    }

    blogContainer.innerHTML = '';
    // Append existing blogs
    blogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.classList.add('bg-gray-100', 'rounded-lg', 'h-60', 'w-70', 'p-10', 'shadow-md');
        
        blogElement.innerHTML = `
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${blog.title}</h3>
            <p class="text-gray-600">${blog.description}</p>
        `;

        blogContainer.appendChild(blogElement);
    });
    const createNewBlog = document.createElement('a');
    createNewBlog.href = "newblog.html";
    createNewBlog.classList.add('bg-gray-100', 'rounded-lg', 'h-60', 'w-70', 'p-10', 'shadow-md', 'flex', 'items-center', 'justify-center', 'cursor-pointer');

    createNewBlog.innerHTML = `
        <div class="flex items-center">
            <img class="w-10 h-10 mr-4" src="images/Plus-Symbol-Transparent-Images.png" alt="Plus Symbol">
            <h3 class="text-xl font-semibold text-gray-800">Create New Blog</h3>
        </div>
    `;

    blogContainer.appendChild(createNewBlog);
});
