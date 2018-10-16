const BASE_URL = window.location.origin;

const NOTES_URL = '/notes';
const USERS_URL = '/users';


function getNotesbyId(){
    const token = localStorage.getItem('jwtToken');
    console.log(token); 
    $.ajax({
            dataType: 'json',
            headers: { Authorization: `Bearer ${token}`},
            method: "GET",
            //how do I get the id of the user sent in
            url:  BASE_URL + NOTES_URL ,
            contentType: "application/json", 
            success: (data) => {
                console.log(data);
                displayNotes(data);
                // displayNotes(data); 
            }

    })

}

function displayNotes(data) {
    console.log(req);
    $('.js_username').html(data.user);

    for (let i = 0; i < data.length; i++) {
        $('.js_rows').append(`
        <tr>
            <td><a href="./view_note.html?id=${data[i].id}">${data[i].topic}</a></td>
            <td>${data[i].dateCreated}</td>
            <td>${data[i].passage.book}</td>
            <td>${data[i].visibility}</td>
            <td><button id="edit_button">Edi</button></td>
            <td><button id="delete_button">Delete</button></td>
        </tr>

    `)
    };
}
function deleteNote(){
    $('js_rows').click('#delete_button', function(event){
        
        let buttoniD = $(this).closest('td').val();
        console.log(buttoniD);
    })
}

$(function (){
    getNotesbyId();
    deleteNote();
})


