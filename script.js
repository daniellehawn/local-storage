
"use strict";

var teamArr = [];

//-----------------------------------------------------------------------------//
//These watch for button clicks to change the form

$('#showFootball').click(function() {
  showForm();
});



//write function to get data from the form and display in the table

	$("#addFootball").submit(function() {
      event.preventDefault();
      teamArr.push({
        name: $("#input-name").val(),
        team: $("#input-team").val(),
        player: $("#input-player").val()
      })
      showTable();
      buildTable();
      saveFootballData();
      $("input").val(" ");
    });



function buildTable() {
  $("#build-tbody").empty();
  var tr, td, button;
  for (var i = 0; i < teamArr.length; i++) {
    tr = $("<tr>");
    
    td = $("<td>");
    td.text(teamArr[i].name);
    tr.append(td);
    
    td = $("<td>");
    td.text(teamArr[i].team);
    tr.append(td);
    
    td = $("<td>");
    td.text(teamArr[i].player);
    tr.append(td);
    
    td = $("<td>");
    button = $("<button type='button' id='btn' class='editBtn'>");
    button.text("Edit");
    td.append(button);
    button = $("<button type='button' id='btn' class='deleteBtn'>");
    button.text("Delete");
    td.append(button);
    tr.append(td);
    
    $("#build-tbody").append(tr);

  }

//Delete the Data
  $(".deleteBtn").click(function() {
    $(this).parents("tr").remove();
    var deleteId = $(this).parents().siblings(":first").text();
    teamArr = teamArr.filter(function(el) {
      return el.name !== deleteId;
    });
    saveFootballData();
  });

  // Edit Data
  $(".editBtn").click(function() {
    var editId = $(this).parents().siblings(":first").text();
    var editTeam = $.grep(teamArr, function(el) {
      return el.name === editId;
    })[0];
    showForm();
    $("#input-name").val(editTeam.name);
    $("#input-team").val(editTeam.team);
    $("#input-player").val(editTeam.player);
    teamArr = teamArr.filter(function(el) {
      return el.name !== editId;
    });
  });

}
//Use LocalStorage

displayLocalStorage();

function displayLocalStorage() {
  var teamLocalStorage = localStorage["teamArr"];
  if (teamLocalStorage) {
    teamArr = JSON.parse(teamLocalStorage);
  } else {
    teamArr = [];
  }  
  buildTable();
}

function saveFootballData() {
  localStorage["teamArr"] = JSON.stringify(teamArr);
}
  

//write function to show form

function showForm() {
  $('#showFootball').hide();
  $('#football-data').hide();
  $('#hide-form').show();
}

function showTable(){
  $('#showFootball').show();
  $('#football-data').show();
  $('#hide-form').hide();
}