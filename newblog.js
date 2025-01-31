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
    
    document.getElementById('blogform').addEventListener('submit',function(e){
        e.preventDefault();
        const updatedtitle = document.getElementById('title').value.trim();
        const updateddescription = document.getElementById('description').value.trim();
        const updatedauthor=document.getElementById('author').value.trim();
        if (updatedtitle === '' || updateddescription === '' || updatedauthor === '') {
            alert("Both title and description are required!");
            return;
        }
        const updatedImage =document.getElementById('image').files[0];
        const reader = new FileReader();
        reader.onload = function(event){
            const updatedImageBase64 = event.target.result;
            const blogindex=parseInt(blogId,10);
            blogs[blogindex]={
                title: updatedtitle,
                description: updateddescription,
                author: updatedauthor,
                image:updatedImageBase64 || blog.image
                }
            localStorage.setItem('blogs' , JSON.stringify(blogs));
            window.location.href=`blog-details.html?id=${blogId}`;
        };
        if(updatedImage){
            reader.readAsDataURL(updatedImage);
        }
        else{
            blogs[blogId]=blog.image;
            localStorage.setItem('blogs',JSON.stringify(blogs));
            window.location.href=`blog-details.html?id=${blogId}`;

        }
        


    });

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
            if (imageFile){
                const reader= new FileReader();
                reader.onload = function(event){
                    newBlog.image=event.target.result;
                    const blogs= JSON.parse(localStorage.getItem('blogs')) ||[];
                    blogs.push(newblog);
                    localStorage.setItem('blogs',JSON.stringify(blogs));
                    window.location.href = `blog-details.html?id=${blogs.length -1}`;
                }
            }
            else{
                const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
                blogs.push(newBlog);
                localStorage.setItem('blogs', JSON.stringify(blogs));
                window.location.href = `blog-details.html?id=${blogs.length -1}`;
            }
        });
    }
})
