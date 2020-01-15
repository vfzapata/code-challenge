let notes = [];
sessionStorage.setItem('counter', 0);

openModal = (menuSelected) => {
    $(document).ready(function () {
        hideErrorMessage();
        cleanInputValues();
        $('#modal').css('display', 'block');
        if (menuSelected === 'editNoteId') {
            if ($('.main-note h3').length > 0) {
                // Get current note info
                let editId = $('#noteId').text();
                let editTitle = $('#titleNote').text();
                let editDesc = $('#desc').text();

                // Fill inputs with current note info
                $('#title').val(editTitle);
                $('#description').val(editDesc);

                $('#btn').css('display', 'none');
                $('#btnEdit').css('display', 'block');
                $("#btnEdit").on("click", function () {
                    // Get updated form values
                    let newEditTitle = $('#title').val();
                    let newEditDesc = $('#description').val();
                    // Get selected color, this field is optional
                    let newColor = $('#color option:selected').val();
                    if (!newEditTitle || !newEditDesc) {
                        showErrorMessage();
                    } else {
                        editnote(editId, newEditTitle, newEditDesc, newColor);
                    }
                });
            } else {
                $('#modal').css('display', 'none');
                alert('There are not notes to edit');
            }
        } else {
            $('#btn').css('display', 'block');
            $('#btnEdit').css('display', 'none');
        }
    })
}

closeModal = () => {
    $('#close').click(function () {
        $('#modal').css('display', 'none');
    });
}

showErrorMessage = () => {
    $('.alert-danger').css('display', 'block');
}

hideErrorMessage = () => {
    $('.alert-danger').css('display', 'none');
}

cleanInputValues = () => {
    $('#title, #description').val('');
    $('#modal').css('display', 'none');
}

addNote = (title, desc, color) => {
    if (!title || !desc) {
        showErrorMessage();
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
    if (getNote.length > 0) {
        let renderNote = getNote[getNote.length - 1];
        $('#mainTitle').empty();
        $('.main-note').css('background-color', `${renderNote.noteColor}`).append(`<h3 id="titleNote">${renderNote.noteTitle}</h3> <p id="desc">${renderNote.noteDesc}</p><span id="noteId" style="display: none">${renderNote.index}</span>`);

    } else {
        $('#mainTitle').text('Not results...');
        $('.main-note').css('background-color', '');
    }
}

loadAllNotes = (getAllNotes) => {
    $('.note-list').empty();
    if (getAllNotes.length > 0) {
        $(document).ready(function () {
            $.each(getAllNotes, function (key, val) {
                $('.note-list').append(`<div class="all-notes" style="background-color: ${val.noteColor}; margin-left: 2px" id="${val.index}"><span>${val.noteTitle}</span> <span class="remove-note" id="${val.index}" onclick="removeNote(this.id)">&times;</span> <p>${val.noteDesc}</p></div>`);
            });
        });
    }
}

removeNote = (id) => {
    let idx = notes.findIndex(function (item, i) {
        return item.index == id;
    });
    notes.splice(idx, 1);
    showNote(notes);
    loadAllNotes(notes);
}

editnote = (getEditId, getEditTitle, getEditDesc, getClr) => {
    let updateNote = notes.map(function (obj) {
        if (obj.index === parseInt(getEditId)) {
            obj.index = parseInt(getEditId);
            obj.noteTitle = getEditTitle;
            obj.noteDesc = getEditDesc;
            obj.noteColor = getClr;
        }
        return obj;
    });
    showNote(updateNote);
    loadAllNotes(updateNote);
    cleanInputValues();
    closeModal();
}

chooseColorNote = (colorSelected) => {
    if ($('.main-note h3').length > 0) {
        $('.main-note').css('background-color', colorSelected);
    } else {
        $('.color-list', function () {
            $('input:radio').prop("checked", false);
        });
        alert('Please, create a note first!');
    }

}