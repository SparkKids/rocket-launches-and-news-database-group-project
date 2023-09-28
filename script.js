
// var fetch = fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/').then((response) => {
//     return response.json();
// }).then((data) => {
//     console.log(data)

    
//     for(let i=0; i < 3; i++){
//         var el = document.createElement('span')
//         // el.textContent = data.results[i].name + " | " + data.results[i].last_updated + " , ";
//         // data.results[i].image
//         var img = document.createElement('image')
//         img.classList.add('image')

//         document.querySelector('.test').append(el)
//         document.querySelector('.test').append(img)
//     }
//     return data;
// })
    const controller = new AbortController()

function dataFetch() {fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=15').then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)

        for(let i=0; i < 15; i++){
            var el = document.createElement('li')
            el.classList.add('article_element')
            el.textContent = data.results[i].title
            var img = document.createElement('image')
            img.classList.add('article_image')
            img.src = data.results[i].image_url
    
            document.querySelector('.article_list').append(el)
            document.querySelector('.article_list').appendChild(img)
        }
    })
}

fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10').then((response) => {
    if(response.ok){
        return response.json()
    } else {
        throw new Error('Too Many Requests, Slow Down!');
    }
    
}).then((data) => {
    console.log(data)

    for(let i=0; i < 10; i++){
        var el = document.createElement('li')
        el.classList.add('launch_element')
        el.textContent = data.results[i].name
        var img = document.createElement('image')
        img.classList.add('launch_image')
        img.src = data.results[i]

        document.querySelector('.launch_list').append(el)
        document.querySelector('.launch_list').append(img)
    }
})

dataFetch()