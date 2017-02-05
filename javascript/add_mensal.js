var yyyy = new Date().getFullYear();

for(var i = 2016; i <= yyyy; i++) {
  $('#ano-select').append($('<option>', {
      value: i,
      text: i
  }));
}

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
    var fs = require('fs');
    var mesesJSON = JSON.parse(fs.readFileSync('./json/meses.json', 'utf8'));

    var despesas = [];
    var despesasFields = $("#despesas").find(".despesa");

    for(var j = 0; j < despesasFields.length; j=j+2) {
      var dKey = despesasFields[j].value;
      var dVal = despesasFields[j+1].value;
      var dObj = '{"'+dKey+'": "'+dVal+'"}';
      despesas.push(JSON.parse(dObj));
    }

    var objAdd = JSON.stringify({
      "clientes": $("#clientes-input").val(),
      "recebido": $("#recebido-input").val(),
      "despesas": despesas
    });

    var mesSelecionado = $("#mes-select").val();


    for(var i = 0; i < Object.keys(mesesJSON.meses).length; i++) {
      if(Object.keys(mesesJSON.meses)[i]==$("#ano-select").val()) {
        console.log(mesSelecionado);
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

    mesesJSON.meses[$("#ano-select").val()] = JSON.parse('{"'+mesSelecionado+'": '+objAdd+'}');

    fs.writeFileSync("./json/meses.json", JSON.stringify(mesesJSON), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    window.location = 'busca_anual.html';

    return false;
  }
});


$("#back-mensal").click(function(){
  window.location = 'busca_anual.html';
});


$("#update-clientes").click(function(){
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));
  var clientes = clientesJSON.clientes;
  var totalClientes = 0;

  for(var i = 0; i < clientes.length; i++){
    for(var j = 0; j < clientes[i].servicos.length; j++){
      if(clientes[i].servicos[j].data.substring(6, 10) == $("#ano-select").val() && clientes[i].servicos[j].data.substring(3, 5) == $("#mes-select").val()) {
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
      if(clientes[i].servicos[j].data.substring(6, 10) == $("#ano-select").val() && clientes[i].servicos[j].data.substring(3, 5) == $("#mes-select").val()) {
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
      if(clientes[i].servicos[j].data.substring(6, 10) == $("#ano-select").val() && clientes[i].servicos[j].data.substring(3, 5) == $("#mes-select").val()) {
        totalRecebido += parseFloat(clientes[i].servicos[j].preco);
      }
    }
  }

  $("#recebido-input").val(totalRecebido);

  return false;
});
