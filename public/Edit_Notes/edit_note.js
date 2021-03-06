const BASE_URL = window.location.origin;
const NOTES_URL = '/notes';


function getNotebyId(){
    const token = localStorage.getItem('jwtToken');     
    let params = (new URL(window.location.href)).searchParams;

    let notesId = params.get('id');
    let newURL = `${BASE_URL}${NOTES_URL}/${notesId}`;

    console.log(newURL);

    $.ajax({
        dataType: 'json',
        headers: { Authorization: `Bearer ${token}`},
        method: "GET",
        //how do I get the id of the user sent in
        url: newURL,
        contentType: "application/json", 
        success: (data) => {
            console.log(data);
            insertNotes(data);
            // displayNotes(data); 
         }
    })
}


function insertNotes(data){
    $('#topic').val(data.topic);
    $('#book').val(data.passage.book);
    $('#chapter').val(data.passage.chapter);
    $('#verse').val(data.passage.verse);
    $('#reflections').val(data.reflection);
}

function changeNote(){
    $('.note_Form form').submit(function (event){
        event.preventDefault(); 
        const topic = $('form').find('#topic').val();
        console.log(topic);
        const book = $('form').find('#book').val();
        console.log(book);
        const chapter = $('form').find('#chapter').val();
        const verse = $('form').find('#verse').val();
        const reflection = $('form').find('#reflections').val();
        const token = localStorage.getItem('jwtToken');     
        let params = (new URL(window.location.href)).searchParams;
    
        let notesId = params.get('id');
        console.log('i heard this click');
        console.log(notesId);
        let newURL = `${BASE_URL}${NOTES_URL}/${notesId}`;
        console.log(newURL);
     
        $.ajax({
            dataType: 'json',
            headers: { Authorization: `Bearer ${token}`},
            method: "PUT",
            url:  newURL ,
            contentType: "application/json",
            data: JSON.stringify({
                id: notesId,
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

                console.log(window.location);
                window.location = '../MyNotes/my_notes.html'; 
        }
    });
});
}

function cancelNote(){
    $('.note_Form form').on('click', '#cancel', function (){
        window.location = '../MyNotes/my_notes.html'; 

    })
}

$( function(){
    getNotebyId();
    changeNote();
    cancelNote(); 
}); 