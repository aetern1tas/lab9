function toggleNote(el) {
    let note_id = el.value;
    fetch('/toggle/' + note_id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'important': el.checked })
    });
}

function clearAll() {
    if (confirm("Вы уверены, что хотите удалить ВСЕ заметки?")) {
        fetch('/clear', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
        .catch(err => console.error('Ошибка:', err));
    }
}