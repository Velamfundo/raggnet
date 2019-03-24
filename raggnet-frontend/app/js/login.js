var form =document.forms[0];

// =============================================================
// Form submit functions
// =============================================================

function submitLogin() {
  var errorMessage = ''
  if (!form.email.value) {
      error(form.email);
      errorMessage += 'Missing email!'
  }
  if (!form.password.value) {
      error(form.password);
      if (errorMessage) errorMessage += '<br />'
      errorMessage += 'Missing password!'
  }
  if (errorMessage) return displayError(errorMessage);

  var data = {
      email: form.email.value,
      password: form.password.value
  };

  fetch('/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) return submitError(res);
    else return res.json();
  })
  .then(result => {
    localStorage.token = result.token;
    window.location = '/?token=' + result.token;
  })
  .catch(submitError);
}

// =============================================================
// Form validation functions
// =============================================================

function error(target) {
    target.style.border = '1px solid #F00';
}

function clearError(target) {
    if (target === 'message')
        return document.getElementById('error-message').style.visibility = 'hidden';
    target.style.border = '1px solid #888';
}

// =============================================================
// Form submit callbacks
// =============================================================

function submitError(res, message) {
  if (res.status >= 400 && res.status < 500)
    return res.text().then(function(message) {displayError(message)});
  if (message)
    return displayError(message);
  return displayError('There was a problem submitting your form. Please try again later.');
}

function displayError(message) {
    var errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = message;
    errorDiv.style.visibility = 'visible';
}
