var type_list = document.getElementById('options')
var search_specific_input = document.getElementById('hidden-option')
var savedSearches = document.querySelector('.savedSearches')
var search_btn = document.getElementById('search-btn')
var type_input = document.getElementById('hiddenInput')
var search_history_input = document.getElementById('keywordInput')
var clear_btn = document.querySelector('.clear-btn')
var dismissBtn = document.getElementById('dismiss-btn')
var modal = document.getElementById('modal')
var openModal = document.getElementById('open-modal')

// get info from local Storage and set equal to array
var array = []
if (localStorage.getItem('search')) {
    var data = JSON.parse(localStorage.getItem('search'))
    array = data;
}

// clear local storage and visual list at bottom of page when btn clicked
clear_btn.addEventListener('click', () => {
    localStorage.clear()
    savedSearches.innerHTML = ''
})

// print out saved searches
for (let i = 0; i < array.length; i++) {
    var type = array[i].type
    if (array[i].val) {
        var val = array[i].val
    } else var val = 0
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

    search.addEventListener('click', () => {
        
        var input = {
            type: type,
            key: key,
            val: val,
        }

        if (val === 'none') {
            val = ''
        }
        var link = './search.html?t=' + type
            '&k=' + key + '&s=' + val

        location.href = link
    })

    search.append(printType)
    search.append(printVal)
    search.append(printKey)
    savedSearches.append(search)
}


// hidden option un-hidden when specific option is selected
type_list.selectedIndex = 0;
type_list.onchange = (e) => {
    console.log(e.target)
    if (e.target.value === "specific") {
        if (search_specific_input.classList.contains('hidden')) {
            search_specific_input.classList.remove('hidden')
        }
    } else {
        if (search_specific_input.classList.contains('hidden')) {
        } else { search_specific_input.classList.add('hidden') }
    }
}


// MODAL: set link to retrieve later based on user input
search_btn.addEventListener('click', () => {
    console.log(type_input)
    var typeVal = type_list.value
    var keywordVal = search_history_input.value

    if (type_input.value) {
        var val = type_input.value
    } else var val = 'none'

    if (val === 'none') {
        val = ''
    }

    var link = './search.html?t=' + typeVal +
        '&k=' + keywordVal + '&s=' + val

    var input = {
        type: typeVal,
        key: keywordVal,
        val: type_input.value,
    }


    if (document.querySelector('#flexCheckChecked').checked) {
        console.log(link)
        array.push(input)
        localStorage.setItem('search', JSON.stringify(array))
    }

    location.href = link
})


// close modal (inside modal)
dismissBtn.addEventListener('click', (e) => {
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden')
    } else {
        modal.classList.add('hidden')
    }
})

// open modal button
openModal.addEventListener('click', (e) => {
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden')
    } else {
        modal.classList.add('hidden')
    }
})


// for loop to add keywords to search array
var search_array = []
for (let f = 0; f < array.length; f++) {
    search_array.push(array[f].type)
    search_array.push(array[f].val)
}
// function to print out relevant searches from past
// based on user input
function autoComplete(e) {
    var menuEl = document.querySelector('.history-menu')

    // clear menu first
    menuEl.innerHTML = ''

    // if the input matches any search terms in history
    // create objects representing those searches
    if (search_array.includes(e)) {
        for (let i = 0; i < array.length; i++) {
            console.log(search_array)
            
            var menu = document.createElement('h1')
            menu.textContent = array[i].type + " " + array[i].val
            menu.addEventListener('click', (e) => {
                if (val === 'none') {
                    val = ''
                }
                var link = './search.html?t=' + type
                    '&k=' + key + '&s=' + val
        
                location.href = link
            })
            menu.href = ''
            menuEl.append(menu)
        }
    }
    // hide if empty, show if not
    if ( e === '' ) {
        if (menuEl.classList.contains('hidden')) {
            menuEl.classList.remove('hidden')
        }
        menuEl.innerHTML = ''
    } else {
        menuEl.classList.remove('hidden')
    }

}