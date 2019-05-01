// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    // my_toast();


        // myApp.alert('Here comes About page');
                // window.localStorage.setItem("login",0);
        var islogin = window.localStorage.getItem("login");
// alert(islogin); 

if(islogin == 1){
    $$('#home').trigger("click");
 // window.location.href = "home.html"
  }
    $(document).on('click', '#login_user', function(){  

  $('#login_form').validate({ // initialize the plugin
        errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
       
        email: {
           
            required: true,
            email:true,
            
        },
         password: {
           
            required: true,
            
        },
        
    },
    messages: {
       
        
         email: {
           
            required: "Please enter  Email.",
            email:"Please Enter Proper Email",
            
        },
         password: {
           
            required: "Please enter  Password.",
            
            
        },
        
       
         
    },
        submitHandler: function (form) { // for demo
          form =$('#login_form').serialize();
          var  action = $('#action').val();
          var  email = $('#email').val();
         $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
                
     $.ajax({
            url: "https://digitalbcards.in/api/login/", 
            method: "POST",
            data:form, 
            dataType:"json",            
           
            success: function(data) {
              if(data.status == 0){
               $('.snackbar').html(data.message);
                my_toast();
                
    $('.loader').css('display','none');
    
                // alert(data.message);
              }else{

                window.localStorage.setItem("login",1);
                window.localStorage.setItem("email",email);

               // alert(data.message);
               $('.snackbar').html(data.message);
  // setTimeout(function(){ $('.snackbar').show(); }, 3000);
                my_toast();
    $$('#home').trigger("click");
    $('.loader').css('display','none');

              // $('#home').click();
              // $('#icon').html('<i class="fa fa-check font-30 icon-circle icon-l color-green-dark bg-white shadow-icon-large"></i>');
              // $('#error_msg_title').html('Login Succes');            
        // $('#error_msg').html(data.message);            
// $('#attention').addClass('active-menu-box-modal');
 // window.location.href = "home.html"
              }
            //location.reload();
          }
        })
            return false; // for demo
        }
    });
})

});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
    }
})
$$(document).on('pageInit', '.page[data-page="referral"]', function (e) {
  var referral =  window.localStorage.getItem("referral");
 var user_id =  window.localStorage.getItem("user_id");
 // alert(referral)
 $('#code').val(referral);

 $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
   $('.loader').css('display','flex');
      $.ajax({
            url: "https://digitalbcards.in/api/referral/", 
            method: "POST",
            data:{secrete:"virus",referral:referral,user_id:user_id}, 
            dataType:"json",            
           
            success: function(data) {
              // alert(data.active);
              $('#active_count').html(data.active);
              $('#view_count').html(data.view_count);
              $('#count').html(data.count);
              $('#end_count').html(data.end);
              

    $('.loader').css('display','none');
                // location.reload();

          }
        });  


});
$$(document).on('pageInit', '.page[data-page="vcard"]', function (e) {
// myFunction();
 var user_id =  window.localStorage.getItem("user_id");
 // alert(user_id);
  $('#user_idd').val(user_id);
  var redirect = confirm('please make a payment RS 500  to use Bcard features.');
   if (redirect == true) {
    // alert('fdfd');
    // $$('#home').trigger("click");
    // location.reload();
       // document.forms['customerData'].submit();
   }else{
    location.reload();
    // $$('#home').trigger("click");
   }
                      var language =  window.localStorage.getItem("language");
                      // alert(language)

   $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
   $('.loader').css('display','flex');
      $.ajax({
            url: "https://digitalbcards.in/api/message_update/", 
            method: "POST",
            data:{secrete:"virus",language:language,user_id:user_id}, 
            dataType:"json",            
           
            success: function(data) {
              // alert(data.email);
              if(data.email != ''){

                $("#about_me").val(data.email_subject);
                        $('#email_subject').val(data.email_subject);
                        $('#whatsapp_template').val(data.whatsapp);
                        $('#sms_template').val(data.sms);
              }else{
                 if(language == 0){
                        $("#customradio1").attr('checked', 'checked');
                        $("#about_me").val('Hello {name},\r\nYou can see my Digital Business Card from given below link:{bcardurl}\n Regards');
                        $('#email_subject').val('View my Digital Business Card.');
                        $('#whatsapp_template').val('Hello  {name},\r\nYou can see my Digital Business Card from given below link:{bcardurl}\n Regards');
                        $('#sms_template').val('Hello  {name},\r\nYou can see my Digital Business Card from given below link:{bcardurl}\n Regards');
                      }else if(language == 1){
                        $("#customradio2").attr('checked', 'checked');
                        $("#about_me").val('हैलो {name},कृपया नीचे दिए गए लिंक से मेरा कार्ड देखें: \n {bcardurl} सादर');
                        $('#email_subject').val('मेरा डिजिटल बीकार्ड देखें।.');
                        $('#whatsapp_template').val('हैलो {name},\nकृपया नीचे दिए गए लिंक से मेरा कार्ड देखें: \n {bcardurl} सादर');
                        $('#sms_template').val('हैलो {name},\nकृपया नीचे दिए गए लिंक से मेरा कार्ड देखें: \n {bcardurl} सादर');
                      }else{
                        $("#customradio3").attr('checked', 'checked');
                        $("#about_me").val('હેલો {name},\n તમે {bcardurl} જોઈ શકો છો શુભેચ્છાઓ');
                        $('#email_subject').val('મારું ડિજિટલ બી કાર્ડ જુઓ.');
                        $('#whatsapp_template').val('હેલો {name},\n પ્લઝ મારા કાર્ડને નીચે આપેલી લિંકથી જોશે: \n {bcardurl} શુભેચ્છાઓ');
                        $('#sms_template').val('હેલો {name},\n પ્લઝ મારા કાર્ડને નીચે આપેલી લિંકથી જોશે: \n {bcardurl} શુભેચ્છાઓ');

                      }
              }

    $('.loader').css('display','none');
                // location.reload();

          }
        });  

                     



$("input[type='radio']").bind( "change", function(event, ui) {
// $(document).on('pagebeforeshow', '.setlanguage', function(){       

   // $(".setlanguage").click(function() {
 
 var user_id =  window.localStorage.getItem("user_id");

 var lan = $(this).val();
    if(lan == 0){
                        $("#customradio1").attr('checked', 'checked');
                        $("#about_me").val('Hello {name},\r\nYou can see my Digital Business Card from given below link:{bcardurl}\n Regards');
                        $('#email_subject').val('View my Digital Business Card.');
                        $('#whatsapp_template').val('Hello  {name},\r\nYou can see my Digital Business Card from given below link:{bcardurl}\n Regards');
                        $('#sms_template').val('Hello  {name},\r\nYou can see my Digital Business Card from given below link:{bcardurl}\n Regards');
                      }else if(lan == 1){
                        $("#customradio2").attr('checked', 'checked');
                        $("#about_me").val('हैलो {name},कृपया नीचे दिए गए लिंक से मेरा कार्ड देखें: \n {bcardurl} सादर');
                        $('#email_subject').val('मेरा डिजिटल बीकार्ड देखें।.');
                        $('#whatsapp_template').val('हैलो {name},\nकृपया नीचे दिए गए लिंक से मेरा कार्ड देखें: \n {bcardurl} सादर');
                        $('#sms_template').val('हैलो {name},\nकृपया नीचे दिए गए लिंक से मेरा कार्ड देखें: \n {bcardurl} सादर');
                      }else{
                        $("#customradio3").attr('checked', 'checked');
                        $("#about_me").val('હેલો {name},\n તમે {bcardurl} જોઈ શકો છો શુભેચ્છાઓ');
                        $('#email_subject').val('મારું ડિજિટલ બી કાર્ડ જુઓ.');
                        $('#whatsapp_template').val('હેલો {name},\n પ્લઝ મારા કાર્ડને નીચે આપેલી લિંકથી જોશે: \n {bcardurl} શુભેચ્છાઓ');
                        $('#sms_template').val('હેલો {name},\n પ્લઝ મારા કાર્ડને નીચે આપેલી લિંકથી જોશે: \n {bcardurl} શુભેચ્છાઓ');

                      }
  })
 $("#save_button").click(function() {
   var form =$('#template_form').serialize();
                        // alert(form);



 
                                $.ajax({
            url: "https://digitalbcards.in/api/message_update/", 
            method: "POST",
            data:form, 
            dataType:"json",            
           
            success: function(data) {
              // alert(data.status);
         if(data.status == 0){
                 $('.snackbar').html(data.message);
  
    $('.loader').css('display','none');
                my_toast();
                 // alert(data.message);
            // location.reload();

              }else{
                 if(data.email != ''){

                $("#about_me").val(data.email);
                        $('#email_subject').val(data.email_subject);
                        $('#whatsapp_template').val(data.whatsapp);
                        $('#sms_template').val(data.sms);
              }
                 // alert(data.message);

                 $('.snackbar').html(data.message);
  
                my_toast();
    $('.loader').css('display','none');
    // $$('#v').trigger("click");
                // location.reload();

              }     
          }
        });  
                      

                      })
                
})
$$(document).on('pageInit', '.page[data-page="support"]', function (e) {

    $(document).on('click', '#save_button', function(){  
 
$('#support_form').validate({ // initialize the plugin
        errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
        query: {
           
            required: true,
           
            
        },
        mobile: {
           
            required: true,
            number:true,
            maxlength:10,
            minlength:10,
           
            
        },
        email: {
           
            required: true,
            email:true,
            
        },
         
        
    },
    messages: {
       
         query: {
           
            required: "Please enter  Query.",
          
            
        },
         email: {
           
            required: "Please enter  Email.",
            email:"Please Enter Proper Email",
            
        },
         mobile: {
           
            required: "Please enter  Mobile.",
            number:"Please Enter Proper Mobile",
            maxlength:"Please Enter Proper Mobile",
            minlength:"Please Enter Proper Mobile",
            
        },
        
        
       
         
    },
        submitHandler: function (form) { // for demo
          form =$('#support_form').serialize();
       
          // var  email = $('#email').val();
           $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
     $.ajax({
            url: "https://digitalbcards.in/api/support/", 
            method: "POST",
            data:form, 
            dataType:"json",            
           
            success: function(data) {
              if(data.status == 0){
                $('#support_form')[0].reset();
                // myApp.alert(data.message);
                $('.snackbar').html(data.message);
                my_toast();
    $('.loader').css('display','none');

              }else{

              $('#support_form')[0].reset();
               
                  $('.snackbar').html(data.message);

                my_toast();
          $('.loader').css('display','none');
              }
           
          }
        })
            return false; // for demo
        }
    });
})

})
$$(document).on('pageInit', '.page[data-page="settings"]', function (e) {
 var user_id =  window.localStorage.getItem("user_id");
 var email =  window.localStorage.getItem("email");
 $('#user_idd').val(user_id);
 $('#emaill').val(email);
    $(document).on('click', '#save_button', function(){  
 
$('#setting_form').validate({ // initialize the plugin
        errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
        old_password: {
           
            required: true,
           
            
        },
        password: {
           
            required: true,
            
        },
         re_pass: {
                    equalTo: "#password"
                },
         
        
    },
    messages: {
       
         old_password: {
           
            required: "Please enter  Old Password.",
          
            
        },
        password: {
           
            required: "Please enter  Password.",
            
            
        },
        re_pass:{
           equalTo: "Password Not Match.",
        }
        
        
       
         
    },
        submitHandler: function (form) { // for demo
          form =$('#setting_form').serialize();
       
          // var  email = $('#email').val();
           $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
     $.ajax({
            url: "https://digitalbcards.in/api/setting/", 
            method: "POST",
            data:form, 
            dataType:"json",            
           
            success: function(data) {
              if(data.status == 0){
                $('#setting_form')[0].reset();
                // myApp.alert(data.message);
                $('.snackbar').html(data.message);
                my_toast();
    $('.loader').css('display','none');

              }else{

              $('#setting_form')[0].reset();
               
                  $('.snackbar').html(data.message);

                my_toast();
          $('.loader').css('display','none');
              }
           
          }
        })
            return false; // for demo
        }
    });
})

})
$$(document).on('pageInit', '.page[data-page="directory"]', function (e) {

  var search = '';
                      // alert(user_id);
                      get_contacts(search);
                        

    $('#search').on('input', function(e){
      var search = $(this).val();
      // var search = $(this).val();
        get_contacts(search);
       
    })        

        function get_contacts(search){
          // alert(search);
           var email =  window.localStorage.getItem("email");
           var mobile =  window.localStorage.getItem("mobile");
           var whatsapp =  window.localStorage.getItem("whatsapp");
           if(whatsapp == 'undefined'){
            var wh = '';
          
           }else{
            var wh = whatsapp

           }

           $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
 var user_id =  window.localStorage.getItem("user_id");
 // alert(search);
                                $.ajax({
            url: "https://digitalbcards.in/api/directory/", 
            method: "POST",
            data:{user_id:user_id,search:search,secrete:"virus",email:email,mobile:mobile,whatsapp:wh}, 
            dataType:"json",            
           
            success: function(data) {
                // var data = JSON.stringify(data);
// alert(data);
$('#my_leadssss').html(data);

    $('.loader').css('display','none');

            //    $('#username').html(data.name);
             //   $('#user_image').attr("src",'https://digitalbcards.in/upload/'+data.profile_img);
              
            //location.reload();
          }
        });  
                            } 
                          

})
$$(document).on('pageInit', '.page[data-page="viewcard"]', function (e) {
 var referral =  window.localStorage.getItem("referral");
 // var user_id =  window.localStorage.getItem("user_id");
 // alert(referral)
   $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
   $('.loader').css('display','flex');
 var user_id =  window.localStorage.getItem("user_id");
 // alert(search);
                                $.ajax({
            url: "https://digitalbcards.in/api/card_data/", 
            method: "POST",
            data:{zxc:referral,user_id:user_id,secrete:"virus"}, 
            dataType:"json",            
           
            success: function(data) {
                // var data = JSON.stringify(data);
// alert(data);
$('#card').html(data);

    $('.loader').css('display','none');

            //    $('#username').html(data.name);
             //   $('#user_image').attr("src",'https://digitalbcards.in/upload/'+data.profile_img);
              
            //location.reload();
          }
        });  
})
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="home"]', function (e) {
  // my_toast();
   $(".segment").select2({
     'tags':true,
      placeholder: "Decide Segment"
      
    });




   $("#button").click(function() {
      
       var lable = $("#button").text().trim();

       if(lable == "Less") {
         $("#button").text("More");
         $("#test").hide();
       }
       else {
         $("#button").text("Less");
         $("#test").show();
       }
        
      });
  
 var input = document.querySelector("#mobile");
    var a=window.intlTelInput(input, {
    initialCountry: "auto",
     geoIpLookup: function(success, failure) {


    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      var countryCode = (resp && resp.country) ? resp.country : "";
      success(countryCode);
   $('.country-name').css('color','black');
    });
    },

  hiddenInput: "full_phone",
  utilsScript: "js/utils.js?1537717752654" // just for formatting/placeholders etc
});
    // Following code will be executed for page with data-page attribute equal to "about"
    $('.navbar').show();
    $('.back').hide();
     var email =  window.localStorage.getItem("email");
    // myApp.alert(email);
                        // alert('fdfd');
                         
      $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
                     $.ajax({
            url: "https://digitalbcards.in/api/user_profile/", 
            method: "POST",
            data:{email:email,secrete:"virus"}, 
            dataType:"json",            
           
            success: function(data) {
                // var data = JSON.stringify(data);

               window.localStorage.setItem("user_id",data.id);
               window.localStorage.setItem("language",data.language);
               window.localStorage.setItem("referral",data.Refferal_id);
               window.localStorage.setItem("mobile",data.mobile);
                
               window.localStorage.setItem("whatsapp",data.whatsapp);
               window.localStorage.setItem("name",data.name);
               //window.localStorage.setItem("username",data.name);
               window.localStorage.setItem("user_image",data.profile_img);
               // alert(data.name);
                $('#user').html(data.name);
                $('#user_image').attr("src",'https://digitalbcards.in/upload/'+data.profile_img);
                // $('#user_image').css("height",'80px');
                // $('#user_image').css("width",'80px');
               // $('#preloader').hide();
    $('.loader').css('display','none');
                
              
            //location.reload();
          }
        })            
                      var user_id =  window.localStorage.getItem("user_id");
                      // alert(user_id);
                              $.ajax({
            url: "https://digitalbcards.in/api/segment/", 
            method: "POST",
            data:{user_id:user_id,secrete:"virus"}, 
            dataType:"json",            
           
            success: function(data) {
                // var data = JSON.stringify(data);
// alert(data);
$('#segment').append(data);
$("#segment").trigger('create');
    $('.loader').css('display','none');

            //    $('#username').html(data.name);
             //   $('#user_image').attr("src",'https://digitalbcards.in/upload/'+data.profile_img);
              
            //location.reload();
          }
        });  

                      var user_id =  window.localStorage.getItem("user_id");
                      var language =  window.localStorage.getItem("language");
                      var referral =  window.localStorage.getItem("referral");
                      var name =  window.localStorage.getItem("name");
                      var user_image =  window.localStorage.getItem("user_image");
                   
                                var user =  window.localStorage.getItem("user_id");
             $('#user_id').val(user);
             $('#language').val(language);
             $('#referral').val(referral);
             $('#user_name').val(name);
        

          $('#share_form').validate({ // initialize the plugin
        errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
        "segment[]": "required",
       
         name: {
           
            required: true,
            
        },
        
        
        
    },
    messages: {
       
        "segment[]": "Please Select Segment",
        
         name: {
           
            required: "Please enter  Reciver Name.",
            
            
        },
        
        
       
         
    },
        submitHandler: function (form) { // for demo
          form =$('#share_form').serialize();
         // alert(form);
         var segment = $("#segment").val();
         if(segment == '-1'){
            $('.snackbar').html('Plese Select Segment');
            my_toast();
          return false;
         }else{

          var  action = $('#action').val();
          var  email = $('#email').val();
        $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
     $.ajax({
            url: "https://digitalbcards.in/api/send_whatsapp/",
            method: "POST",
            data:form, 
            dataType:"json",            
           
            success: function(data) {
               // alert(data,message);
              if(data.status == 0){
                 $('.snackbar').html(data.message);
  
    $('.loader').css('display','none');
                my_toast();
                // alert(data.message);

              }else if(data.status == 2){

                
                // alert(data.message);
                   $('.snackbar').html(data.message);
  
                my_toast();
            window.location.href = data.url;
              }else{
                 $('.snackbar').html(data.message);
  
                my_toast();
    $('.loader').css('display','none');

              }
            //location.reload();
          }
        })
         }
            return false; // for demo
        }
    }); 

                //called when key is pressed in textbox
              $("#mobile").keypress(function (e) {
                 //if the letter is not digit then display error and don't type anything
                 if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    //display error message
                    //$("#errmsg").html("Digits Only").show().fadeOut("slow");
                           return false;
                }
               });
          

})
$$(document).on('pageInit', '.page[data-page="lead"]', function (e) {
// myApp.alert('my leads');
                    
     
 var search = '';
                      // alert(user_id);
                      get_contact(search);
                        

    $('#search').on('input', function(e){
      var search = $(this).val();
      // var search = $(this).val();
        get_contact(search);
       
    })        

        function get_contact(search){
           $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
 var user_id =  window.localStorage.getItem("user_id");
 // alert(search);
                                $.ajax({
            url: "https://digitalbcards.in/api/leads/", 
            method: "POST",
            data:{user_id:user_id,search:search,secrete:"virus"}, 
            dataType:"json",            
           
            success: function(data) {
                // var data = JSON.stringify(data);
// alert(data);
$('#my_leads').html(data);

    $('.loader').css('display','none');

            //    $('#username').html(data.name);
             //   $('#user_image').attr("src",'https://digitalbcards.in/upload/'+data.profile_img);
              
            //location.reload();
          }
        });  
                            }               


})
$$(document).on('pageInit', '.page[data-page="register"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //my_toast();
    $(document).on('click', '#login', function(){  
     window.location = "index.html";
 })


    $(document).on('click', '#register_user', function(){  
 
$('#register_form').validate({ // initialize the plugin
        errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
        name: {
           
            required: true,
           
            
        },
        mobile: {
           
            required: true,
            number:true,
            maxlength:10,
            minlength:10,
           
            
        },
        email: {
           
            required: true,
            email:true,
            
        },
         password: {
           
            required: true,
            
        },
         re_pass: {
                    equalTo: "#password"
                },
        
    },
    messages: {
       
         name: {
           
            required: "Please enter  Name.",
          
            
        },
         email: {
           
            required: "Please enter  Email.",
            email:"Please Enter Proper Email",
            
        },
         mobile: {
           
            required: "Please enter  Mobile.",
            number:"Please Enter Proper Mobile",
            maxlength:"Please Enter Proper Mobile",
            minlength:"Please Enter Proper Mobile",
            
        },
         password: {
           
            required: "Please enter  Password.",
            
            
        },
        re_pass:{
           equalTo: "Password Not Match.",
        }
        
       
         
    },
        submitHandler: function (form) { // for demo
          form =$('#register_form').serialize();
          var  action = $('#action').val();
          var  email = $('#email').val();
          // var  email = $('#email').val();
           $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    $('.loader').css('display','flex');
     $.ajax({
            url: "https://digitalbcards.in/api/register/", 
            method: "POST",
            data:form, 
            dataType:"json",            
           
            success: function(data) {
              if(data.status == 0){
               
                // myApp.alert(data.message);
                $('.snackbar').html(data.message);
                my_toast();
    $('.loader').css('display','none');

              }else{

               window.localStorage.setItem("login",1);
               window.localStorage.setItem("email",email);
                // myApp.alert(data.message);
                  $('.snackbar').html(data.message);
// $$('#home').trigger("click");
                my_toast();
    $('.loader').css('display','none');

    
            //window.location.href = "home.html";
            location.reload();
              }
            //location.reload();
          }
        })
            return false; // for demo
        }
    });
})
  

   // $('.navbar').show();
    //$('.back').hide();
})