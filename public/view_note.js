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
    console.log('this is the url of the page you are on:' + window.location.href);
    let params = (new URL(window.location.href)).searchParams;
    console.log('this is what params is:' + params );

    let notesId = params.get('id');
    console.log(`${BASE_URL}${NOTES_URL}${notesId}`);

    $.ajax({
        dataType: 'json',
        headers: { Authorization: `Bearer ${token}`},
        method: "GET",
        //how do I get the id of the user sent in
        url: window.location.href,
        contentType: "application/json", 
        success: (data) => {
            console.log(data);
            displayNotes(data);
            // displayNotes(data); 
        }

})

}

$(function(){
    viewNote();
}); 