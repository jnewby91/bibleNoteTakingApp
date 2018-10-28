    /**
     *  When you click on the page of a specific note this page will load
     * 1. First an ajax GET  request will be made to NOTES URL. 
     *     The AJAX request will need to have:
     *     -the id used in URL passed to a variable. 
     *     -will need to have the token of the JWT passed in
     * 2. Will need to create a display function for the information returned from
     *    the AJAX request
     *    
     */

const BASE_URL = window.location.origin;
const NOTES_URL = '/notes/';
const USERS_URL = '/users';


function viewNote(){
    const token = localStorage.getItem('jwtToken');
    let params = (new URL(window.location.href)).searchParams;

    let notesId = params.get('id');
    let newURL =`${BASE_URL}${NOTES_URL}${notesId}`;

    $.ajax({
        dataType: 'json',
        headers: { Authorization: `Bearer ${token}`},
        method: "GET",
        url: newURL,
        contentType: "application/json", 
        success: (data) => {
            displayNotes(data);
         }
    })
}

function displayNotes(data) {
    $('.js_topic').html(`Topic: ${data.topic}`);
    $('.js_book').html(data.passage.book);
    $('.js_chapter').html(data.passage.chapter);
    $('.js_verse').html(data.passage.verse); 
    $('.js_reflections').html(data.reflection)
 }
 




$(function(){
    viewNote();
}); 