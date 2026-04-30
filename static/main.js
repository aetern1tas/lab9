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