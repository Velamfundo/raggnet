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
  'tags': ['Programming', 'Python', 'Scheme'],
  'author': 'John Denero',
  'institution': 'UC Berkeley',
  'instShortName': 'berkeley',
  'price': 100,
  'featured': true
}

var CS61b = {
  'name': 'CS61B',
  'tags': ['Data Structures', 'Java'],
  'author': 'Paul Hilfinger',
  'institution': 'UC Berkeley',
  'instShortName': 'berkeley',
  'price': 100
}

var CS50 = {
  'name': 'CS50',
  'tags': ['Programming', 'C', 'Python', 'JavaScript'],
  'author': 'David J. Malan',
  'institution': 'Harvard University',
  'instShortName': 'harvard',
  'price': 50,
  'featured': true
}

var CS51 = {
  'name': 'CS51',
  'tags': ['JavaScript', 'Node.js', 'Programming'],
  'author': 'David J. Malan',
  'institution': 'Harvard University',
  'instShortName': 'harvard',
  'price': 51
}

var CS110 = {
  'name': 'CS110',
  'tags': ['Java', 'Algorithms & Design'],
  'author': 'Paul Blikstein',
  'instShortName': 'stanford',
  'institution': 'Stanford University',
  'price': 0,
  'featured': true
}

var PWAs = {
  'name': 'PWAs',
  'author': 'Samantha Aguilera',
  'tags': ['Web Development', 'JavaScript', 'HTML', 'CSS'],
  'institution': 'Google',
  'type': 'course',
  'price': 25.5,
  'instShortName': 'google'
}

var SICP = {
  'name': 'SICP',
  'author': 'Jay Sussman',
  'tags': ['Programming','Scheme', 'Lisp'],
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

  containerDiv.style.marginTop = '20%';
  containerDiv.innerHTML = categories;
}

var resources = [CS50, CS61a, CS61b, CS51, CS110, PWAs];

var exploreBtn = document.getElementById('explore');
var explorePop = document.getElementsByClassName('explorePop')[0];
var moocsBtn = document.getElementById('moocs');
var booksBtn = document.getElementById('ebooks');
var moreBtn = document.getElementById('more');
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
  var n = arr.length;
  var hsDiv = document.createElement('div');
  hsDiv.className = 'hs';
  resourceDiv.innerHTML = '';
  hsDiv.style.setProperty('--total', n);
  arr.forEach(res => {
    var author = res.author;
    var tags = res.tags;

    var cardDiv = document.createElement("div");
    cardDiv.className = 'card';

    cardDiv.innerHTML = '<h2>' + res.name + '</h2>';

    var metaDiv = document.createElement('div');
    metaDiv.className = 'resource-meta';

    var authorDiv = document.createElement("div");
    authorDiv.className = 'author';
    authorDiv.innerHTML = '<span id="authored-by">Written by</span><br>' + author;

    var tagsDiv = document.createElement("div");
    tagsDiv.className = 'tags';

    tags.forEach(tag => {
      tagsDiv.innerHTML += '<div class="tag">' + tag + '</div>';
    });

    cardDiv.style.backgroundColor = '#ff4500';

    metaDiv.appendChild(authorDiv);
    metaDiv.appendChild(tagsDiv);
    cardDiv.appendChild(metaDiv);
    hsDiv.appendChild(cardDiv);
  });
  resourceDiv.appendChild(hsDiv);
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
  var token = localStorage.token || window.location.search.slice(1);
  var interests;

  if (!token) {
    window.location = '/login';
    return;
  }

  fetch('/user', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    method: 'GET'
  })
  .then(res => {
    if (!res.ok) {
      window.location = '/login';
      return;
    } else return res.json().then(result => {
      interests = result.interests;
      resourceDiv.id = 'targeted';
      search.value = 'For you';
      var forYou = [];
      resources.forEach(res => {
        var tags = extractArrayItems(res.tags);
        for (var i = 0; i < interests.length; i++) {
          if (tags.indexOf(interests[i]) > -1) {
            forYou.push(res);
            i = interests.length;
          }
        }
      });
      addResources(forYou);
    });
  })
  .catch(err => {
    console.error(err);
  })
}

function toggleBtn() {
  forYouClicked = !forYouClicked;
  if (forYouClicked) {
    forYouBtn.style.color = '#2364f3';
    exploreBtn.style.color = '#544948';
  } else {
    forYouBtn.style.color = '#544948';
    exploreBtn.style.color = '#2364f3';
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
  containerDiv.style.marginTop = '';

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
