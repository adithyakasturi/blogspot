document.addEventListener('DOMContentLoaded',function() {
    const urlparams = new URLSearchParams(window.location.search);
    const blogId = urlparams.get('id');
    function deleteblog(blogId){
        const blogs=JSON.parse(localStorage.getItem('blogs'));
        blogs.splice(blogId,1)
        localStorage.setItem('blogs',JSON.stringify(blogs));
        window.location.href="index.html";
    }
    if (blogId === null){
        console.error("Blog ID is not found in URL !");
        return;
    }
    const blogs=JSON.parse(localStorage.getItem('blogs'));
    if (blogId<0 || blogId>=blogs.length){
        console.error("Invalid Blog Id");
        return;
    }
    const blog=blogs[blogId];
    if(!blog.views){
        blog.views=0;
    }
    blog.views+=1;
    localStorage.setItem('blogs',JSON.stringify(blogs));
    const blogContainer=document.querySelector('.bg-white');
    const backgroundStyle = blog.image ? `background-image: url(${blog.image}); background-size: cover; background-position: center;` : '';

    blogContainer.innerHTML = `
        <h2 class="text-3xl font-bold text-gray-900 mb-4">${blog.title}</h2>
        <p class="text-gray-700 text-lg mb-6">${blog.description}</p>
        <p class="text-gray-600 text-md font-semibold mb-4">By ${blog.author}</p>

        <div class="flex items-center text-gray-400 mb-4">
            <img src="images/visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="h-5 w-5 mr-2">
            <span id="viewCount">${blog.views}</span> Views
            <button class="flex ml-20 rounded-lg edit-btn">
                <img src="images/edit_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="h-6 w-6 ">
            </button>
            <button onclick="deleteblog" class=" flex px-7 rounded-lg delete-btn">
                <img src="images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="h-6 w-6 ">
            </button>
        </div>
        <button onclick="window.location.href='index.html'" class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6">
            Back to Blogs
        </button>

    `;
    const deleteBtn = document.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            deleteblog(blogId); 
        });
    const editBtn = document.querySelector('.edit-btn');
        editBtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        window.location.href=`newblog.html?id=${blogId}`;
        });
})