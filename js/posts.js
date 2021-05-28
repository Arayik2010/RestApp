// <div className="card text-white bg-primary mb-3" style="max-width: 18rem;">
//     <div className="card-header">Header</div>
//     <div className="card-body">
//         <h5 className="card-title">Primary card title</h5>
//         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
//             content.</p>
//     </div>
// </div>

window.onload = function () {
    getData()
    $("#post_cards_container").on('click',".open_post",function (evt) {
     let target = evt.target.getAttribute("post_id")
        get_comments(target)
    })

}
document.getElementById("exampleModal").addEventListener('hide.bs.modal',function (evt) {
    $("#comment_content").html(`
      <div class='loader loader1'>
                 <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `)
})
async function get_comments(id) {
    let result = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    let response = await result.json()
    let maped_response = response.map(elem => comment_markup(elem)).join('')
    $("#comment_content").html (`
    <div class="accordion" id="accordionExample">
         ${maped_response}
    </div>
    `)
    console.log(response)


}
function comment_markup(obj) {
    return`
    <div class="accordion-item">
    <h2 class="accordion-header" id="heading${obj.id}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${obj.id}" aria-expanded="false" aria-controls="collapse${obj.id}">
       name: ${obj.name}
        email: ${obj.email}
      </button>
    </h2>
    <div id="collapse${obj.id}" class="accordion-collapse collapse" aria-labelledby="heading${obj.id}" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>${obj.body}</strong>
      </div>
    </div>
  </div>
    `
}


async function getData() {
    let result = await fetch("https://jsonplaceholder.typicode.com/posts")
    let response = await result.json()
    markup(response)
    console.log(response)


}


function markup(response) {
    let my_markup_map = response.map(elem => post_markup(elem)).join(' ')
$("#post_cards_container").html(` <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">${my_markup_map} </div>`)
}
function post_markup(obj) {
    return `
<div class="col">
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">Post ${obj.id}</div>
        <div class="card-body">
          <h5 class="card-title">${obj.title}</h5>
           <p class="card-text">${obj.body}</p>
           
           <button post_id = ${obj.id}  type="button" class="btn btn-success open_post" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Read more
</button>

        </div>
     </div>
</div>
  
    `
}