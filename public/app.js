
let MOCK_DATA = {   
    "notes": [
    {
	"id": 1111111,
	"userName": "jnewby",
	"topic": "God's Love for His Children",
	"chapterVerse": "John 3:16",
    "noteType": "personal",
    "visibility": "public",
	"dateCreated":"01301993",
	"reflection": "Jesus died for our sins, so we would have grace from God God loved us so much he Jesus to carry out this plan"
    
}, 	
{
    "id": 2222222,
    "userName": "jnewby",
    "topic": "God's Will Never Forsake Us",
    "chapterVerse": "Psalm 37:25",
    "noteType": "testimonial",
    "visibility": "private",
    "dateCreated":"08122018",
    "reflection": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
 }, 
 {
    "id": 3333333,
    "userName": "jnewby",
    "topic": "What God's Intentions Are" ,
    "chapterVerse": "John 10:11",
    "noteType": "pastor",
    "visibilty": "public",
    "dateCreated":"08302018",
    "reflection": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
 },
 {
    "id": 4444444,
    "userName": "jnewby",
    "topic": "Be at Peace" ,
    "chapterVerse": "Phillippians 4:6",
    "noteType": "personal",
    "visibilty": "public",
    "dateCreated":"09152018",
    "reflection": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
 }
]
};


const NOTES_URL = 'http://localhost:8080/notes'; 
const USERS_URL = 'http://localhost:8080/users';
const AUTH_URL =  'http://localhost:8080/auth/login';


function getNotes(callbackFn){
    setTimeout(function (){
        callbackFn(MOCK_DATA) 
    }, 100);
}


//When a user clicks on the submit button. An AJAX call is made to 
//authentication URL  
//  1. Make a function that takes values from inputs and turns them into variables.
//  2. Use variables to create an AJAX call to authentication URL
//  3.

function logintoSite(){
    $('.sign_in form').submit(function(){
        console.log('I hear you');
        event.preventDefault();
        const user = $('form').find('#signIn_userName').val();
        const pass=$('form').find('#signIn_password').val();
        console.log(user);
        console.log(pass);
        $.ajax({
            method: "POST",
            url: AUTH_URL,
            data: {username: user, password: pass },
        })

    });
}

function getInputValue(destination){
    $('form').find(destination).val();
    console.log(destination);
}



function displayNotes(data){
    $('.js_username').html(data.notes[0].userName);

    for(let i =0; i < data.notes.length; i++){
        $('.js_rows').append(`
        <tr>
            <td><a href="">${data.notes[i].topic}</a></td>
            <td>${data.notes[i].dateCreated}</td>
            <td>${data.notes[i].noteType}</td>
            <td>${data.notes[i].visibility}</td>
            <td><button>Delete</button></td>
        </tr>

    `)};

    // $('.js_rows').append()
}


function getNotesandDisplay(){

    getNotes(displayNotes);
    console.log('this ran');
}

$(function() {
    getNotesandDisplay();
    logintoSite();
})


