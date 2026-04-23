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

function deleteNote(note_id) {
    if (confirm("Удалить эту заметку?")) {
        fetch('/delete/' + note_id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Плавно удаляем элемент из страницы без перезагрузки
                let noteElement = document.getElementById('note-' + note_id);
                if (noteElement) {
                    noteElement.style.transition = 'opacity 0.3s';
                    noteElement.style.opacity = '0';
                    setTimeout(() => noteElement.remove(), 300);
                }
            }
        })
        .catch(err => console.error('Ошибка при удалении:', err));
    }
}