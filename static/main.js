function toggleNote(el) {
    let note_id = el.value;
    
    fetch('/toggle/' + note_id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'important': el.checked })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let textSpan = el.previousElementSibling;
            if (el.checked) {
                textSpan.classList.add('important');
            } else {
                textSpan.classList.remove('important');
            }
        }
    })
    .catch(err => console.error('Ошибка:', err));
}