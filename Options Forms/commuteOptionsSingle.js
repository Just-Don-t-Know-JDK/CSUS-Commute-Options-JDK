// $(document).ready(function(){
//     $('#customControlValidation').click(function(){
//         $('#customControlValidation').toggle();

//     })

// })

// $('#submit').click(function(){
//     window.location.href = '../Data Analysis.html';
// });

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

// document.getElementById("sub").onclick = function () {
//     location.href = "../Data Analysis.html";
// };
// $('submit#sub').submit(function() {
//     window.location.href = "../Data Analysis.html"
// })

// let userData = { 
//     mpg: $('input#mpg').val(),
//     address: $('input#address').val(),
//     insurance: $('input#insurance').val(),
//     parking: $('input#park').val()
// };
// window.localStorage.setItem('userData', JSON.stringify(userData));

// let temp = document.querySelector('#mpg').value
// console.log(temp);
// let form = document.querySelectorAll('.needs-validation')
// {
//     form.addEventListener('submit',function(event){
//         if(form.checkValididty()===false){
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//     })
// }
