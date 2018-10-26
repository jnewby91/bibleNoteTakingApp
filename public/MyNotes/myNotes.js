const BASE_URL = window.location.origin;

const NOTES_URL = '/notes';
const USERS_URL = '/users';



function currentUsername() { 
    const token = localStorage.getItem('jwtToken');
    console.log(token); 
    console.log(`${BASE_URL + USERS_URL}/me`)
$.ajax({
    dataType: 'json',
    headers: { Authorization: `Bearer ${token}`},
    method: "GET",
    //how do I get the id of the user sent in
    url:  `${BASE_URL + USERS_URL}/me` ,
    contentType: "application/json", 
    success: (data) => {
        console.log(data);
        $('.js_username').text(data.username);
    },
    error: function (a, b, c) {
        console.log(a, b, c)
    }
});
}

function getNotesbyId(){
    const token = localStorage.getItem('jwtToken');
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
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }


    })

}

function displayNotes(data) {
    // $('.js_username').html(data.user);

    for (let i = 0; i < data.length; i++) {
        $('.js_rows').append(`
        <tr class ='note_row'>
            <td><a href="../ViewNote/view_note.html?id=${data[i].id}">${data[i].topic}</a></td>
            <td>${data[i].passage.book}</td>
            <td>${data[i].passage.chapter}:${data[i].passage.verse}</td>
            <td><button id="edit_button" data-edit=${data[i].id}>Edit</button></td>
            <td><button id="delete_button" data-note=${data[i].id}>Delete</button></td>
        </tr>

    `)
    };
}

function editNotes(){
    $('.js_rows').on('click', '#edit_button', function(event){
        let buttoniD = $(event.target).data('edit');
        console.log(`${BASE_URL}${NOTES_URL}/${buttoniD}`);
        window.location = `${BASE_URL}/Edit_Notes/edit_note.html?id=${buttoniD}`;
    });
}

function deleteNote(){
    $('.js_rows').on('click','#delete_button', function(event){
        console.dir(event); 
        const token = localStorage.getItem('jwtToken');
        let buttoniD = $(event.target).data('note');
        console.log(buttoniD);

        let deleteConfirmation = window.confirm(`Are you sure you want to delete the note?` );

        if(deleteConfirmation){
            $.ajax({
                dataType: 'json',
                headers: { Authorization: `Bearer ${token}`},
                method: "DELETE",
                url:  BASE_URL + NOTES_URL + '/'+ buttoniD,
                contentType: "application/json",
              
                error: function (a, b, c) {
                    console.log(a, b, c)
                },
                success: function (data) {
                    console.log(data);
                    $('.note_row').remove();
                    getNotesbyId();
                }
            })
    
        }

    })
}

$(function (){
    currentUsername();
    getNotesbyId();
    deleteNote();
    editNotes();
})


