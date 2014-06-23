$(document).ready(function () {
    //create default table
    drawTable ();

    $('select').on('change', function(){    //redraw table
        $('table').remove();
        drawTable();
});
    $('button').on('click', function(){ //restart game
        $('table').remove();
        drawTable();
    });
    function drawTable () {
        $('#hint').html('');
        var size = $("#choiseSize").val();
        size = parseInt(size);
        var number = $("#choiseN option:selected").text();
        number = parseInt(number);
        var table = $('<table></table>').addClass('table');
        for(var i=0; i<size; i++){
            var row = $('<tr></tr>');
            table.append(row);
            for(var j=0; j<size; j++){
                var td1 = $('<td></td>').addClass('default');
                row.append(td1);
            }
        }
        $('#game_table').append(table);
        for (var u=0; u<number;) {
            var index = Math.floor(Math.random() * Math.pow(size, 2));
            if ($('td').eq(index).attr('id') == 'unluck'){
                continue;
            }
            $('td').eq(index).attr('id', 'unluck');
            u++;
        }
        $('td').on('click', function(){
            if ($(this).attr('id') == 'unluck'){
                $(this).addClass('unluck').removeClass('default');
                $('#hint').html('YOU LOSE!');
                $('td').unbind('click');
                $('td[id=unluck]').addClass('unluck').removeClass('default');
                return true;
            }
            $(this).addClass('luck').removeClass('default');
            if ($('.luck').length == (Math.pow(size, 2)-number)) {
                $('#hint').html('YOU WIN!');
                $('td').unbind('click');
                $('td[id=unluck]').addClass('unluck').removeClass('default');
            }
        });
    }
});

