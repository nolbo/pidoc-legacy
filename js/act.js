const con_padding = Number(getComputedStyle(document.documentElement).getPropertyValue('--content-padding-top').replace(/[^0-9.]/g, '')) * 16;
let list_el_is_clicked = false;

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    changeTheme('dark');
});

document.getElementById('theme').addEventListener('click', () => {
    if(document.querySelector('link.media_dark').getAttribute('media') === '(prefers-color-scheme: dark)') {
        changeTheme('light');
    } else {
        changeTheme('dark');
    }
});

document.getElementById('sidebtn').addEventListener('click', () => {
    if(document.querySelector('aside > ul').style.display === 'block') {
        document.querySelectorAll('aside > ul').forEach(e => { e.style.display = 'none'; });
    } else {
        document.querySelectorAll('aside > ul').forEach(e => { e.style.display = 'block'; });
    }
});

document.getElementById('sidebtn').addEventListener('blur', () => { if(list_el_is_clicked) document.querySelectorAll('aside > ul').forEach(e => { e.style.display = 'none'; }); });

document.querySelector('main').addEventListener('click', () => {
    if(document.querySelector('aside > ul').style.display === 'block') {
        document.querySelectorAll('aside > ul').forEach(e => { e.style.display = 'none'; });
    }
});

document.querySelectorAll('.list-el').forEach(e => {
    e.addEventListener('click', (event) => {
        list_el_is_clicked = true;
        event.preventDefault();
        event.stopPropagation();
        if(matchMedia('(hover: none) and (pointer: coarse)').matches) {
            document.querySelectorAll('aside > ul').forEach(e => { e.style.display = 'none'; });
        }
        const pos = document.querySelector(`div.con#${e.id}`).getBoundingClientRect();
        window.scrollTo(0, window.pageYOffset + pos.y - con_padding + ((e.id.split('-').length === 3) ? 4 : 0));
        list_el_is_clicked = false;
    });
});

window.addEventListener('scroll', onScroll);

function changeTheme(theme) {
    document.querySelectorAll('link.media_dark').forEach(e => {
        e.setAttribute('media', `(prefers-color-scheme: ${theme})`)
    });
}

function onScroll() {
    if(!matchMedia('(hover: none) and (pointer: coarse)').matches) {
        if(document.querySelector('.list-el[data-selected]')) {
            document.querySelector('.list-el[data-selected]').removeAttribute('data-selected');
        }
        let cons = [].slice.call(document.querySelectorAll('div.con')).filter(e => e.getBoundingClientRect().y <= con_padding);
        document.querySelector(`.list-el#${cons[cons.length - 1].id}`).setAttribute('data-selected', '');
    }
}

onScroll();
