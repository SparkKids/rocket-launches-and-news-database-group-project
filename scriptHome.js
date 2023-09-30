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