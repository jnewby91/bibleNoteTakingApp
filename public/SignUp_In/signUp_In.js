
const BASE_URL = window.location.origin;
const USERS_URL = '/users';
const AUTH_URL = '/auth/login';

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
            url: BASE_URL + AUTH_URL,
            contentType: "application/json",
            data: JSON.stringify({
                username: user,
                password: pass
            }),
            error: function (a, b, c) {
                console.log(a, b, c)
                if(a.statusText === 'Bad Request'){
                    $('.js-error').html('UserName or Password is Incorrect. Try Again.')
                }

                if(a.statusText === 'Unauthorized'){
                    $('.js-error').html('UserName or Password is Incorrect. Try Again');
                }
                
            },
            success: function (data) {
                console.log(data);
                localStorage.setItem('jwtToken', data.jwtToken);
                window.location ='../MyNotes/my_notes.html';
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
            url:  BASE_URL + USERS_URL,
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
                window.location = './sign_in.html' ;
            }
        })

    });

}

$(function(){
    logintoSite();
    signupForSite();
})