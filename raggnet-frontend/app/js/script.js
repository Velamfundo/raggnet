var colors = {'berkeley': '#0000ff',
              'stanford': '#b1040e',
              'harvard': '#a1020e',
              'google': '#0a3',
              'mit': 'purple',
              'other': '#e0bc0f'
            }

var hash = '';

function page(url) {
  this.url = url;
  this.render = function() {
    loadView(this.url);
  }
};

var Books = new page('/books');
var Moocs = new page('/moocs');
var ForYou = new page('/foryou');
var More = new page('/more');
var Home = new page('/');
Home.render = addFeatured;
More.render = loadMoreView;
ForYou.render = addForYou; // fetch handpicked resources from db

const routes = {
  '/': Home,
  '/books': Books,
  '/moocs': Moocs,
  '/foryou': ForYou,
  '/more': More
};

function router() {
  if (hash === 'more') {
    goBack();
  } else {
    var url = window.location.hash.slice(1).toLowerCase() || '/';
    var page = routes[url];
    page.render();
  }
  hash  = window.location.hash.slice(2) || '';
}

// TODO: redefine addResources to match db results
// OR: redesign schemas to match addResources architecture
// TODO: Design the display architecture of resources
var CS61a = {
  'name': 'CS61A',
  'category': 'Programming',
  'skills': ['Python', 'Scheme'],
  'authors': ['John Denero'],
  'institution': 'UC Berkeley',
  'instShortName': 'berkeley',
  'price': 100,
  'featured': true
}

var CS61b = {
  'name': 'CS61B',
  'category': 'Data Structures',
  'skills': ['Java'],
  'authors': ['Paul Hilfinger'],
  'institution': 'UC Berkeley',
  'instShortName': 'berkeley',
  'price': 100
}

var CS50 = {
  'name': 'CS50',
  'category': 'Programming',
  'skills': ['C', 'Python', 'JavaScript'],
  'authors': ['David J. Malan'],
  'institution': 'Harvard University',
  'instShortName': 'harvard',
  'price': 50,
  'featured': true
}

var CS51 = {
  'name': 'CS51',
  'category': 'Programming',
  'skills': ['JavaScript', 'Node.js'],
  'authors': ['David J. Malan'],
  'institution': 'Harvard University',
  'instShortName': 'harvard',
  'price': 51
}

var CS110 = {
  'name': 'CS110',
  'category': 'Algorithms & Design',
  'skills': ['Java'],
  'authors': ['Paul Blikstein'],
  'instShortName': 'stanford',
  'institution': 'Stanford University',
  'price': 0,
  'featured': true
}

var PWAs = {
  'name': 'PWAs',
  'authors': ['Samantha', 'Sam'],
  'skills': ['JavaScript', 'HTML', 'CSS'],
  'category': 'Web Development',
  'institution': 'Google',
  'type': 'course',
  'price': 25.5,
  'instShortName': 'google'
}

var SICP = {
  'name': 'SICP',
  'authors': ['Sussman', 'Abelsson'],
  'skills': ['Scheme', 'Lisp'],
  'category': 'Programming',
  'institution': 'MIT',
  'type': 'book',
  'price': 14,
  'instShortName': 'mit'
}

function loadView(route) {
  switch (route) {
    case '/books':
      resourceDiv.id = 'books';
      search.value = 'Books';
      break;
    case '/moocs':
      resourceDiv.id = 'moocs';
      search.value = 'Online Courses';
      break;
    default:
      resourceDiv.id = search.value = '';
  }

  return fetch(route)
  .then(res => {
    return res.json();
  })
  .then(resources => {
    addResources(resources);
  })
  .catch(err => {
    console.error(err);
  });
}

function loadMoreView() {
  headerDiv.className = 'header-more';
  footer.style.display = 'none';
  search.value = 'Categories';

  containerDiv.style.marginTop = '12%';
  containerDiv.innerHTML = categories;
}

var interests = ['JavaScript'];
var resources = [CS50, CS61a, CS61b, CS51, CS110, PWAs];

var exploreBtn = document.getElementById('explore');
var explorePop = document.getElementsByClassName('explorePop')[0];
var moocsBtn = document.getElementById('moocs');
var booksBtn = document.getElementById('ebooks');
var moreBtn = document.getElementById('more');
// var body = document.getElementsByTagName('body');
var footer = document.getElementsByTagName('footer')[0];

var resourceDiv = document.getElementsByClassName("resource")[0];

var forYouBtn = document.getElementById('foryou');
var exploreBtn = document.getElementById('explore');
var forYouClicked = false;

var Categories = {
  'Online courses': ['Live', 'Certified', 'Sites'],
  'To do': ['Libraries', 'Meetups', 'Forums', 'Conferences', 'Careers'],
  'eBooks': ['Read', 'Free', 'Order'],
}

var categories = '';

Object.keys(Categories).forEach(category => {
  var subCats = Categories[category];
  categories += '<div class="category">' + category + '</div><ul>';

  for (var i = 0; i < subCats.length;) {
    categories += '<li><button class="btn">' + subCats[i] + '</button></li>';

    if (++i < subCats.length)  {
      categories += '<hr>';
    }
  }
  categories += '</ul>';
})

var containerDiv = document.getElementsByClassName('container')[0];
var headerDiv = document.getElementsByTagName('header')[0];
var menuBtn = document.getElementById('menu');

var search = document.getElementById('search');

function extractArrayItems(arr) {
  // arr items must be of type String
  switch (arr.length) {
    case 0:
      return '';
      break;
    case 1:
      return arr[0];
      break;
    case 2:
      return arr[0] + ' & ' + arr[1];
      break;
    default:
      return arr[0] + ', ' + extractArrayItems(arr.slice(1, arr.length));
  }
}

function forE(collection, callback) {
  for (var i = 0; i < collection.length; i++) {
    callback(collection[i]);
  }
}

function notify(res) {
  var now = Date.parse(new Date());
  var thirtyDays = 2592000000;
  if (res.startDate <= now && res.endDate >= now) {
    return 'Happening now!';
  } else if ((now - Date.parse(res.approvedDate)) <= thirtyDays) {
    return 'New!';
  } else {
    return '';
  }
}

function addResources(arr) {
  resourceDiv.innerHTML = '';
  arr.forEach(res => {
    var skills = (res.skills) ? 'Learn ' + extractArrayItems(res.skills): '';
    var authors = extractArrayItems(res.authors);
    var price = (res.price === 0) ? 'Free': '$' + res.price;

    var widget = document.createElement("div");
    widget.className = 'resource-widget';

    //headerDiv
    var headerDiv = document.createElement("div");
    headerDiv.className = 'header ' + res.instShortName;
    //headDiv
    var headDiv = document.createElement("div");
    headDiv.className = 'head';
    headDiv.innerHTML = '<div id="category">' + res.category + '</div>';
    headDiv.innerHTML += '<div id="notify">' + notify(res) + '</div>';
    //mainDiv
    var mainDiv = document.createElement("div");
    mainDiv.className = 'main';
    mainDiv.innerHTML = '<span id="name">' + res.name + '</span> <br>';
    mainDiv.innerHTML += authors + ', <br>' + res.institution;
    //footDiv
    var footDiv = document.createElement("div");
    footDiv.className = 'foot';
    footDiv.innerHTML = '<div id="price">' + price + '</div>';

    if (colors[res.instShortName]) {
      headerDiv.style.backgroundColor = colors[res.instShortName];
    } else {
      headerDiv.style.backgroundColor = colors.other;
    }

    headerDiv.appendChild(headDiv);
    headerDiv.appendChild(mainDiv);
    headerDiv.appendChild(footDiv);

    //bodyDiv
    var bodyDiv = document.createElement("div");
    bodyDiv.className = 'body';

    resourceDiv.appendChild(widget);
    widget.appendChild(headerDiv);
    widget.appendChild(bodyDiv);

    bodyDiv.innerHTML = skills + '<br>';
    if (res.prerequisites && (res.prerequisites.length > 0)) {
      bodyDiv.innerHTML += 'Prerequisites: ' + extractArrayItems(res.prerequisites);
    }
  });
}

function addFeatured() {
  resourceDiv.id = 'featured';
  search.value = 'Featured';
  var featured = [];
  resources.forEach(res => {
    if (res.featured) {
      featured.push(res);
    }
  });
  addResources(featured);
}

// TODO: handpick both books and courses
function addForYou() {
  resourceDiv.id = 'targeted';
  search.value = 'For you';
  var forYou = [];
  resources.forEach(res => {
    var skills = extractArrayItems(res.skills);
    for (var i = 0; i < interests.length; i++) {
      if (skills.indexOf(interests[i]) > -1) {
        forYou.push(res);
        i = interests.length;
      }
    }
  });
  addResources(forYou);
}

function toggleBtn() {
  forYouClicked = !forYouClicked;
  if (forYouClicked) {
    forYouBtn.style.color = '#0000ff';
    exploreBtn.style.color = '#544948';
  } else {
    forYouBtn.style.color = '#544948';
    exploreBtn.style.color = '#0000ff';
  }
}

forYouBtn.onclick = function() {
  if (!forYouClicked) {
    toggleBtn();
    window.location.hash = '#/foryou';
  }
}

exploreBtn.onclick = function() {
  if (!forYouClicked) {
    explorePop.style.display = "block";
  } else {
    toggleBtn();
    window.location.hash = '';
  }
}

window.onclick = function() {
  if (event.target != explorePop && event.target != exploreBtn) {
    explorePop.style.display = "none";
  }
}

window.onscroll = function() {
  explorePop.style.display = "none";
}

moocsBtn.onclick = function() {
  window.location.hash = '#/moocs';
}

booksBtn.onclick = function() {
  window.location.hash = '#/books';
}

moreBtn.onclick = function() {
  window.location.hash = '#/more';
}

function goBack() {
  headerDiv.innerHTML = '';
  containerDiv.innerHTML = '';

  switch (resourceDiv.id) {
    case 'moocs':
      search.value = 'Online courses';
      break;
    case 'books':
      search.value = 'Books';
      break;
    default:
      search.value = 'Try courses and free eBooks';
  }

  headerDiv.appendChild(menuBtn);
  headerDiv.appendChild(search);
  containerDiv.appendChild(resourceDiv);
  footer.style.display = 'block';
}

window.onload = router;
window.onhashchange = router;
