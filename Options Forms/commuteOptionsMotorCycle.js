
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
  
  function sendInfo() {
    var mode = 'Motorcycle';
    var milesPerGallon = document.getElementById("mpg").value;
    var insuranceCost = document.getElementById("insuranceCost").value;
    // var address = document.getElementById("addy").value;
    window.localStorage.setItem('mpg', milesPerGallon);
    window.localStorage.setItem('insurance', insuranceCost);
    // window.localStorage.setItem('addy', address);
    window.localStorage.setItem('mode',mode);
    // console.log(milesPerGallon);
    // console.log(insuranceCost);
    //document.write("Hello" + milesPerGallon +insuranceCost);
  }