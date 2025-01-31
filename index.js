document.addEventListener('DOMContentLoaded', function() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogContainer = document.getElementById('blogcontainer');
    if (!blogContainer) {
        console.error("Element with ID 'blogcontainer' not found!");
        return;
    }
    function deleteblog(blogId){
        blogs.splice(blogId,1)
        localStorage.setItem('blogs',JSON.stringify(blogs));
        location.reload();
    }
    blogContainer.innerHTML = '';
    blogs.forEach((blog,index) => {
        const blogElement = document.createElement('a');
        blogElement.href=`blog-details.html?id=${index}`;
        blogElement.classList.add('bg-gray-100', 'rounded-lg', 'h-60', 'w-70', 'p-10', 'shadow-md' , 'block');
        if (!blog.views){
            blog.views=0
        }
        blogElement.innerHTML = `
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${blog.title}</h3>
            <p class="text-gray-600 truncate">${blog.description}</p>
            <div class="flex justify-between items-center mt-4 text-gray-600 text-md">
                <p class="font-semibold">By ${blog.author}</p>
                <div class="flex items-center space-x-4">
                    <div class="flex items center">
                        <img src="images/visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="h-5 w-5 mr-2" alt="Views">
                        <span>${blog.views}</span>
                    </div>
                    <button class="mb-6  py-2 rounded-lg mt-6 edit-btn">
                        <img src="images/edit_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="h-6 w-6 ">
                    </button>
                    <button onclick="deleteblog" class="mb-6  py-2 rounded-lg mt-6 delete-btn">
                        <img src="images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="h-6 w-6 ">
                    </button>
                </div>
            </div>
        `;
        const deleteBtn = blogElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            deleteblog(index); 
        });
        const editBtn = blogElement.querySelector('.edit-btn');
        editBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href=`newblog.html?id=${index}`;
        });

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
