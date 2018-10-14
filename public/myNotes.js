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
    // $('.js_username').html(data.notes[0].userName);

    for (let i = 0; i < data.length; i++) {
        $('.js_rows').append(`
        <tr>
            <td><a href="./view_note.html?id=${data[i].id}">${data[i].topic}</a></td>
            <td>${data[i].dateCreated}</td>
            <td>${data[i].passage}</td>
            <td>${data[i].visibility}</td>
            <td><button>Delete</button></td>
        </tr>

    `)
    };
}

$(function (){
    getNotesbyId();
})


