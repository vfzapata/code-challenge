// Todo
/*
add note
Edit note
Delete note
Create a list of color to choose for every single note, if user do not choose one of them
a color by default will be set
left menu color option should be set a new color for main note
Add hover to the menu, fix width
*/
let notes = [];
sessionStorage.setItem('counter', 0);

openModal = (menuSelected) => {
    $(document).ready(function () {
        $('#modal').css('display', 'block');
    })
}

closeModal = () => {
    $('#close').click(function () {
        $('#modal').css('display', 'none');
    });
}

cleanInputValues = () => {
    $('#title, #description').val('');
    $('#modal').css('display', 'none');
}

addNote = (title, desc, color) => {
    if (!title || !desc) {
        // Create label on the form to show the error message
        // alert('Please fill the form');
    } else {
        let getCounter = sessionStorage.getItem('counter');
        notes.push({
            index: parseInt(getCounter) + 1,
            noteTitle: title,
            noteDesc: desc,
            noteColor: color
        });
        sessionStorage.setItem('counter', parseInt(getCounter) + 1);
        showNote(notes);
        loadAllNotes(notes);
        cleanInputValues();
    }
}

// This will display the recent note and add it to the main section.
showNote = (getNote) => {
    $('.main-note').empty();
    let renderNote = getNote[getNote.length - 1];
    $('#mainTitle').remove();
    $('.main-note').css('background-color', `${renderNote.noteColor}`).append(`<h3>${renderNote.noteTitle}</h3> <p>${renderNote.noteDesc}</p>`);
}

loadAllNotes = (getAllNotes) => {
    $('.note-list').empty();
    $(document).ready(function () {
        $.each(getAllNotes, function (key, val) {
            $('.note-list').css('background-color', `${val.noteColor}`).append(`<h3>${val.noteTitle}</h3> <p>${val.noteDesc}</p>`);
        });
    });
}