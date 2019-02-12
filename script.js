
var targetInput = document.getElementById("inputSearch");
var results     = document.getElementById("autocomplete-results");

var countryList = ["Germany", "USA", "Jordan", "Kenya", "Wales", "England", "Nepales", "China","Somalia","Albania", "France", "Canada","Columbia", "Cuba", "Yeman", "Russia", "Polen", "Danmark","Norge" ]; 
var matches     = [];
var resultCursor = 0;

//Foucs on the input on load
targetInput.focus();

targetInput.addEventListener("keydown", function (event) {
  //
  if(event.keyCode == "13"){
      event.preventDefault();
  }

})


//event listener
targetInput.addEventListener("keyup", function (event) {
   
    /* 
     * Key codes :
     * 
     * Enter: 13
     * Arrow up: 38
     * Arrow down: 40
     * 
     * 
    */

   //remove previous res
   results.innerHTML = "";
   
   //hide the result element
   tooggleResults("hide");

   //test the lenght of search-input
   if(this.value.length > 0){
       
       //Passing the input value to function returning the value matching the input
       matches = getMatches(this.value);

       console.log(this.value);

       if(matches.length > 0){
           displayMatches(matches);
       }
   }

   if(results.classList.contains('visible')){
       switch (event.keyCode){
           case 13: 
               targetInput.value = results.children[resultCursor].innerHTML;
               tooggleResults('hide');
               resultCursor = 0;
               break;
           case 38:
              if(resultCursor > 0){
                  resultCursor --;
                  moveCursor(resultCursor);
              }
              break;
           case 40:
               if(resultCursor < (matches.length -1)){
                   resultCursor++;
                   moveCursor(resultCursor);
               }
              break;
       }
   }
    
});

//a simple function add class hode/show
function tooggleResults(action){
    
    if(action == "show"){
        results.classList.remove('hide');
        results.classList.add('visible')

    }else if(action == "hide"){
        results.classList.remove('visible');
        results.classList.add('hide');

    }
}

//Define a function to check if the input matches any of the country names
function getMatches(input){
    var matchesList = [];

    console.log(input);

    for (let i = 0; i < countryList.length; i++) {
        
        if(countryList[i].toLowerCase().indexOf(input.toLowerCase()) != -1){
            matchesList.push(countryList[i]);
        }
        
    }
    return matchesList;
}

function displayMatches(matches){
  var j = 0;

    while(j < matches.length){
       results.innerHTML += "<li class='results'>"+matches[j]+"</li>";
       j++;
    }

    // The First child get highlight
    moveCursor(resultCursor);


    //show the result
    tooggleResults('show');
}

//define a function for moving  the cursor in the results list
function moveCursor(pos){
  for( var x = 0; x <results.children.length; x++){
     results.children[x].classList.remove('highlighted');
  }

  results.children[pos].classList.add("highlighted")
}



