var fs = require('fs');
var mesesJSON = JSON.parse(fs.readFileSync('./json/meses.json', 'utf8'));

for(var i = 0; i <Object.keys(mesesJSON.meses).length; i++){
  $('#ano-select').append($('<option>', {
      value: Object.keys(mesesJSON.meses)[i],
      text: Object.keys(mesesJSON.meses)[i]
  }));
}

$('#ano-select').change(function() {
  $("#info-mes").hide();

  var myNode =document.getElementById("mes-select");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  $('#mes-select').append($('<option>', {}));

  if($('#ano-select').val()){
    for(var i = 0; i <Object.keys(mesesJSON.meses[$('#ano-select').val()]).length; i++){
      $('#mes-select').append($('<option>', {
        value: Object.keys(mesesJSON.meses[$('#ano-select').val()])[i],
        text: Object.keys(mesesJSON.meses[$('#ano-select').val()])[i]
      }));
    }
  }
});

$('#mes-select').change(function() {
  if($('#mes-select').val()){
    var myNode =document.getElementById("despesas");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    $("#clientes").text(mesesJSON.meses[$('#ano-select').val()][$('#mes-select').val()].clientes);
    $("#recebido").text(mesesJSON.meses[$('#ano-select').val()][$('#mes-select').val()].recebido);

    $("#despesas").append('<h4>Despesas</h4>')
    var despesas = mesesJSON.meses[$('#ano-select').val()][$('#mes-select').val()].despesas;
    for(var i = 0; i < despesas.length;i++){
      $("#despesas").append('<label>'+Object.keys(despesas[i])[0]+'</label><p>'+Object.values(despesas[i])[0]+'</p>');
    }
    $("#info-mes").show();
  }
  else{
    $("#info-mes").hide();
  }
});


$("#addMensal").click(function() {
  window.location = "add_mensal.html";
});

$("#back-anual").click(function(){
  window.location = "index.html";
});