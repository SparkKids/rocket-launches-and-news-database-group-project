var info = localStorage.getItem('search')
var infoParsed = JSON.parse(info)

var type;
var limit;
var val;
setTimeout(() => {
    if (info && !document.querySelector('.launch_element')) {
        var pop = infoParsed.pop()
        type = pop.type
        limit = pop.limit
        val = pop.val
    
        var link = "./search.html?t=" + type + "&k=" + limit + "&s=" + val;
    
        location.href = link;
    }
}, 800)


