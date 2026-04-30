function clearAll() {
    if (confirm("Вы уверены, что хотите удалить ВСЕ заметки?")) {
        fetch('/clear', { method: 'DELETE' })
            .then(() => location.reload());
    }
}