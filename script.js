
dayjs.extend(dayjs_plugin_duration)




var articlesURL = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=10'


function articlesFetch() {fetch(articlesURL).then((response) => {
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

var href = location.href.split('=')
var type = href[1].substring(0,href[1].length-2)
var specific = href[3].substring(0,href[3].length)
switch(type){
    case 'upcoming':
        var launchType = 'upcoming/'
        break;
    case 'previous':
        var launchType = 'previous/'
        break;
    case 'specific':
        var launchSearch = specific
    break;
    default:
        var launchType = ''
}
var keywords = href[2]

console.log(type)
var launchesURLsearch = "https://lldev.thespacedevs.com/2.2.0/launch?mode=list&search=" + launchSearch
var launchesURL = 'https://lldev.thespacedevs.com/2.2.0/launch/' + launchType

function launchesFetch() {
    fetch(launchesURL)
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            confirm("non-valid rocket name")
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

            let date = data.results[i].net.split('T')[0]
            var dateElement = document.createElement('div')
            dateElement.textContent = formatDate(date)

            var el = document.createElement('li')
            el.textContent = data.results[i].name

            var desc = document.createElement('p')
            desc.textContent = data.results[i].mission.description.substring(0, 140)
            desc.classList.add('launch_desc')
            var link = document.createElement('a')
            link.href = data.results[i].url
            link.textContent = ' ...more'
            desc.append(link)

            var clock = document.createElement('span')
            clock.setAttribute('id', 'clock' + i)
            var currentDate = dayjs()
            var newDate = dayjs(formatDate(date))
            var d = newDate.diff(currentDate)
            var val = msToTime(Math.abs(d))
            clock.innerHTML = val
            console.log(msToTime(Math.abs(d)))

            content_container.append(dateElement)
            content_container.append(clock)
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

function msToTime(ms) {
    
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    
    var countDown = setInterval(() => {
        
        if(Math.floor(seconds)%60 === 0){
            minutes--
            seconds = 60
            
        } else if (Math.floor(minutes)%60 === 0){
            hours--
            minutes = 59
            seconds = 60
        } else if (Math.floor(hours) === 0) {
            days--
            hours = 23
            minutes = 59
            seconds = 60
        } else if (days === 0){
            clearInterval(countDown);
        }

        seconds=seconds-1
        return (Math.floor(days) + " : " + (hours%24).toFixed() + " : " + (minutes%60).toFixed() + " : " + (seconds%60).toFixed());
    }, 1000)
    
  }