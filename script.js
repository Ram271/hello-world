  var str0 = '';
  var str = '';
  var flag = 1;
  var element1 = document.getElementById('screen');
  var element2 = document.getElementById('underscreen');

  function func1(str1){
    console.log(str1);
    switch(str1){
    	case 'AC':
    	case 'CE':
    	  str0 = '0';
    	  str = '0';
          break;
        case '&divide;':
        case '&times;':
        case '-':
        case '+':  
        case '=':  
        case '.':
          str0 = str1;
          str += str1; 
          break;
        default:
          if(str0.length==1&&str0[0]=='0'&&flag) {
          	str0 = str1;
          	str = str1;
          } else{  
            str0 +=str1;
            str +=str1;
            flaf = 1;
          }  
          break;
    }
    element1.style.color = 'red';
    element1.innerText = str0;
    element2.innerText = str;
    if(str1=='+'||str1=='-'){
    	str0 = '';
    	flag = 0;
    }

  }

  document.body.addEventListener("click", function(event) {
    if (event.target.nodeName == "BUTTON"){
      func1(event.target.textContent);	
      console.log("Clicked", event.target.textContent, event.target.value);
    }
  });