window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    if (filter) {filter_items(filter); toggle_activeFilter(filter)}
})

const filters_ALL = document.querySelectorAll('.filter')
const filterToggles = document.querySelectorAll('div[data-toggle="filters"]')

filterToggles.forEach(x => x.addEventListener('click', toggle_filterBox))
filters_ALL.forEach(x => x.addEventListener('click', (e) => {
    const word = e.currentTarget.dataset.filter
    filter_items(word)
    toggle_activeFilter(word)
    scroll_top()
    if(current_Display() == "tablet" || current_Display() == "mobile"){toggle_filterBox()}
})	
)

function filter_items(word) {
    let count = 0
    const products_All = document.querySelectorAll('.product.w-dyn-item')
    products_All.forEach(product => {
        if (word == 'all' || product.firstElementChild.textContent == word){product.style.display = 'flex'; count++}
        else if (word == 'sale' && !product.lastElementChild.classList.contains('w-condition-invisible')) {product.style.display = 'flex'; count++}
        else {product.style.display = 'none'}
    })  
    document.querySelector('.filter_count').textContent = count      
}
function toggle_activeFilter(filterTag) {    //separate funtion because of filtering on load with URL
    let word_activeBtn
    filters_ALL.forEach(y => { 
    if (y.dataset.filter == filterTag){y.classList.add('active'); word_activeBtn = y.lastElementChild.textContent} else {y.classList.remove('active')}   
    })      
    handle_filterText(filterTag, word_activeBtn)
}
function handle_filterText(filterTag, word_activeBtn) {
    const icon_current = document.getElementById('icon_current_filter')
    const btnText = document.getElementById('text_current_filter')
    const pageTitle = document.getElementById('page_title')
    if (filterTag == "all") {
        icon_current.classList.add('hide')
        pageTitle.textContent = "Prekės"
}
    else {
    icon_current.classList.remove('hide') 
    icon_current.src = document.querySelector(`img[data-filter_img="${filterTag}"`).src
    pageTitle.textContent = word_activeBtn
}
    btnText.textContent = word_activeBtn
}
function toggle_filterBox() {
    const fiterBox = document.querySelector('.conwrap_mobile_filters')
    if (!fiterBox.classList.contains('open')) {
        fiterBox.style.display = 'flex'
        setTimeout(() => {fiterBox.classList.toggle('open')}, 10)}
    else {
        fiterBox.classList.toggle('open')
        setTimeout(() => {fiterBox.style.display = 'none'}, 151);
    }
}
function scroll_top() {
    if (isDesktop() || current_Display() == "tablet") {window.scrollTo({top: 160, behavior: "smooth", duration: 2000})}
    else {setTimeout(() => {window.scrollTo({top: 0, behavior: "smooth", duration: 2000})}, 150)}
}

//--------------------------------------------------------------------------------

function isDesktop() {return window.innerWidth > 991 ? true : false}
function current_Display() {
    return window.innerWidth > 1439 ? 'desktop_big' :
            window.innerWidth > 991 ? 'desktop' :
            window.innerWidth > 767 ? 'tablet' :
            'mobile';
}