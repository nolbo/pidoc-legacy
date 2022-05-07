
document.querySelectorAll('span[data-custom-docbox]').forEach(e => {
    e.addEventListener('click', () => {
        location.href = e.className.split(' ').join('/');
    });
});