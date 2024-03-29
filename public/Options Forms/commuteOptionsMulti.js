
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
  
  //SENDING INFORMATION TO THE SERVER
  function sendInfo() {
    var milesPerGallon = document.getElementById("mpg").value;
    var insuranceCost = document.getElementById("insuranceCost").value;
    var occupants = document.getElementById("vehicleOccupants").value;
    var parking;
    window.localStorage.setItem('mpg', milesPerGallon);
    window.localStorage.setItem('insurance', insuranceCost);
    window.localStorage.setItem('vehicleOccupants', occupants);
    for(i = 0; i < ele.length; i++) 
    {              
      if(ele[i].checked) 
      {
        parking = ele[i].id; 
        // document.write(parking);
      }
    }
    window.localStorage.setItem('prkingType', parking);
    window.localStorage.setItem('mode', 'MOV');
  }