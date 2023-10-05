var options = document.getElementById('options')
var hiddenOption = document.getElementById('hidden-option')
var savedSearches = document.querySelector('.savedSearches')
var btn = document.getElementById('search-btn')
var type = document.getElementById('hiddenInput')
var keyword = document.getElementById('keywordInput')

var array = []
if (localStorage.getItem('search')) {
    var data = JSON.parse(localStorage.getItem('search'))
    array = data

}

// print out saved searches
for (let i = 0; i < array.length; i++) {
    var type = array[i].type
    var val = array[i].val
    var key = array[i].key

    var search = document.createElement('span')
    search.classList = 'hover:cursor-pointer hover:bg-[#2d446c] p-2 rounded-md flex flex-row m-2'

    var printType = document.createElement('h1')
    printType.classList = 'm-2 text-green-500'
    printType.textContent = type

    var printVal = document.createElement('h1')
    printVal.classList = 'm-2 text-red-700'
    printVal.textContent = val

    var printKey = document.createElement('h1')
    printKey.classList = 'm-2 text-green-500'
    printKey.textContent = key

    if (!array[i].type) {
        type = 'none'
    } else if (type == 0) {
        type = 'none'
    }
    if (!array[i].val) {
        val = 'none'
    }
    if (!array[i].key) {
        key = 'none'
    }

    savedSearches.classList = 'flex flex-col'

    search.addEventListener('click', (e) => {
        
        var input = {
            type: type,
            key: key,
            val: val,
        }

        var link = './search.html?t=' + input.type +
            '&k=' + input.key + '&s=' + input.val

        location.href = link

        e.preventDefault()
    })

    search.append(printType)
    search.append(printVal)
    search.append(printKey)
    savedSearches.append(search)
}


options.selectedIndex = 0;
options.onchange = (e) => {
    console.log(e.target)
    if (e.target.value === "specific") {
        if (hiddenOption.classList.contains('hidden')) {
            hiddenOption.classList.remove('hidden')
        }
    } else {
        if (hiddenOption.classList.contains('hidden')) {
        } else { hiddenOption.classList.add('hidden') }
    }
}


// set link to retrieve later based on user input

btn.addEventListener('click', (e) => {

    var typeVal = options.value
    var keywordVal = keyword.value

    var link = './search.html?t=' + typeVal +
        '&k=' + keywordVal + '&s=' + type.value

    var input = {
        type: typeVal,
        key: keywordVal,
        val: type.value,
    }


    if (document.querySelector('#flexCheckChecked').checked) {
        console.log("yes")
        array.push(input)
        localStorage.setItem('search', JSON.stringify(array))
    } else {
        return
    }

    location.href = link

    e.preventDefault()
})



// close modal (inside modal)
var dismissBtn = document.getElementById('dismiss-btn')
var modal = document.getElementById('modal')
dismissBtn.addEventListener('click', (e) => {
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden')
    } else {
        modal.classList.add('hidden')
    }
})


// open modal button
var openModal = document.getElementById('open-modal')
openModal.addEventListener('click', (e) => {
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden')
    } else {
        modal.classList.add('hidden')
    }
})