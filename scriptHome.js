var options = document.getElementById('options')
var hiddenOption = document.getElementById('hidden-option')

options.selectedIndex = 0;
options.onchange = (e) => {
    console.log(e.target)
    if(e.target.value === "specific"){
        if(hiddenOption.classList.contains('hidden')){
            hiddenOption.classList.remove('hidden')
        }
    } else {
        if (hiddenOption.classList.contains('hidden')){
        } else { hiddenOption.classList.add('hidden')}
    }
}


// set link to retrieve later based on user input
var btn = document.getElementById('search-btn')
var type = document.getElementById('hiddenInput')
var keyword = document.getElementById('keywordInput')
btn.addEventListener('click', (e)=>{
    var typeVal = options.value
    var keywordVal = keyword.value

    var link = './search.html?t=' + typeVal +
    '&k=' + keywordVal + '&s=' + type.value
    location.href = link
    e.preventDefault()
})



// close modal (inside modal)
var dismissBtn = document.getElementById('dismiss-btn')
var modal = document.getElementById('modal')
dismissBtn.addEventListener('click', (e) => {
        if(modal.classList.contains('hidden')){
            modal.classList.remove('hidden')
        } else {
            modal.classList.add('hidden')
        }
})


// open modal button
var openModal = document.getElementById('open-modal')
openModal.addEventListener('click', (e) => {
    if(modal.classList.contains('hidden')){
        modal.classList.remove('hidden')
    } else {
        console.log("helo")
        modal.classList.add('hidden')
    }
})