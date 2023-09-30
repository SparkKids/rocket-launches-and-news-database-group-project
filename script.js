function articlesFetch() {fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=10').then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)

        for(let i=0; i < 10; i++){
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

function launchesFetch() {
    fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=10')
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error('too many requests, slow down');
        }
    }).then((data) => {
        
        console.log(data)

        for(let i=0; i < 10; i++){
            
            var container = document.createElement('div')
            container.classList.add('launch_element')

            var image_container = document.createElement('div')
            image_container.classList.add('launch_image--container')
            var img = document.createElement('img')
            img.classList.add('launch_image')
            img.src = data.results[i].image
            img.setAttribute('alt','Picture of the ' + data.results[i].rocket.configuration.name)
            img.addEventListener('click', (img) => {
                // console.log(img.target.src)
                location.href = img.target.src
            })

            var content_container = document.createElement('div')
            content_container.classList.add('launch_content--container')

            let date = data.results[i].last_updated.split('T')[0]
            var dateElement = document.createElement('div')
            dateElement.textContent = "Last Updated: " + formatDate(date)

            var el = document.createElement('li')
            el.textContent = data.results[i].name

            var desc = document.createElement('p')
            desc.textContent = data.results[i].mission.description.substring(0, 140)
            desc.classList.add('launch_desc')
            var link = document.createElement('a')
            link.href = data.results[i].url
            link.textContent = ' ...more'
            desc.append(link)

            content_container.append(dateElement)
            content_container.append(el)
            content_container.append(desc)
            image_container.append(img)
            container.append(content_container)
            container.append(image_container)
            document.querySelector('.launch_list').append(container)     
        }
    })
}

articlesFetch()
launchesFetch()

function formatDate(date) {
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date1 = new Date(date)
    var newDate = date1.toLocaleDateString("en-US", options)
    return newDate;
}