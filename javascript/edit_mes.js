var mes;

if(localStorage.getItem("selectedMes") == "01")
  mes = "Janeiro";
else if(localStorage.getItem("selectedMes") == "02")
  mes = "Fevereiro";
else if(localStorage.getItem("selectedMes") == "03")
  mes = "Março";
else if(localStorage.getItem("selectedMes") == "04")
  mes = "Abril";
else if(localStorage.getItem("selectedMes") == "05")
  mes = "Maio";
else if(localStorage.getItem("selectedMes") == "06")
  mes = "Junho";
else if(localStorage.getItem("selectedMes") == "07")
  mes = "Julho";
else if(localStorage.getItem("selectedMes") == "08")
  mes = "Agosto";
else if(localStorage.getItem("selectedMes") == "09")
  mes = "Setembro";
else if(localStorage.getItem("selectedMes") == "10")
  mes = "Outubro";
else if(localStorage.getItem("selectedMes") == "11")
  mes = "Novembro";
else if(localStorage.getItem("selectedMes") == "12")
  mes = "Dezembro";

var fs = require('fs');
var mesesJSON = JSON.parse(fs.readFileSync('./json/meses.json', 'utf8'));

$("#clientes-input").val(mesesJSON.meses[localStorage.getItem("selectedAno")][localStorage.getItem("selectedMes")].clientes);
$("#recebido-input").val(mesesJSON.meses[localStorage.getItem("selectedAno")][localStorage.getItem("selectedMes")].recebido);

var despesas = mesesJSON.meses[localStorage.getItem("selectedAno")][localStorage.getItem("selectedMes")].despesas;
for(var i = 0; i < mesesJSON.meses[localStorage.getItem("selectedAno")][localStorage.getItem("selectedMes")].despesas.length; i++){
  console.log(despesas);
  $('#despesas').append($('<input>', {
      value: Object.keys(despesas[i])[0],
      class: 'col-xs-5 despesa despesa-field despesa-label'
  }));
  $('#despesas').append($('<input>', {
      value: Object.values(despesas[i])[0],
      class: 'col-xs-5 despesa despesa-field despesa-value'
  }));
}

$("#mesh1").text(mes + " " + localStorage.getItem("selectedAno"));

$("#back-mensal").click(function(){
  window.location = 'busca_anual.html';
});

$("#add-despesa").click(function(){
  $('#despesas').append($('<input>', {
      class: 'col-xs-5 despesa despesa-field despesa-label'
  }));
  $('#despesas').append($('<input>', {
      class: 'col-xs-5 despesa despesa-field despesa-value'
  }));
  return false;
});

$("#remove-despesa").click(function(){
  var despesasArray = $("#despesas").find(".despesa-field");
  if(despesasArray.length > 0){
    despesasArray[despesasArray.length-1].remove();
    despesasArray[despesasArray.length-2].remove();
  }
  return false;
});

$("#update-clientes").click(function(){
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));
  var clientes = clientesJSON.clientes;
  var totalClientes = 0;

  for(var i = 0; i < clientes.length; i++){
    for(var j = 0; j < clientes[i].servicos.length; j++){
      if(clientes[i].servicos[j].data.substring(6, 10) == localStorage.getItem("selectedAno") && clientes[i].servicos[j].data.substring(3, 5) == localStorage.getItem("selectedMes")) {
        totalClientes++;
        break;
      }
    }
  }

  $("#clientes-input").val(totalClientes);

  return false;
});

$("#update-pecas").click(function(){
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));
  var clientes = clientesJSON.clientes;
  var totalCusto = 0;

  for(var i = 0; i < clientes.length; i++){
    for(var j = 0; j < clientes[i].servicos.length; j++){
      if(clientes[i].servicos[j].data.substring(6, 10) == localStorage.getItem("selectedAno") && clientes[i].servicos[j].data.substring(3, 5) == localStorage.getItem("selectedMes")) {
        totalCusto += parseFloat(clientes[i].servicos[j].custo);
      }
    }
  }

  $("#pecas-val").val(totalCusto);

  return false;
});

$("#update-recebido").click(function(){
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));
  var clientes = clientesJSON.clientes;
  var totalRecebido = 0;

  for(var i = 0; i < clientes.length; i++){
    for(var j = 0; j < clientes[i].servicos.length; j++){
      if(clientes[i].servicos[j].data.substring(6, 10) == localStorage.getItem("selectedAno") && clientes[i].servicos[j].data.substring(3, 5) == localStorage.getItem("selectedMes")) {
        totalRecebido += parseFloat(clientes[i].servicos[j].preco);
      }
    }
  }

  $("#recebido-input").val(totalRecebido);

  return false;
});

$("#mes-form").submit(function(){
  var nan = false;
  var virg = false;
  var pont2 = false;

  for(var i = 0; i < $(".despesa-value").length; i++){
    if(isNaN(parseFloat($(".despesa-value")[i].value))){
      nan = true;
      break;
    }
    else if($(".despesa-value")[i].value.includes(",")){
      virg = true;
      break;
    }
    else if(($(".despesa-value")[i].value.match(/\./g) || []).length > 1){
      pont2 = true;
      break;
    }
  }

  if(nan) {
    $(".error").text("Utilize apenas números e pontos nos campos de valores. Pontos são utilizados para separar reais e centavos.");
    $(".error").show();
    return false;
  }

  else if(virg) {
    $(".error").text("Não utilize vírgulas. Utilize pontos para separar reais e centavos.");
    $(".error").show();
    return false;
  }

  else if(pont2) {
    $(".error").text("Utilize apenas um ponto separar reais e centavos.");
    $(".error").show();
    return false;
  }

  else{
    var despesas1 = [];
    var despesasFields = $("#despesas").find(".despesa");

    for(var j = 0; j < despesasFields.length; j=j+2) {
      var dKey = despesasFields[j].value;
      var dVal = despesasFields[j+1].value;
      var dObj = '{"'+dKey+'": "'+dVal+'"}';
      despesas1.push(JSON.parse(dObj));
    }

    var objAdd = JSON.stringify({
      "clientes": $("#clientes-input").val(),
      "recebido": $("#recebido-input").val(),
      "despesas": despesas1
    });

    var mesSelecionado = localStorage.getItem("selectedMes");

    for(var i = 0; i < Object.keys(mesesJSON.meses).length; i++) {
      if(Object.keys(mesesJSON.meses)[i]==localStorage.getItem("selectedAno")) {
        $.extend(mesesJSON.meses[Object.keys(mesesJSON.meses)[i]], JSON.parse('{"'+mesSelecionado+'": '+objAdd+'}'));
        fs.writeFileSync("./json/meses.json", JSON.stringify(mesesJSON), function(err) {
            if(err) {
                return console.log(err);
            }
        });
        window.location = 'busca_anual.html';
        return false;
      }
    }

    mesesJSON.meses[localStorage.getItem("selectedAno")] = JSON.parse('{"'+mesSelecionado+'": '+objAdd+'}');

    fs.writeFileSync("./json/meses.json", JSON.stringify(mesesJSON), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    window.location = 'busca_anual.html';

    return false;
  }
});
