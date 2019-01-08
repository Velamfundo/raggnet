// import {books, courses, interests} from './data';
var CS61a = {
  'name': 'CS61A',
  'category': 'Programming',
  'skills': ['Python', 'Scheme'],
  'authors': ['John Denero'],
  'institution': 'UC Berkeley',
  'inst_shortname': 'berkeley',
  'price': 'Free',
  'featured': true
}

var CS61b = {
  'name': 'CS61B',
  'category': 'Data Structures',
  'skills': ['Java'],
  'authors': ['Paul Hilfinger'],
  'institution': 'UC Berkeley',
  'inst_shortname': 'berkeley',
  'price': 'Free'
}

var CS50 = {
  'name': 'CS50',
  'category': 'Programming',
  'skills': ['C', 'Python', 'JavaScript'],
  'authors': ['David J. Malan'],
  'institution': 'Harvard University',
  'inst_shortname': 'harvard',
  'price': 'Free',
  'featured': true
}

var CS51 = {
  'name': 'CS51',
  'category': 'Programming',
  'skills': ['JavaScript', 'Node.js'],
  'authors': ['David J. Malan'],
  'institution': 'Harvard University',
  'inst_shortname': 'harvard',
  'price': 'Free'
}

var CS110 = {
  'name': 'CS110',
  'category': 'Algorithms & Design',
  'skills': ['Java'],
  'authors': ['Paul Blikstein'],
  'inst_shortname': 'stanford',
  'institution': 'Stanford University',
  'price': 'Free',
  'featured': true
}

var PWAs = {
  'name': 'PWAs',
  'authors': ['Samantha', 'Sam'],
  'skills': ['JavaScript', 'HTML', 'CSS'],
  'category': 'Web Development',
  'institution': 'Google',
  'type': 'course',
  'price': 'Free',
  'inst_shortname': 'google'
}

var SICP = {
  'name': 'SICP',
  'authors': ['Sussman', 'Abelsson'],
  'skills': ['Scheme', 'Lisp'],
  'category': 'Programming',
  'institution': 'MIT',
  'type': 'book',
  'price': 'Free',
  'inst_shortname': 'mit'
}

var books = [SICP];
var interests = ['JavaScript'];
var courses = [CS50, CS61a, CS61b, CS51, CS110, PWAs];

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
  subCats.forEach(subcat => {

  })
  categories += '</ul>';
})

var containerDiv = document.getElementsByClassName('container')[0];
var headerDiv = document.getElementsByTagName('header')[0];
var menuBtn = document.getElementById('menu');
var backBtn = document.createElement('button');
backBtn.className = 'btn';
backBtn.id = 'back';
backBtn.innerHTML = 'Back';

var search = document.getElementById('search');

function extractArrayItems(arr) {
  // arr items must be of type String
  var len = arr.length;

  if (len === 0) {
    return '';
  } else if (len === 1) {
    return arr[0];
  } else if (len === 2) {
    return arr[0] + ' & ' + arr[1];
  } else {
    return arr[0] + ', ' + extractArrayItems(arr.slice(1, len));
  }
}

function forE(collection, callback) {
  for (var i = 0; i < collection.length; i++) {
    callback(collection[i]);
  }
}

function addResources(arr) {
  resourceDiv.innerHTML = '';
  arr.forEach(res => {
    var skills = extractArrayItems(res['skills']);
    var authors = extractArrayItems(res['authors']);

    var widget = document.createElement("div");
    widget.className = 'resource-widget';

    var headerDiv = document.createElement("div");
    headerDiv.className = 'header ' + res['inst_shortname'];

    var bodyDiv = document.createElement("div");
    bodyDiv.className = 'body';

    resourceDiv.appendChild(widget);
    widget.appendChild(headerDiv);
    widget.appendChild(bodyDiv);

    headerDiv.innerHTML = '<h1>' + res['name'] + '</h1>';
    bodyDiv.innerHTML = res['category'] + ': ' + skills + '<br>';
    bodyDiv.innerHTML += authors + ', ' + res['institution'] + '<br>';
    bodyDiv.innerHTML += res['price'];
  });
}

function addFeatured() {
  resourceDiv.id = 'featured';
  search.value = 'Try courses and free eBooks';
  var featured = [];
  courses.forEach(course => {
    if (course['featured']) {
      featured.push(course);
    }
  });
  addResources(featured);
}

function addForYou() {
  resourceDiv.id = 'targeted';
  search.value = 'For you';
  var forYou = [];
  courses.forEach(course => {
    var skills = extractArrayItems(course['skills']);
    for (var i = 0; i < interests.length; i++) {
      if (skills.indexOf(interests[i]) > -1) {
        forYou.push(course);
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
    addForYou();
  }
}

exploreBtn.onclick = function() {
  if (!forYouClicked) {
    explorePop.style.display = "block";
  } else {
    toggleBtn();
    addFeatured();
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
  resourceDiv.id = 'courses'
  search.value = 'Online courses'
  addResources(courses);
}

booksBtn.onclick = function() {
  resourceDiv.id = 'books';
  search.value = 'Books';
  addResources(books);
}

moreBtn.onclick = function() {
  headerDiv.innerHTML = '';
  headerDiv.className = 'header-more';
  footer.style.display = 'none';
  search.value = 'Categories';

  headerDiv.appendChild(backBtn);
  headerDiv.appendChild(search);

  containerDiv.style.marginTop = '12%';
  containerDiv.innerHTML = categories;
}

backBtn.onclick = function() {
  headerDiv.innerHTML = '';
  containerDiv.innerHTML = '';

  switch (resourceDiv.id) {
    case 'courses':
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

window.onload = addFeatured;
