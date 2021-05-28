// <div className="btn-group" role="group" aria-label="Basic outlined example">
//     <button type="button" className="btn btn-outline-primary">Left</button>
//     <button type="button" className="btn btn-outline-primary">Middle</button>
//     <button type="button" className="btn btn-outline-primary">Right</button>
// </div>

async function get_albums() {
    let response = await fetch("https://jsonplaceholder.typicode.com/albums")
    let result = await response.json()
    let users = await get_users()
    console.log(users)
    let markup = result.map(e => {
        let user = users.find(user => user.id === e.userId)
        console.log(user)
        return album_markup(e,user)
    }).join('');
    $("#albums_list").html(
        markup
    )
}


get_albums()

async function get_users() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users")
    let result = await response.json()
    return result
}

function album_markup(el,us) {
    return `
     <tr>
            <th scope="row">${el.id}</th>
            <td>${us.name}</td>
            <td>${el.title}</td>
            
       </tr>
    `
}