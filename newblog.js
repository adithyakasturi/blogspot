document.addEventListener("DOMContentLoaded",function(){
    const urlparams = new URLSearchParams(window.location.search);
    const blogId=urlparams.get('id');
    const blogs=JSON.parse(localStorage.getItem('blogs')) || [];
    if(blogId!==null){
        if (blogId<0 || blogId>=blogs.length){
            return;
        }
    const blog=blogs[blogId];
    document.getElementById('form-title').innerText="Editing a Blog";
    document.getElementById('title').value=blog.title;
    document.getElementById('description').value=blog.description;
    document.getElementById('author').value=blog.author;
    
    document.getElementById('blogform').addEventListener('submit',function(){
        e.preventDefault();
        const updatedtitle = document.getElementById('title').value.trim();
        const updateddescription = document.getElementById('description').value.trim();
        const updatedauthor=document.getElementById('author').value.trim();
        if (updatedtitle === '' || updateddescription === '' || updatedauthor === '') {
            alert("Both title and description are required!");
            return;
        }

        blog.title=updatedtitle;
        blog.description=updateddescription;
        blog.author=updatedauthor;
        localStorage.setItem('blogs' , JSON.stringify(blogs));
        window.location.href="blog-deatils.html?id=${blogId}";


    })

    }
    else{
        document.getElementById('blogform').addEventListener('submit', function(e) {
            e.preventDefault();
        
            const title = document.getElementById('title').value.trim();
            const description = document.getElementById('description').value.trim();
            const author=document.getElementById('author').value.trim();
            const imageFile= document.getElementById('image').files[0];
        
        
            if (title === '' || description === '' || author === '') {
                alert("Both title and description are required!");
                return;
            }
        
            const newBlog = { title, description, author};
        
            const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
            blogs.push(newBlog);
        
            localStorage.setItem('blogs', JSON.stringify(blogs));
        
            window.location.href = 'blog-details.html?id=${blogId}';
        });
    }
})
