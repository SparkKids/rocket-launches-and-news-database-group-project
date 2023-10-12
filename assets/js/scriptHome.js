var type_list = document.getElementById("options");
var search_specific_input = document.getElementById("hidden-option");
var savedSearches = document.querySelector(".savedSearches");
var search_btn = document.getElementById("search-btn");
var type_input = document.getElementById("hiddenInput");
var search_history_input = document.getElementById("limitInput");
var clear_btn = document.querySelector(".clear-btn");
var dismissBtn = document.getElementById("dismiss-btn");
var modal = document.getElementById("modal");
var openModal = document.getElementById("open-modal");

// get info from local Storage and set equal to array
var array = [];
if (localStorage.getItem("search")) {
  var data = JSON.parse(localStorage.getItem("search"));
  array = data;
}

// clear local storage and visual list at bottom of page when btn clicked
clear_btn.addEventListener("click", () => {
  localStorage.clear();
  savedSearches.innerHTML = "";
});

// print out saved searches
for (let i = 0; i < array.length; i++) {
  var type = array[i].type;
  if (array[i].val) {
    var val = array[i].val;
  } else var val = 'none';
  var limit = array[i].limit;

  
  if (!array[i].type) {
    type = "none";
  } else if (type == 0) {
    type = "none";
  }
  if (!array[i].val) {
    val = "none";
  }
  if (!array[i].limit) {
    limit = "none";
  }

  var search = document.createElement("span");
  search.classList = "hover:cursor-pointer hover:bg-[#2d446c] p-2 rounded-md flex flex-row m-2";

  var printType = document.createElement("h1");
  printType.classList = "m-2 text-white";
  printType.textContent = type;

  var printVal = document.createElement("h1");
  printVal.classList = "m-2 text-[hsl(218,81%,75%)]";
  printVal.textContent = val;

  var printlimit = document.createElement("h1");
  printlimit.classList = "m-2 text-[hsl(218,81%,75%)]";
  printlimit.textContent = limit;

  savedSearches.classList = "flex flex-col";

  search.addEventListener("click", (e) => {
    
    searchTerms = e.target.outerText.split('\n')
    console.log(searchTerms)
    var typeVal = searchTerms[0];

    var val = searchTerms[1];

    limitVal = searchTerms[2]

    if (searchTerms[2]) {
      var limitVal = searchTerms[2];
    } else var val = "none";

    if (val === "none") {
      val = "";
    }

    var link = "./search.html?t=" + typeVal + "&k=" + limitVal + "&s=" + val;

    console.log(link)
    location.href = link;
  });

  search.append(printType);
  search.append(printVal);
  search.append(printlimit);
  savedSearches.append(search);
}

// hidden option un-hidden when specific option is selected
type_list.selectedIndex = 0;
type_list.onchange = (e) => {
  console.log(e.target);
  if (e.target.value === "specific") {
    if (search_specific_input.classList.contains("hidden")) {
      search_specific_input.classList.remove("hidden");
    }
  } else {
    if (search_specific_input.classList.contains("hidden")) {
    } else {
      search_specific_input.classList.add("hidden");
    }
  }
};

// MODAL: set link to retrieve later based on user input
search_btn.addEventListener("click", () => {
  console.log(type_input);
  var typeVal = type_list.value;
  var limitVal = search_history_input.value;

  if (type_input.value) {
    var val = type_input.value;
  } else var val = "none";

  if (val === "none") {
    val = "";
  }

  var link = "./search.html?t=" + typeVal + "&k=" + limitVal + "&s=" + val;

  var input = {
    type: typeVal,
    limit: limitVal,
    val: type_input.value,
  };

  if (document.querySelector("#flexCheckChecked").checked) {
    console.log(link);
    array.push(input);
    localStorage.setItem("search", JSON.stringify(array));
  }

  location.href = link;
});

// MODAL: close (inside modal)
dismissBtn.addEventListener("click", (e) => {
  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
  } else {
    modal.classList.add("hidden");
  }
});

// MODAL: open button
openModal.addEventListener("click", (e) => {
  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
  } else {
    modal.classList.add("hidden");
  }
});

// for loop to add limitwords to search array
var search_array = [];
for (let f = 0; f < array.length; f++) {
  search_array.push(array[f].type);
  search_array.push(array[f].val);
}
// function to print out relevant searches from past
// based on user input
function autoComplete(e) {
  var menuEl = document.querySelector(".history-menu");

  // clear menu first
  menuEl.innerHTML = "";

  // if the input matches any search terms in history
  // create objects representing those searches
  if (search_array.toString().includes(e)) {
    for (let i = 0; i < array.length; i++) {
      // console.log(search_array);

      var menu = document.createElement("h1");
      menu.textContent = array[i].type + " " + array[i].val;

      menu.addEventListener("click", (e) => {
        var valuesArray = e.target.innerText.split(" ");
        var val = valuesArray[1];
        var type = valuesArray[0];

        if (val === "none") {
          val = "";
        }

        var link = "./search.html?t=" + type + "&k=" + limit + "&s=" + val;

        location.href = link;
      });
      menu.href = "";
      menuEl.append(menu);
    }
  }
  // hide if empty, show if not
  if (e === "") {
    if (menuEl.classList.contains("hidden")) {
      menuEl.classList.remove("hidden");
    }
    menuEl.innerHTML = "";
  } else {
    menuEl.classList.remove("hidden");
  }
}
