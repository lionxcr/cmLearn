/* THIS IS WHERE I ADD ON */

function disableOther( button ) {if( button !== 'showLeft' ) {classie.toggle( showLeft, 'disabled' );}};
function nextPressed(id){
  var validation = validateFields(id);
  if(id == 'pdsaFormStep1'){
    if (!validation) {
      document.getElementById("question1").style["display"] = "none";
      document.getElementById("question2").style["display"] = "none";
      document.getElementById("question3").style["display"] = "none";
      document.getElementById("input1").style["display"] = "none";
      document.getElementById("input2").style["display"] = "none";
      document.getElementById("input3").style["display"] = "none";
      document.getElementById("question4").style["display"] = "inline-block";
      document.getElementById("question5").style["display"] = "inline-block";
      document.getElementById("datepickerStart").style["display"] = "inline-block";
      document.getElementById("datepickerEnd").style["display"] = "inline-block";
      document.getElementById("input5").style["display"] = "inline-block";
      document.getElementById("currency").style["display"] = "inline-block";
      document.getElementById("pdsaFormStep1").id = "pdsaFormStep2";
    }else{
      document.getElementById("input1").className = "pdsaForm error";
      document.getElementById("input2").className = "pdsaForm error";
      document.getElementById("input3").className = "pdsaForm error";
    };
    
  };
  if(id == 'pdsaFormStep2'){
    if (!validation) {
      document.getElementById("question4").style["display"] = "none";
      document.getElementById("question5").style["display"] = "none";
      document.getElementById("datepickerStart").style["display"] = "none";
      document.getElementById("datepickerEnd").style["display"] = "none";
      document.getElementById("input5").style["display"] = "none";
      document.getElementById("currency").style["display"] = "none";
      document.getElementById("pdsaFormStep2").innerHTML = "Review Submission";
      document.getElementById("pdsaFormStep2").id = "pdsaFormStep3";
      document.getElementById("whyQuestion").style["display"] = "inline-block";
      document.getElementById("shareQuestion").style["display"] = "inline-block";
      document.getElementById("whyInput").style["display"] = "inline-block";
      document.getElementById("shareInput").style["display"] = "inline-block";
    }else{
      document.getElementById("datepickerStart").className = "pdsaForm date error";
      document.getElementById("datepickerEnd").className = "pdsaForm date error";
      document.getElementById("input5").className = "pdsaForm currency error";
    };

  };
  if(id == 'pdsaFormStep3'){
    if (!validation) {
      document.getElementById("newPdsaForm").submit();
    }else{
      document.getElementById("whyInput").className = "error";
      document.getElementById("shareInput").className = "error";
    };
    
  };
};

function validateFields(id){
  console.log(id);
  var isEmpty = false;
  $.each($('.pdsaForm'), function(index, value){
    if($(value).val() === ""){
        if (id == 'pdsaFormStep1') {
          if (index === 0 || index === 1 || index === 2) {
            isEmpty = true;
            return false;
          }
        }
        if (id == 'pdsaFormStep2') {
          if (index === 3 || index === 4 || index === 5) {
            isEmpty = true;
            return false;
          }
        }
        if (id == 'pdsaFormStep3') {
          if (index === 6 || index === 7) {
            isEmpty = true;
            return false;
          }
        }
    }
  });
  return isEmpty;
}

function showBalance(id){if (id == 'open') {$('#my_balance').css({"visibility": "visible"});var obj = document.getElementById(id);obj.id = 'closed';}else{$('#my_balance').css({"visibility": "hidden"});var obj = document.getElementById(id);obj.id = 'open';};}