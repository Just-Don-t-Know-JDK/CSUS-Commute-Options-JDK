
// DATA VALIDATION
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

// SEND IT TO THE SERVER
function sendInfo() {
  var milesPerGallon = document.getElementById("mpg").value;
  var insuranceCost = document.getElementById("insuranceCost").value;
  window.localStorage.setItem('mpg', milesPerGallon);
  window.localStorage.setItem('insurance', insuranceCost);
  // console.log(milesPerGallon);
  // console.log(insuranceCost);
  var ele = document.getElementsByName('custom-radio'); 
  var parking;
  for(i = 0; i < ele.length; i++) 
  {              
    if(ele[i].checked) 
    {
      parking = ele[i].id; 
      // document.write(parking);
    }
  }
  window.localStorage.setItem('prkingType', parking);

}

var mode = 'SOV';
window.localStorage.setItem('mode', mode);