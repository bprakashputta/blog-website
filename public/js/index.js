shortenString();
// alert('Hello')

function shortenString(){
    let postData = $('.postData').text();
    let posts = document.querySelectorAll('.postData');
    // posts.textContent = postData.substring(0,100) + "...";
    posts.forEach((post)=>{
        // document.querySelector('.postData')
        post.textContent = postData.substring(0,100) + "...";
    })
}
