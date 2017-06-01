  var str0 = '0';
  var str = '0';
  var str_hidden = '';
  var flag = 0;
  var element1 = document.getElementById('screen');
  var element2 = document.getElementById('underscreen');
  var n1, n2;
(function() {
  /**
   * Корректировка округления десятичных дробей.
   *
   * @param {String}  type  Тип корректировки.
   * @param {Number}  value Число.
   * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
   * @returns {Number} Скорректированное значение.
   */
  function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Десятичное округление к ближайшему
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Десятичное округление вниз
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Десятичное округление вверх
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

  function func1(str1){
  	function check(){
  		if(str0[0]!='0' && str0[0] != '+' && str0[0] != '-'&& str0[0] != '÷' && str0[0] != '×' && str0[0] != '.') return true;
  		else return false;
  	} 
    console.log(str1);
    // str_hidden = '';
    switch(str1){
    	case 'AC':
    	case 'CE':
    	  str0 = '0';
    	  str = '0';
          flag = 0;
          break;
        case '÷':
          if(flag){
          	str = str0 + str1;
            str0 = str1;
            flag = 0; 
          }else if(check()){
            str0 = str1;
            str_hidden = str + '/';
            str += str1;            
          } 
        case '×':
          if(check()){
            str0 = str1;
            str_hidden = str + '*';
            str += str1;
          } 
        case '-':
        case '+':    
        case '.':
          if(check()){
          // if(str0[0]!='0' && str0[0] && '+' && str0[0] != '-'&& str0[0] && '÷' && str0[0] != '×'){
          str0 = str1;
          str += str1;
          } 
          break;
        case '=':
          if(str_hidden){ 
          	// str0 = Math.round10(eval(str_hidden),-2);
          	n1 = eval(str_hidden);
          	n2 = Math.round10(n1, -2);
          	str0 = n2;
            } else str0 = Math.round10(eval(str),-2);
          str += '=' + str0;
          flag = 1;
          break;  
        default:
          if(str0[0]=='0') {
          	str0 = str1;
          	str = str1;
          } else if(str0[0] == '+'||str0[0] == '-'|| str0[0] == '÷'|| str0[0] == '×'){
          	str0 = str1;
          	str_hidden +=str1;
          	str+=str1;
          } else{  
            str0 +=str1;
            str +=str1;
          }  
          break;
    }
    element1.style.color = 'red';
    element1.innerText = str0;
    element2.innerText = str;
    // if(str1=='+'||str1=='-'){
    // 	str0 = '';
    // 	flag = 0;
    // }

  }

  document.body.addEventListener("click", function(event) {
    if (event.target.nodeName == "BUTTON"){
      func1(event.target.textContent);	
      console.log("Clicked", event.target.textContent, event.target.value);
    }
  });