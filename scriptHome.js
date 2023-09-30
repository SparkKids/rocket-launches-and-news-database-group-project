var options = document.getElementById('options')
var hiddenOption = document.getElementById('hidden-option')

options.selectedIndex = 0;
options.addEventListener('click', (e) => {
    console.log(e.target)
    if(e.target.value === "4"){
        if(hiddenOption.classList.contains('hidden')){
            hiddenOption.classList.remove('hidden')
        }
    } else {
        if (hiddenOption.classList.contains('hidden')){
        } else { hiddenOption.classList.add('hidden')}
    }
})

var btn = document.getElementById('search-btn')
var type = document.getElementById('hiddenInput')
var keyword = document.getElementById('keywordInput')

btn.addEventListener('click', (e)=>{
    e.preventDefault()

    var typeVal = type.value
    var keywordVal = keyword.value

    var link = './search.html?t=' + typeVal +
    '&k=' + keywordVal
    location.href = link
})