function addValidation(){
  $.validator.setDefaults({ ignore: '' });
  
  $.validator.addMethod("greaterThan", 
  function(value, element, params) {

      if (!/Invalid|NaN/.test(new Date(value))) {
          return new Date(value) >= new Date($(params).val());
      }

      return isNaN(value) && isNaN($(params).val()) 
          || (Number(value) >= Number($(params).val())); 
  },'Must be greater than {0}.');
  
  validator = $("#request_form").validate({
    errorClass: 'error',
		focusCleanup: true,
    onkeyup: false,
    errorPlacement: function(err, el){
			
			var vTarget = err[0].attributes[0].value;
			var msg = err.text();
			var pos = $(el).position();
			
			var top = parseFloat(pos.top + 5);
			
			var errMarkup = "<span class=\"error hover\" for=\"" + vTarget +  "\" style=\"top:" + top + "px; left:530px;\">" + msg + "</span>";
			
			
			switch($(el).attr("id")){
				case "displaydatestart":
					// do nothing
				break;
				case "omc":
					errMarkup = "<span class=\"error hover\" for=\"" + vTarget +  "\" style=\"top:14px; left:660px;\">" + msg + "</span>";
					$(".firstHolder.omc").after(errMarkup);
				break;
				case "tc":
					if($("#tc").prop("checked") == false){

						$("#tnc").addClass("errFlash").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
							
							window.setTimeout(function(){
								$("#tnc").removeClass("errFlash");
							},1000)
							
						});
						
					}
				break;
				default:
					$("#" + vTarget).after(errMarkup);
				break;
				
			}
			
			$(".error.hover").addClass("show");
			
    },
    invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors > 0) {
			  
			  $("#questions span.error").css("display","inline-block");
			  $("#questions input[type=submit]").removeClass("ok").addClass("fail");
			  
			}else{
			  
			  $("#questions span.error").css("display","none");
			  $("#questions input[type=submit]").removeClass("fail").addClass("ok");
			  
			}
		},
    highlight: function(element, errorClass){
      $(element).addClass(errorClass);
    },
    unhighlight: function(element, errorClass){
      $(element).removeClass(errorClass);
    },
    submitHandler: function(form) {
			//form.submit();
		},
		rules: {
		  conference_name: {
      	required: true,
				minlength: 3
		  },
      conference_loc: {
      	required: true,
				minlength: 3
      },
      conference_why: {
      	required: true,
				minlength: 3
      },
      conference_dates: {
      	required: true
      },
			conference_cost: {
			  required: true,
			  number: true
			},
      workshop_name: {
      	required: true,
				minlength: 3
      },
      workshop_loc: {
      	required: true,
				minlength: 3
      },
      workshop_why: {
      	required: true,
				minlength: 3
      },
      workshop_dates: {
      	required: true
      },
			workshop_cost: {
			  required: true,
			  number: true
			},
      seminar_name: {
      	required: true,
				minlength: 3
      },
      seminar_loc: {
      	required: true,
				minlength: 3
      },
      seminar_why: {
      	required: true,
				minlength: 3
      },
      seminar_dates: {
      	required: true
      },
			seminar_cost: {
			  required: true,
			  number: true
			},
      course_name: {
      	required: true,
				minlength: 3
      },
      course_provider: {
      	required: true,
				minlength: 3
      },
      course_why: {
      	required: true,
				minlength: 3
      },
      course_dates: {
      	required: true
      },
			course_cost: {
			  required: true,
			  number: true
			},
      pd_name: {
      	required: true,
				minlength: 3
      },
      pd_provider: {
      	required: true,
				minlength: 3
      }, 
      pd_dates: {
      	required: true
      },
      pd_why: {
      	required: true,
				minlength: 3
      },
			pd_cost: {
			  required: true,
			  number: true
			},
      book_name: {
      	required: true,
				minlength: 3
      },
      book_author: {
      	required: true,
				minlength: 3
      },
      book_purchase_date: {
      	required: true
      },
      book_why: {
      	required: true,
				minlength: 3
      },
			book_cost: {
			  required: true,
			  number: true
			},
      mag_name: {
      	required: true,
				minlength: 3
      },
      mag_desc: {
      	required: true,
				minlength: 3
      },
      mag_sub_duration: {
      	required: true
      },
      mag_why: {
      	required: true,
				minlength: 3
      },
			mag_cost: {
			  required: true,
			  number: true
			},
      omc: {
      	required: true
      },
      tc: {
      	required: true
      },
			cost: {
			  required: true,
			  number: true
			}
		},
		messages: {
		  conference_name: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the conference name."
			},
      conference_loc: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the conference location."
			},
      conference_why: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a reason for wanting to go to this conference."
			},
      conference_dates: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a start and end date for the conference."
			},
			conference_cost: {
			  required: "Please provide a cost.",
			  number: "Please enter your cost (without currency symbols)."
			},
      workshop_name: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the workshop name."
			},
      workshop_loc: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the workshop location."
			},
      workshop_why: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a reason for wanting to go to this workshop."
			},
      workshop_dates: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a start and end date for the workshop."
			},
			workshop_cost: {
			  required: "Please provide a cost.",
			  number: "Please enter your cost (without currency symbols)."
			},
      seminar_name: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the seminar name."
			},
      seminar_loc: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the seminar location."
			},
      seminar_why: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a reason for wanting to go to this seminar."
			},
      seminar_dates: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a start and end date for the seminar."
			},
			seminar_cost: {
			  required: "Please provide a cost.",
			  number: "Please enter your cost (without currency symbols)."
			},
      course_name: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the name of the course."
			},
      course_provider: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the name of the provider of the course."
			},
      course_why: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a reason for wanting to take this course."
			},
      course_dates: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a start and end date for the course."
			},
			course_cost: {
			  required: "Please provide a cost.",
			  number: "Please enter your cost (without currency symbols)."
			},
      pd_name: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the name of the Professional Designation."
			},
      pd_provider: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the name of the provider of the Professional Designation."
			},
      pd_dates: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a start and end date for the course."
			},
      pd_why: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a reason for wanting to obtain this Professional Designation."
			},
			pd_cost: {
			  required: "Please provide a cost.",
			  number: "Please enter your cost (without currency symbols)."
			},
      book_name: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the name of the book."
			},
      book_author: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the name of the author of the book."
			},
      book_purchase_date: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a purchase date for the book."
			},
      book_why: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a reason for wanting to purchase this book."
			},
			book_cost: {
			  required: "Please provide a cost.",
			  number: "Please enter your cost (without currency symbols)."
			},
      mag_name: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please fill in the name of the magazine."
			},
      mag_desc: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a description for the magazine."
			},
      mag_sub_duration: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a subscription duration for this magazine."
			},
      mag_why: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please provide a reason for wanting this magazine subscription."
			},
			mag_cost: {
			  required: "Please provide a cost.",
			  number: "Please enter your cost (without currency symbols)."
			},
      omc: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "Please select a training category."
			},
      tc: {
				minlength: jQuery.validator.format("This needs to be at least {0} characters long."),
				required: "You must agree to the Terms and Conditions."
			},
			cost: {
			  required: "Please provide a cost.",
			  number: "Please use numbers to enter your cost."
			}
		}			
  });
};

function appendStepAnswer($el, step){
  var asa = $.Deferred();
  var text;
  
  switch(step){
    case 1:
      asa.resolve("A " + $el.attr("data-type") + ".");
    break;
    case 2:
      var nameEl = $("li[data-step=" + step + "] fieldset input");
      $.each(nameEl, function(i,v){
        if($(v).attr("name") && $(v).attr("name").indexOf("name") !== -1){
          name = "It's called " + $(v).val() + ".";
        }
      });
      asa.resolve(name);
    break;
    case 3:
      asa.resolve("I'll tell you why:");
    break;
    case 4:
      asa.resolve("Check it out:");
    break;
    case 5:
    
    break;
    default:
      msg = "Could not append step answer. Step passed is " + step;
      asa.fail(msg);
    break;
  }

  
  return asa.promise();
};

function bindClickEvents(){
  
  $("body").on("click", "#pdsa-types li span:first-of-type", function(ev){
    ev.preventDefault();
    var parent = $(this).parent();
    
    $("#pdsa-types li span:first-of-type").removeClass("active");
    $(this).addClass("active");
    
    $("#pdsa-types li ul").removeClass("active");
    $("ul", parent).addClass("active");
    
  });
  
  $("body").on("click", "#pdsa-types li ul li a", function(ev){
    ev.preventDefault();

    var parent = $(this).parent().parent();
    
    if($(parent).hasClass("active")){

      var $el = $(this);
      var type = $el.attr("data-type");
      var step = parseFloat($el.parents("li.question").attr("data-step"));
      var nextStep = step + 1;
      var fields = {type: type, step: nextStep};
      
      $.when(getFields(fields), appendStepAnswer($el, step))
       .then(
        // done
        function(gf, asa){
          
          $("#pdsa_type").val(type);
          
          var answer = "<a href=\"#\" class=\"pdsa-choice\"><span data-hover=\"Click to edit\">" + asa + "</span></a>";
          $("li[data-step=" + step + "] fieldset").slideUp(300, function(){
            $("li[data-step=" + step + "]").append(answer);
          });
          
          $.when(getStepQuestion(nextStep))
          .then(
            // done
            function(gsq){
              gsq = gsq.replace("##ITEM##",type);
              
              var markup = "<li class=\"question\" data-step=\"" + nextStep + "\"><span>" + gsq + "</span>";

              markup += "<fieldset>";
              markup += gf;
              markup += "</fieldset>";

              markup += "</li>";
              
              $("#questions").append(markup);
              
              bindFormEvents();
              addValidation();
              if(nextStep === 2){
                createCurrencyDropdown();
              }
            },
            // fail
            function(msg){
              console.log("Failure; " + msg);
            },
            // progress
            function(){
              
            }
            
            );
          
          
        },
        // fail
        function(msg){
          console.log("Failure; " + msg);
        },
        // progress
        function(){
          
        }
        
        );
      
    }
    
  });

  $("body").on("click", ".pdsa-choice", function(ev){
    ev.preventDefault();
    
    var $el = $(this);
    var step = parseFloat($el.parents("li.question").attr("data-step"));
    
    $.each($("li.question"), function(i,v){
      
      if(parseFloat($(v).attr("data-step")) > step){
        $(v).slideUp().remove();
      }
      
    });
    
    $(this).remove();
    clearBinds();
    bindClickEvents();
    bindFormEvents();
    $("li.question[data-step=" + step + "] fieldset").slideDown(300);
    
  });

  $("body").on("click", ".checkbox_proxy, #tnc", function(ev){
    //ev.preventDefault();
    
    if($(".checkbox_proxy").hasClass("check")){
      
      $(".checkbox_proxy").removeClass("check");
      $("#tc").prop("checked", false);
      
    }else{
      
      $(".checkbox_proxy").addClass("check");
      $("#tc").prop("checked", true);
      
    }
    
  });
	
  $("body").on("click", "#tnc a", function(ev){
    ev.stopPropagation;
  });
  
  $("body").on("click", "#reset", function(ev){
    ev.preventDefault();
    
    var $el = $(this);
    var step = 1;
    
    $.each($("li.question"), function(i,v){
      
      if(parseFloat($(v).attr("data-step")) > step){
        $(v).slideUp().remove();
      }
      
    });
    
    $("li.question[data-step=1] .pdsa-choice").remove();
    clearBinds();
    bindClickEvents();
    bindFormEvents();
    $("li.question[data-step=" + step + "] fieldset").slideDown(300);
    
  });

  var resizeTimer;

  $(window).on('resize', function(e) {

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if($('#questions .question').size() > 1){
        createCurrencyDropdown();
      }
              
    }, 250);

  });

  
};

function bindFormEvents(){
  
  $("#displaydatestart").datepicker({
	  dateFormat: "dd M yy",
		minDate: 0
	});

	$("#displaydateend").datepicker({
	  dateFormat: "dd M yy",
		minDate: 0
	});
  
  $("body").off("click", "#submit").on("click", "#submit", function(ev){
    ev.preventDefault();
		$(".error.hover").removeClass("show").remove();
		
    var valid = validator.form();
    
    if(valid){
      var request = $("#request_form").serializeArray();
      
      var post = $.ajax({
        type: "POST",
        url: "inc/process.php",
        data: request
      });
      
      $.when(post).then(
        //done
        function(data){
					console.log("working: " + data);
          $("div[role=main]").addClass("fade");
          
					$("div[role=main]").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$(this).html(data).removeClass("fade");
					});
					
        },
        // fail
        function(msg){
          console.log("Failure; " + msg);
        },
        // progress
        function(){
          
        }
      );
      
    }
    
    
  });
  	
  $("#questions input[type=submit]").on("click", function(ev){
    ev.preventDefault();
		$(".error.hover").removeClass("show").remove();
		
		$("#request_form textarea").each(function(){
			
			var val = $(this).val();
			var id = $(this).attr("id");
		
			if(id.indexOf("why") !== -1){
				$("#request_form").data("whyLastText", val);
			}else{
				$("#request_form").data("shareLastText", val);
			}
			
		});
		
    var valid = validator.form();
    
    if(valid){
      
      $("#questions span.error").css("display","none");
		  $("#questions input[type=submit]").removeClass("fail").addClass("ok");
      
      var $el = $(this);
      var type = $el.attr("data-type");
      var step = parseFloat($el.parents("li.question").attr("data-step"));
      var nextStep = step + 1;
      var fields = {type: type, step: nextStep};
      
      $.when(getFields(fields), appendStepAnswer($el, step))
       .then(
         // done
         function(gf, asa){
           
           var answer = "<a href=\"#\" class=\"pdsa-choice\"><span data-hover=\"Click to edit\">" + asa + "</span></a>";
           $("li[data-step=" + step + "] fieldset").slideUp(300, function(){
             $("li[data-step=" + step + "]").append(answer);
           });

           $.when(getStepQuestion(nextStep))
           .then(
             // done
             function(gsq){
               
               var verb;
               switch(type){
                 case 'conference':
                 case 'workshop':
                 case 'seminar':
                   verb = "go";
                 break;
                 case 'course':
                   verb = "take this course";
                 break;
                 case 'professional designation':
                   verb = "attain this";
                 break;
                 case 'book':
                   verb = "get this book";
                 break;
                 case 'magazine':
                   verb = "subscribe";
                 break;
                 case 'membership':
                   verb = "become a member";
                 break;
                 default:

                 break;
               }
               
               
               gsq = gsq.replace("##ITEM##",type);
               gsq = gsq.replace("##VERB##",verb);
               
               var markup = "<li class=\"question\" data-step=\"" + nextStep + "\"><span>" + gsq + "</span>";

               markup += "<fieldset>";
               markup += gf;
               markup += "</fieldset>";
               
               if(nextStep === 5){
                 markup += "<div class=\"wrap\"><a href=\"#\" class=\"button\" id=\"reset\">Reset</a><a href=\"#\" class=\"button\" id=\"submit\">Submit</a></div>";
               }
               
               markup += "</li>";

               $("#questions").append(markup);

               bindFormEvents();
               addValidation();
               
							 if(nextStep === 3 || nextStep === 4){
								 $("form .question fieldset a.restore").each(function(){
							 		var id = $(this).attr("id").split("-restore")[0];
									var el;
									
							 		if(id.indexOf("why") !== -1){
							 			el = $("#request_form").data("whyLastText");
							 		}else{
							 			el = $("#request_form").data("shareLastText");
							 		}
									
									if(el){
										
									}else{
										$(this).hide();
									}
									
								 });
							 }
							 
               if(nextStep === 5){
                 createOmcDropdown();
               }
               
             },
             // fail
             function(msg){
               console.log("Failure; " + msg);
             },
             // progress
             function(){

             }

             );
         },
         // fail
         function(msg){
           console.log("Failure; " + msg);
         },
         // progress
         function(){
           
         }
         );
      
    }
    
  });
	
	$("body").on("click", "form .question fieldset a.restore", function(ev){
		ev.preventDefault();
		
		var id = $(this).attr("id").split("-restore")[0];
		var text;

		if(id.indexOf("why") !== -1){
			text = $("#request_form").data("whyLastText");
		}else{
			text = $("#request_form").data("shareLastText");
		}
		
		var $targetEl = $(this).prev();
		$targetEl.val(text);
		
	});

	$("form .question fieldset a.restore").mouseenter(function(ev){
		// mouseenter
		
		var id = $(this).attr("id").split("-restore")[0];
		var text;
		
		if(id.indexOf("why") !== -1){
			text = $("#request_form").data("whyLastText");
		}else{
			text = $("#request_form").data("shareLastText");
		}

		var previewEl = "<span class=\"text-preview\">" + text + "</span>";
		$(this).after(previewEl);
		$(".text-preview").addClass("show");
		
	}).mouseleave(function(ev){
		// mouseleave
		$parent = $(this).parent();
		
		$(".text-preview").removeClass("show").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			
			$(".text-preview", $parent).remove();
			
		});
			
	});

};

function clearBinds(){
  $("body").off("click", "#pdsa-types li span:first-of-type");
  $("body").off("click", "#pdsa-types li ul li a");
  $("body").off("click", ".pdsa-choice");
  $("body").off("click", ".checkbox_proxy, #tnc");
  $("body").off("click", "#tnc a");
  $("body").off("click", "#submit");
  $("body").off("click", "div[role=main] form .selectWrap.currency .firstHolder");
  $("body").off("click", "div[role=main] form .selectWrap.currency #currencydd li");
  $("body").off("click", "div[role=main] form .firstHolder.omc");
  $("body").off("click", "div[role=main] form .selectWrap.omc #fauxSelect li");
  $("body").off("click", "form .question fieldset a.restore");
	$("form .question fieldset a.restore").off("mouseenter");
	$("form .question fieldset a.restore").off("mouseleave");
  $("#questions input[type=submit]").off("click");
};

function createCurrencyDropdown(){
  var ccd = $.Deferred();
  
  if($("#currencydd")){
    
		$("body").on("click", "div[role=main] form .selectWrap.currency .firstHolder", function(ev){
			ev.preventDefault();
      var $parent = $(this).parent();
			
			$parent.toggleClass("open");
			
		});
		
    $("body").on("click", "div[role=main] form .selectWrap.currency #currencydd li", function(ev){
			ev.preventDefault();
      var $parent = $(this).parent().parent();

		  var text = $("a", this).attr("class");
		  $("#pdsa_currency").val(text);

		  $("div[role=main] form .selectWrap.currency .firstHolder a").removeClass().addClass(text);

		  $parent.removeClass("open");

    });
    
    var costPos = $(".cost").position();
    
    $(".selectWrap.currency").css("top",costPos.top);
    
    ccd.resolve();
    
  }
  
  return ccd.promise();
}

function createOmcDropdown(){
  var cfd = $.Deferred();
  
  if($("select#omc")){
    
    var options = $("select#omc option");
    var markup = "<div class=\"firstHolder omc\">Please Select</div><div class=\"selectWrap omc\"><ul id=\"fauxSelect\">";
    
    $.each(options, function(i,v){
      if($(v).val()){
        markup += "<li>" + $(v).val() + "</li>";
      }
    });
    
    markup += "</ul></div>";
    $("select#omc").hide().before(markup);
    
    $("#tc").attrchange({
      trackValues: true,
      callback: function(ev){
        if(ev.oldValue === 'error'){
          $(".selectWrap").removeClass("error");
        }else{
          $(".selectWrap").addClass("error");
        }
        
      }
    });

    $("#omc").attrchange({
      trackValues: true,
      callback: function(ev){
        if(ev.oldValue === 'error'){
          $(".checkbox_proxy").removeClass("error");
        }else{
          $(".checkbox_proxy").addClass("error");
        }
        
      }
    });
		
		$("body").on("click", "div[role=main] form .firstHolder.omc", function(ev){
			ev.preventDefault();
			
			$(".selectWrap.omc").toggleClass("open");
			
		});
		
    $("body").on("click", "div[role=main] form .selectWrap.omc #fauxSelect li", function(ev){
			ev.preventDefault();
      var $parent = $(this).parent().parent();
			
	      var text = $(this).text();
	      $("#omc option[value='" + text + "']").prop('selected', true);
      
	      $("div[role=main] form .firstHolder.omc").text(text);
      
	      $parent.removeClass("open");
				
    });
    
    cfd.resolve();
  }
  
  return cfd.promise();
}

function getFields(fieldsObj){
  var gf = $.Deferred();
  
  // get content
  $.ajax({
    url: "/inc/getFields.php",
    data: fieldsObj
  }).done(function(data){
    
    gf.resolve(data);
    
  });
  
  return gf.promise();
};

function getStepQuestion(step){
  gsq = $.Deferred();
  
  switch(step){
    case 1:
      gsq.resolve("What would you like to use your PDSA on? ");
    break;
    case 2:
      gsq.resolve("Tell us about the ##ITEM##: ");
    break;
    case 3:
      gsq.resolve("Why do you want to ##VERB##? ");
    break;
    case 4:
      gsq.resolve("How are you going to share your experience? ");
    break;
    case 5:
      gsq.resolve("Finally, some necessities: ");
    break;
    default:
      msg = "Could not determine step question. Step passed is " + step;
      gsq.fail(msg);
    break;
  }
  
  return gsq.promise();
};

function setGlobalEventBinds(){
  var sgi = $.Deferred();
  
  $.when(bindClickEvents())
   .then(
     // done
     function(){
       
     },
     // fail
     function(msg){
       console.log("Failure; " + msg);
     },
     // progress
     function(){
       
     }
     );
  
  return sgi.promise();
};

function init(){
  var initDef = $.Deferred();

  $(document).ready(function(){
    initDef.resolve();
  });  
  
  return initDef.promise();
};

$.when(init(), setGlobalEventBinds())
 .then(
   // done
   function(){
     
   },
   // fail
   function(msg){
     console.log("Failure; " + msg);
   },
   // progress
   function(){
     
   }
);