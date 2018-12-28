var exploreBtn = document.getElementById('explore');
var explorePop = document.getElementsByClassName('explorePop')[0];

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

var interests = ['JavaScript']

var courses = [CS50, CS61a, CS61b, CS51, CS110];
var featuredDiv = document.getElementById("featured");

var forYouBtn = document.getElementById('foryou');
var exploreBtn = document.getElementById('explore');
var forYouClicked = false;

function extractArrayItems(arr) {
  // arr items must be of type String
  if (arr.length === 0) {
    return '';
  } else if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr[0] + ' & ' + arr[1];
  } else {
    return arr.splice(0, 1) + ', ' + extractArrayItems(arr);
  }
}

function forE(collection, callback) {
  for (var i = 0; i < collection.length; i++) {
    callback(collection[i]);
  }
}

function addResources(arr) {
  featuredDiv.innerHTML = '';
  arr.forEach(res => {
    var skills = extractArrayItems(res['skills']);
    var authors = extractArrayItems(res['authors']);

    var widget = document.createElement("div");
    widget.className = 'resource-widget';

    var headerDiv = document.createElement("div");
    headerDiv.className = 'header ' + res['inst_shortname'];

    var bodyDiv = document.createElement("div");
    bodyDiv.className = 'body';

    featuredDiv.appendChild(widget);
    widget.appendChild(headerDiv);
    widget.appendChild(bodyDiv);

    headerDiv.innerHTML = '<h1>' + res['name'] + '</h1>';
    bodyDiv.innerHTML = res['category'] + ': ' + skills + '<br>';
    bodyDiv.innerHTML += authors + ', ' + res['institution'] + '<br>';
    bodyDiv.innerHTML += res['price'];
  });
}

function addFeatured() {
  var featured = [];
  courses.forEach(course => {
    if (course['featured']) {
      featured.push(course);
    }
  });
  addResources(featured);
}

function addForYou() {
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
window.onload = addFeatured;

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
