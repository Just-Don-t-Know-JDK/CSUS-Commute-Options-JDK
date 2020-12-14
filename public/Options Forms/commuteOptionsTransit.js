
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
    var mode = 'Transit';

    var ele = document.getElementsByName('custom-radio1'); 
    var transPass;
    for(i = 0; i < ele.length; i++) 
    {              
      if(ele[i].checked) 
      {
        transPass = ele[i].id; 
      // document.write(parking);
      }
    }
    var ele1 = document.getElementsByName('custom-radio2'); 
    var isStudent;
    for(i = 0; i < ele1.length; i++) 
    {              
      if(ele1[i].checked) 
      {
        isStudent = ele1[i].id; 
      // document.write(parking);
      }
    }
    var ele2 = document.getElementsByName('custom-radio2'); 
    var isFac;
    for(i = 0; i < ele2.length; i++) 
    {              
      if(ele2[i].checked) 
      {
        isFac = ele2[i].id;
        //document.write(isFac);
      }
    }
    window.localStorage.setItem('isAFaculty', isFac);
    window.localStorage.setItem('isAStudent', isStudent);
    window.localStorage.setItem('transitPass', transPass);
    window.localStorage.setItem('mode',mode);
  }