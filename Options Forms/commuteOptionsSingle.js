$(document).ready(function(){
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
});


  // $('#form').submit(function(e){
  //     e.preventDefault();
  //     let userData = { 
  //         mpg: $('input#mpg').val(),
  //         //address: $('input#address').val(),
  //         insurance: $('input#insurance').val(),
  //         parking: $('input#park').val()
  //     };
  //     window.localStorage.setItem('userData', JSON.stringify(userData));
  //     console.log(window.localStorage.getItem('userData'));
  // });
  // $('#submit').click(function(){
  //     window.location.replace('output.html');
  // });

// const wrapper = document.querySelector('.wrapper'),
//       form = wrapper.querySelectorAll('.form'),
//       submitInput = form[0].querySelector('input[type = "submit"]');




// $(document).ready(function(){
//   $('#form').submit(function(e){
//       e.preventDefault();
//       let userData = { 
//           mpg: $('input#mpg').val(),
//           address: $('input#address').val(),
//           insurance: $('input#insurance').val(),
//           parking: $('input#park').val()
//       };
//       window.localStorage.setItem('userData', JSON.stringify(userData));
//       console.log(window.localStorage.getItem('userData'));
//   });
//   $('#submit').click(function(){
//       window.location.replace('output.html');
//   });
// });
function greetings() {
  var milesPerGallon = document.getElementById("mpg").value;
  var insuranceCost = document.getElementById("insuranceCost").value;
  // var milesPerGallon = document.getElementById("mpg").value;
  console.log(milesPerGallon);
  console.log(insuranceCost);
  //document.write("Hello" + milesPerGallon +insuranceCost);
}