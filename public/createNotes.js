const BASE_URL = window.location.origin;

const NOTES_URL = '/notes';
const USERS_URL = '/users';


function createNotes() {
    $('.note_Form form').submit(function (event) {
        event.preventDefault();
        const topic = $('form').find('#topic').val();
        const book = $('form').find('#book').val();
        const chapter = $('form').find('#chapter').val();
        const verse = $('form').find('#verse').val();
        const reflection = $('form').find('#topic').val();
        const token = localStorage.getItem('jwtToken');
        /* Need to know how to pass in radio button values*/

        $.ajax({
            dataType: 'json',
            headers: { Authorization: `Bearer ${token}`},
            method: "POST",
            url:  BASE_URL + NOTES_URL,
            contentType: "application/json",
            data: JSON.stringify({
                topic: topic,
                passage: {
                    book: book,
                    chapter: chapter,
                    verse: verse,
                },
                reflection: reflection,
                //do I need to change to a boolean 
                visibility: "true",
            }),
            error: function (a, b, c) {
                console.log(a, b, c)
            },
            success: function (data) {
                console.log(data);
                window.location = './my_notes.html';
            }
        })


    })

}


$(function(){
    createNotes();
}); 


