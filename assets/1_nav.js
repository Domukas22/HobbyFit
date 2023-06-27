//menu toggle
const btn_menu = document.querySelector('.navLink.menu')

window.addEventListener('resize', () => {
    if (isDesktop()) {
        btn_menu.classList.remove('open')
        toggle_menu(false)
    }
})
btn_menu.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('open')
    e.currentTarget.classList.contains('open') ? toggle_menu(true) : toggle_menu(false)
})
window.addEventListener('DOMContentLoaded', () => {set_activeLang()})

function toggle_menu(value) {
    animate_btnContent(value);
    animate_menuDropdown(value);
}
function animate_btnContent(value) {
    const X_of_menuBtn = document.querySelector('.X_wrap.menu')
    const text_of_menuBtn = document.querySelector('.tWrap_btnMenu')

    if (value) {
        X_of_menuBtn.classList.add('show')
        text_of_menuBtn.classList.remove('show')
        document.querySelector('body').style.overflow = "hidden"
    } else {
        X_of_menuBtn.classList.remove('show')
        text_of_menuBtn.classList.add('show') 
        document.querySelector('body').style.overflow = "auto"
    }
        
}
function animate_menuDropdown(value) {
    const dropdown_menu = document.querySelector('.cWrap_menuDropdown')
    const cWrap_Nav = document.querySelector('.cWrap_Nav')

    if (value) {
        dropdown_menu.style.display = "block"
        cWrap_Nav.classList.add('shadow')
        setTimeout(() => {dropdown_menu.classList.add('show')}, 10);
    } else {
        dropdown_menu.classList.remove('show')
        cWrap_Nav.classList.remove('shadow')
        setTimeout(() => {dropdown_menu.style.display = "none"}, 151);
    }
}
function set_activeLang(){
    const lang = document.querySelector('.current_lang[data-lang]').dataset.lang
    console.log('active lang:' + lang)

    switch (lang) {
        case "": document.querySelectorAll('.langLink[data-lang=""]').forEach(x => x.classList.add('active'))
        break;
        case "lt": document.querySelectorAll('.langLink[data-lang="lt"]').forEach(x => x.classList.add('active'))
        break;
        case "de": document.querySelectorAll('.langLink[data-lang="de"]').forEach(x => x.classList.add('active'))
        break;
    }  
}


function isDesktop() {return window.innerWidth > 990 ? true : false}
//--------------------------------------------------------------------------
// toggle btn_more
const btn_more = document.querySelector('.navLink.btn_more')
const dropdown_more = document.querySelector('.nav_Dropdown.more')
btn_more.addEventListener('mouseover', () => {
    toggle_dropdown(dropdown_more, true)
})
btn_more.addEventListener('mouseleave', () => {
    toggle_dropdown(dropdown_more, false)
})

// toggle btn badminton
const btn_badminton = document.querySelector('.navLink_dropdown.badminton')
const dropdown_badminton = document.querySelector('.nav_Dropdown.badminton')
btn_badminton.addEventListener('mouseover', () => {
    toggle_dropdown(dropdown_badminton, true)
})
btn_badminton.addEventListener('mouseleave', () => {
    toggle_dropdown(dropdown_badminton, false)
})

// toggle language dropdown
const btn_lang = document.querySelector('.navLink.langBox')
const dropdown_lang = document.querySelector('.nav_Dropdown.lang')
btn_lang.addEventListener('mouseover', () => {
    toggle_dropdown(dropdown_lang, true)
})
btn_lang.addEventListener('mouseleave', () => {
    toggle_dropdown(dropdown_lang, false)
})

// toggle cart dropdown
const btn_cart = document.querySelector('.navLink.cart')
const dropdown_cart = document.querySelector('.nav_Dropdown.cart')
btn_cart.addEventListener('mouseover', () => {
    toggle_dropdown(dropdown_cart, true)
})
btn_cart.addEventListener('mouseleave', () => {
    toggle_dropdown(dropdown_cart, false)
})




function toggle_dropdown(target, value) {
    if (value) {
        target.style.display = 'block'
        setTimeout(() => {target.style.opacity = "100%"}, 10);
    } else {
        target.style.opacity = "0%"
        setTimeout(() => {target.style.display = 'none'}, 150);
    }
}


//------------

const btn_lang_mob = document.querySelector('.langToggle_m_TOP')
const close_mobileLang = document.querySelector('.X_wrap.mobileLang')
btn_lang_mob.addEventListener('click', (e) => {
    mobile_langDropdown(true)
})
btn_lang.addEventListener('mouseleave', () => {
    toggle_dropdown(dropdown_lang, false)
})
close_mobileLang.addEventListener('click', (e) => {
    mobile_langDropdown(false)
    
})
function animate_langDropdown(value) {
    const dropdown_lang_mob = document.querySelector('.langToggle_m_BOTTOM')

    if (value) {
        dropdown_lang_mob.style.display = "block"
        setTimeout(() => {dropdown_lang_mob.classList.add('show')}, 10);
    } else {
        dropdown_lang_mob.classList.remove('show')
        setTimeout(() => {dropdown_lang_mob.style.display = "none"}, 151);
    }
}
function mobile_langDropdown(value) {
    const parent = document.querySelector('.langBox_mobile')
    const contents = document.querySelector('.langBox_mobileSubwrap')

    if (value) {
        parent.style.display = "flex"
        setTimeout(() => {
            parent.classList.add('show')
            contents.classList.add('show')
        }, 10);
        
    } else {
        parent.classList.remove('show')
        contents.classList.remove('show')
        setTimeout(() => {parent.style.display = "none"}, 151);
        
    }
}



const options_country = document.querySelectorAll('.currencyOption')
options_country.forEach(x => x.addEventListener('click', (e) => {
    const country = e.currentTarget.dataset.value;
    document.querySelector('input[name="country_code"]').value = country;
    document.querySelector('.form_currency').submit();
}))

