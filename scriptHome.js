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

var btn = document.getElementById('search-btn')
var type = document.getElementById('hiddenInput')
var keyword = document.getElementById('keywordInput')

btn.addEventListener('click', (e)=>{
    e.preventDefault()

    var typeVal = options.value
    console.log(typeVal)
    var keywordVal = keyword.value

    var link = './search.html?t=' + typeVal +
    '&k=' + keywordVal + '&s=' + type.value
    location.href = link
})

var dismissBtn = document.getElementById('dismiss-btn')
var modal = document.getElementById('modal')

dismissBtn.addEventListener('click', (e) => {
        if(modal.classList.contains('hidden')){
            modal.classList.remove('hidden')
        } else {
            console.log("helo")
            modal.classList.add('hidden')
        }
})

var openModal = document.getElementById('open-modal')

openModal.addEventListener('click', (e) => {
    if(modal.classList.contains('hidden')){
        modal.classList.remove('hidden')
    } else {
        console.log("helo")
        modal.classList.add('hidden')
    }
})