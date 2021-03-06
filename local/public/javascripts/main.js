$(document).ready(function() {

  function reload() {
    $.get('/dbid', function(data) {
      $('#connectionInfo').html("Connected to: " + data)
    });
    $('.hidden').fadeOut();
    $('displayOutput').empty();
    $.get( '/words', function(data) {
      console.log("showing", data);

      var rendered = "<ul>";
      data.forEach(function(item) {
        rendered = rendered + "<li title="+item._id+">The word <b>" + item.word + "</b> is defined as <b>" + item.definition + "</b></li>";
      });
      rendered = rendered + "</ul>";

      $('#displayOutput').html(rendered);
    });
    $('.hidden').fadeIn();
  }

  $('#add-word').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '/words',
      type: 'PUT',
      data: $(this).serialize(),
      success: function(data) {
        reload();
      }
    });
  });

  // load data on start
  reload();

});
