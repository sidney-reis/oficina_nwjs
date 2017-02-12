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
  if($('#ano-select').val()){
    $("#anoh3").text("Gastos de "+$('#ano-select').val()+":");
    var gastoAno = 0;
    for(var i = 0; i < Object.keys(mesesJSON.meses[$('#ano-select').val()]).length; i++){
      for(var j = 0; j < mesesJSON.meses[$('#ano-select').val()][Object.keys(mesesJSON.meses[$('#ano-select').val()])[i]].despesas.length; j++){
        gastoAno += parseFloat(Object.values(mesesJSON.meses[$('#ano-select').val()][Object.keys(mesesJSON.meses[$('#ano-select').val()])[i]].despesas[j])[0]);
      }
    }
    $("#gastoano").text(gastoAno);
    $("#info-ano").show();

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
  }
  else {
    $("#info-ano").hide();
    var myNode =document.getElementById("mes-select");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    $('#mes-select').append($('<option>', {}));
  }
});

$('#mes-select').change(function() {
  $("#info-ano").hide();

  if($('#mes-select').val()){
    var myNode =document.getElementById("despesas");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    $("#clientes").text(mesesJSON.meses[$('#ano-select').val()][$('#mes-select').val()].clientes);
    $("#recebido").text(mesesJSON.meses[$('#ano-select').val()][$('#mes-select').val()].recebido);

    $("#despesas").append('<h4>Despesas</h4>')
    var despesas = mesesJSON.meses[$('#ano-select').val()][$('#mes-select').val()].despesas;
    var totalDesp = 0;
    for(var i = 0; i < despesas.length;i++){
      totalDesp += parseFloat(Object.values(despesas[i])[0]);
      $("#despesas").append('<label>'+Object.keys(despesas[i])[0]+'</label><p>'+Object.values(despesas[i])[0]+'</p>');
    }

    $("#despesas").append('<h3>Total em despesas:</h3><p>'+totalDesp+'</p><button id="edit-mes" onclick="editClick()">Modificar mês</button>');
    $("#info-mes").show();
  }
  else{
    $("#info-mes").hide();
  }
});

function editClick(){
  localStorage.setItem("selectedAno", $('#ano-select').val());
  localStorage.setItem("selectedMes", $('#mes-select').val());
  window.location = "edit_mes.html";
}

$("#addMensal").click(function() {
  window.location = "add_mensal.html";
});

$("#back-anual").click(function(){
  window.location = "index.html";
});