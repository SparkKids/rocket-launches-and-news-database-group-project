var articlesURL = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=10'

// retrieve articles from fetch
function articlesFetch() {fetch(articlesURL).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)

        // create elements using dynamically created elements
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

// format url string so get the type and/or specific search values
var href = location.href.split('=')
var type = href[1].substring(0,href[1].length-2)
var specific = href[3].substring(0,href[3].length)
switch(type){
    case 'upcoming':
        var launchType = 'upcoming/'
        var launchesURL = 'https://lldev.thespacedevs.com/2.2.0/launch/' + launchType
        break;
    case 'previous':
        var launchType = 'previous/'
        var launchesURL = 'https://lldev.thespacedevs.com/2.2.0/launch/' + launchType
        break;
    case 'specific':
        var launchSearch = specific
        var launchesURL = "https://lldev.thespacedevs.com/2.2.0/launch?mode=list&search=" + launchSearch
        break;
    default:
        var launchType = ''
        var launchesURL = 'https://lldev.thespacedevs.com/2.2.0/launch/' + launchType
        break;
}
var keywords = href[2]

function launchesFetch() {
    fetch(launchesURL)
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            confirm("non-valid rocket name")
            throw new Error(error);
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
            if (data.results[i].rocket){
                img.setAttribute('alt','Picture of the ' + data.results[i].rocket.configuration.name)
            } else {
                img.setAttribute('alt','Picture of the ' + data.results[i].name)
            }
            
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
            if(data.results[i].mission.description){
                desc.textContent = data.results[i].mission.description.substring(0, 140)
            } else {
                desc.textContent = data.results[i].status.description.substring(0, 140)
            }
            var currentDate = dayjs()
            var newDate = dayjs(formatDate(date))
            var d = newDate.diff(currentDate)
            
            desc.classList.add('launch_desc')
            var link = document.createElement('a')
            link.href = data.results[i].url
            link.textContent = ' ...more'
            desc.append(link)

            var clock = document.createElement('span')
            clock.setAttribute('id', 'clock' + i)
            

            content_container.append(dateElement)
            content_container.append(clock)
            content_container.append(el)
            content_container.append(desc)
            image_container.append(img)
            container.append(content_container)
            container.append(image_container)
            document.querySelector('.launch_list').append(container)
            // document.getElementById('clock' + i).textContent = '00:00:00:00'   
        }
        // ------------ CLOCK FUNCTION -----------
        var clocks = []

        for (let f = 0; f < 10; f++) {
            clocks.push(document.getElementById('clock' + f))

        }

        var objects = []

        for (var i = 0; i < 10; i++) {
            var testTime = {
                time: 0,
                secs: function () { return (this.time / 1000) },
                mins: function () { return (this.time / (1000 * 60)) },
                hours: function () { return (this.time / (1000 * 60 * 60)) },
                days: function () { return (this.time / (1000 * 60 * 60 * 24)) },
            }
            let date = data.results[i].net.split('T')[0]
            var currentDate = dayjs()
            var newDate = dayjs(formatDate(date))
            var d = newDate.diff(currentDate)
            console.log(d)
            if (d < 0){
                
            }

            testTime.time = d
            objects.push(testTime)
        }
        var that = objects

        var clockInterval = setInterval(() => {
            for (let i = 0; i < objects.length; i++) {
                that[i].time -= 1000

                var dayF = Math.floor(that[i].days())
                var hrsF = Math.floor(that[i].hours() % 24)
                var minF = Math.floor(that[i].mins() % 60)
                var secF = Math.floor(that[i].secs() % 60)

                if (dayF.toString().includes('-')){
                    document.getElementById('clock' + i).style.color = 'red';
                    
                    secF = secF.toString().slice(1,3)
                    minF = minF.toString().slice(1,3)
                    hrsF = hrsF.toString().slice(1,3)
                    dayF = dayF.toString().slice(1,3)
                } else {
                    document.getElementById('clock' + i).style.color = 'lightgreen';
                }
                
                if (hrsF.toString().length < 2) {
                    hrsF = "0" + hrsF
                }
                if (minF.toString().length < 2) {
                    minF = "0" + minF
                }
                if (secF.toString().length < 2) {
                    secF = "0" + secF
                }
                if (dayF.toString().length < 2) {
                    dayF = "0" + dayF
                }

                

                clocks[i].textContent = dayF + " : " + hrsF + " : " + minF + " : " + secF

            }

        }, 1000)
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

var launchContentContainer = document.querySelector('.launch_list').childNodes

