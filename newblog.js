document.getElementById('blogform').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    if (title === '' || description === '') {
        alert("Both title and description are required!");
        return;
    }

    const newBlog = { title, description };

    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(newBlog);

    localStorage.setItem('blogs', JSON.stringify(blogs));

    window.location.href = 'index.html';
});
