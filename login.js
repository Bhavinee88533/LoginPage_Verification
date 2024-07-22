let radioBtn = document.querySelectorAll(".btn-group input[type='radio']");
let fieldset = document.querySelectorAll("fieldset");
let submit = document.querySelector("#submitButton");
let form = document.querySelector("#signupForm");
let feedback = document.querySelector("#feedback");

radioBtn.forEach((btn) => {
  btn.addEventListener("change", () => {
    if (btn.checked) {
      fieldset.forEach((field) => {
        field.removeAttribute('disabled');
      });
      submit.removeAttribute('disabled');
    }
  });
});


async function submitForm() {
  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  const dob = document.getElementById('dob').value;

  if (!name || !mobile || !dob) {
    feedback.innerHTML = '<div class="alert alert-danger">Please fill in all fields.</div>';
    return;
  }

  if (!window.hive_keychain) {
    feedback.innerHTML = '<div class="alert alert-danger">Hive Keychain is not installed! Please install the Hive Keychain extension and try again.</div>';
    return;
  }

  try {
    console.log('Requesting login...');
    const loginData = {
      username: name,
      message: JSON.stringify({ mobile, dob }),
      method: "Posting",
      title: "Login"
    };

    window.hive_keychain.requestSignBuffer(name, JSON.stringify(loginData), 'Posting', function(response) {
      if (response.success) {
        console.log('Login successful:', response.result);
        feedback.innerHTML = '<div class="alert alert-success">Login successful!</div>';
        setTimeout(() => {
          window.location.href = 'verificationPage.html';
        }, 2000);
      } else {
        console.error('Login failed:', response.message);
        feedback.innerHTML = '<div class="alert alert-danger">Login failed: ' + response.message + '</div>';
      }
    });
  } catch (error) {
    console.error('Error during login request', error);
    feedback.innerHTML = '<div class="alert alert-danger">Error during login request: ' + error.message + '</div>';
  }
}

document.getElementById('submitButton').addEventListener('click', function(event) {
  event.preventDefault();
  submitForm();
});
