function checkForm() {
    var name = document.getElementById("input-name").value;
    var email = document.getElementById("input-email").value;
    var tel = document.getElementById("input-tel").value;
    var password = document.getElementById("input-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var city = document.getElementsByName("city")[0].value;
    var rulesAgree = document.getElementById("rules_agree").checked;
  
    if (name !== "" && email !== "" && tel !== "" && password !== "" && confirmPassword !== "" && city !== "" && rulesAgree) {
      // check password
      if (password.length < 6 || /\s/.test(password)) {
        alert("Password must be at least 6 characters long and should not contain spaces.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      // send data to server
      fetch('/check-user', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          tel: tel,
          password: password,
          city: city
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(data) {
        if (!data.isUnique) {
          document.getElementById("send-button").disabled = true;
          alert("Email is already registered.");
        } else {
          document.getElementById("send-button").disabled = false;
          alert("Form is valid and can be submitted.");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    } else {
      document.getElementById("send-button").disabled = true;
      alert("Please fill out all fields before submitting.");
    }
  }

  function login() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
  
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (data.success) {
        alert("Login successful!");
        //TODO 
      } else {
        alert("Incorrect email or password.");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  }