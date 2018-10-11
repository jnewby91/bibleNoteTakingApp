let MOCK_DATA = {
    "notes": [{
            "id": 1111111,
            "userName": "jnewby",
            "topic": "God's Love for His Children",
            "chapterVerse": "John 3:16",
            "noteType": "personal",
            "visibility": "public",
            "dateCreated": "01301993",
            "reflection": "Jesus died for our sins, so we would have grace from God God loved us so much he Jesus to carry out this plan"

        },
        {
            "id": 2222222,
            "userName": "jnewby",
            "topic": "God's Will Never Forsake Us",
            "chapterVerse": "Psalm 37:25",
            "noteType": "testimonial",
            "visibility": "private",
            "dateCreated": "08122018",
            "reflection": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "id": 3333333,
            "userName": "jnewby",
            "topic": "What God's Intentions Are",
            "chapterVerse": "John 10:11",
            "noteType": "pastor",
            "visibilty": "public",
            "dateCreated": "08302018",
            "reflection": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "id": 4444444,
            "userName": "jnewby",
            "topic": "Be at Peace",
            "chapterVerse": "Phillippians 4:6",
            "noteType": "personal",
            "visibilty": "public",
            "dateCreated": "09152018",
            "reflection": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
    ]
};


const NOTES_URL = 'http://localhost:8080/notes';
const USERS_URL = 'http://localhost:8080/users';
const AUTH_URL = 'http://localhost:8080/auth/login';


function getNotes(callbackFn) {
    setTimeout(function () {
        callbackFn(MOCK_DATA)
    }, 100);
}


//When a user clicks on the submit button. An AJAX call is made to 
//authentication URL  
//  1. Make a function that takes values from inputs and turns them into variables.
//  2. Use variables to create an AJAX call to authentication URL
//  3.

function logintoSite() {
    $('.sign_in form').submit(function () {
        console.log('I hear you');
        event.preventDefault();
        const user = $('form').find('#signIn_userName').val();
        const pass = $('form').find('#signIn_password').val();
        // $.post(AUTH_URL, JSON.stringify({username: 'jnewby12', password: 'something'}), function(data){
        //     console.log(data);
        // }

        $.ajax({
            dataType: 'json',
            method: "POST",
            url: AUTH_URL,
            contentType: "application/json",
            data: JSON.stringify({
                username: user,
                password: pass
            }),
            error: function (a, b, c) {
                console.log(a, b, c)
            },
            success: function (data) {
                console.log(data);
                localStorage.setItem('jwtToken', data.jwtToken);
                $('html').load('./my_notes.html');
            }
        })
    });
}

function signupForSite() {
    $('.sign_up form').submit(function () {
        event.preventDefault();
        const email = $('form').find('#signUpEmail').val();
        const username = $('form').find('#userName').val();
        const fName = $('form').find('#signUpFirstName').val();
        const lName = $('form').find('#signUpLastName').val();
        const password = $('form').find('#signUpPassword').val();
        console.log(email);
        console.log(username);

        $.ajax({
            dataType: 'json',
            method: "POST",
            url: USERS_URL,
            contentType: "application/json",
            data: JSON.stringify({
                email: email,
                firstName: fName,
                lastname: lName,
                userName: username,
                password: password,
            }),
            error: function (a, b, c) {
                console.log(a, b, c)
            },
            success: function (data) {
                console.log(data);
                localStorage.setItem('jwtToken', data.jwtToken);
                $('html').load('./my_notes.html');
            }
        })

    });

}

function createNotes() {
    $('.note_Form form').submit(function () {
        const topic = $('form').find('#topic').val();
        const book = $('form').find('#book').val();
        const chapter = $('form').find('#chapter').val();
        const verse = $('form').find('#verse').val();
        const reflection = $('form').find('#topic').val();
        /* Need to know how to pass in radio button values*/

        $.ajax({
            dataType: 'json',
            method: "POST",
            url: USERS_URL,
            contentType: "application/json",
            data: JSON.stringify({
                topic: topic,
                //how to pass in id of user
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
            }
        })


    })

}



function getInputValue(destination) {
    $('form').find(destination).val();
    console.log(destination);
}



function displayNotes(data) {
    $('.js_username').html(data.notes[0].userName);

    for (let i = 0; i < data.notes.length; i++) {
        $('.js_rows').append(`
        <tr>
            <td><a href="">${data.notes[i].topic}</a></td>
            <td>${data.notes[i].dateCreated}</td>
            <td>${data.notes[i].noteType}</td>
            <td>${data.notes[i].visibility}</td>
            <td><button>Delete</button></td>
        </tr>

    `)
    };

    // $('.js_rows').append()
}


function getNotesandDisplay() {

    getNotes(displayNotes);
    console.log('this ran');
}

$(function () {
    getNotesandDisplay();
    logintoSite();
    // $.get('http://localhost:8080/', function(data){
    //     console.log(data);
    // });
    signupForSite();
    $('#enter').click();
})