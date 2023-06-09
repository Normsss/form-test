import content from './content.json' assert { type: "json" };

//Variables
const headerContent = document.querySelector('.form-header-content'),
    formButton = document.querySelector('.form-submit-button'),
    adWrapperLegend = document.querySelector('.ad-wrapper-legend'),
    adHeading = document.querySelector('.ad-heading'),
    adSubHeading = document.querySelector('.ad-subheading'),
    adContent = document.querySelector('.ad-content'),
    linkElement = document.createElement('a'),
    form = document.getElementById('survey-form'),
    borderColor = '#d8d8d8',
    errorBorderColor = '#D50303';

let nameField = document.getElementById("name"),
    emailField = document.getElementById("email"),
    phoneField = document.getElementById("number");    

// Adds content
headerContent.innerHTML = content.formHeaderContent;
formButton.innerHTML = content.button;
adWrapperLegend.innerHTML = content.wrapperLegend;
adHeading.innerHTML = content.adHeading;
adSubHeading.innerHTML = content.adSubHeading;

adContent.innerHTML = content.adContent;
adContent.appendChild(linkElement)
linkElement.innerHTML = content.linkText;

linkElement.classList.add('ad-link');
linkElement.setAttribute('href', `${content.href}`);
linkElement.setAttribute('target', `${content.targetAtr}`);

// Event listeners
phoneField.addEventListener('input', function () {

    var value = phoneField.value;
  
    // Replace letters
    var numericValue = value.replace(/\D/g, '');
  
    // Aply mask (XXX) XXX-XXXX
    var maskedValue = '(' + numericValue.slice(0, 3) + ') ' +
                      numericValue.slice(3, 6) + '-' +
                      numericValue.slice(6, 10);
  
    // Update value
    phoneField.value = maskedValue;
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateForm()) {
        formButton.disabled = true;
        formButton.textContent = content.submitted;

    }

    // gets data
    var name = document.getElementById("name").value.trim();
    var city = document.getElementById("city").value.trim();
    var state = document.getElementById("state").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("number").value.trim();

    // build object to send
    var data = {
      name: name,
      city: city,
      state: state,
      email: email,
      phone: phone
    };

    // ajax
    fetch("https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(function(response) {
        // is server working?
        if (response.ok) {
            formButton.textContent = "Submitted";
        } else {
          throw new Error();
        }
    }).catch(function(error) {
        console.log(error.message);
        formButton.disabled = true;
        formButton.textContent = content.submitted;
    });
  });


function validateForm() {

    let isValid = true;

    if (nameField.value.length < 2) {
        isValid = false;
        highlightInputField(nameField);
    } else {
        clearInputFieldHighlight(nameField)
    }

    if (!emailField.value) {
        isValid = false;
        highlightInputField(emailField);
    } else {
        clearInputFieldHighlight(emailField)
    }

    if (!phoneField.value || !phoneField.checkValidity()) {
        isValid = false;
        highlightInputField(phoneField);
    } else {
        clearInputFieldHighlight(phoneField)
    }

    return isValid;
}

function highlightInputField(inputField) {
    inputField.style.borderColor = errorBorderColor;
}

function clearInputFieldHighlight (inputField) {
    if (inputField.style.borderColor = errorBorderColor){
        inputField.style.borderColor = borderColor;
    }
}







