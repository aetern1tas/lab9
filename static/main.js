function addNote() {
    let text = document.getElementById('noteText').value
    let important = document.getElementById('noteImportant').checked
    
    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'text': text, 'important': important})
    }).then(() => {
        window.location.reload()
    })
}

function clearAll() {
    if (confirm("Вы уверены, что хотите удалить ВСЕ заметки?")) {
        fetch('/clear', {
            method: 'DELETE'
        }).then(() => {
            window.location.reload()
        })
    }
}