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
        var numberBomb = $("#choiseN option:selected").text();
        numberBomb = parseInt(numberBomb);
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
        for (var u=0; u<numberBomb;) { //add unluck box to table
            var index = Math.floor(Math.random() * Math.pow(size, 2));
            if ($('td').eq(index).attr('id') == 'unluck'){
                continue;
            }
            $('td').eq(index).attr('id', 'unluck');
            u++;
        }
        $('table').bind("contextmenu",function(e){
            return false;
        });
        $('td').mousedown(function(event){
            event.preventDefault();
            if (event.button == 2){
                $(this).toggleClass('default_r');
            }
        });
        $('td').on('click', function(){
            if ($(this).attr('id') == 'unluck'){
                $(this).addClass('unluck').removeClass('default');
                $('#hint').html('YOU LOSE! Maybe luck next time...');
                $('td').unbind('click')
                       .unbind('mousedown');
                $('td[id=unluck]').addClass('unluck').removeClass('default');
                return true;
            }
            var index = $(this).index();
            var number = 0; // number of bomb near box, which clicked
            if ($(this).next().attr('id') == 'unluck'){
                number++;
            }
            if ($(this).prev().attr('id') == 'unluck'){
                number++;
            }
            if ($(this).parent().prev().children().eq(index).attr('id') == 'unluck'){
                number++;
            }
            if ($(this).parent().prev().children().eq(index).prev().attr('id') == 'unluck'){
                number++;
            }
            if ($(this).parent().prev().children().eq(index).next().attr('id') == 'unluck'){
                number++;
            }
            if ($(this).parent().next().children().eq(index).attr('id') == 'unluck'){
                number++;
            }
            if ($(this).parent().next().children().eq(index).prev().attr('id') == 'unluck'){
                number++;
            }
            if ($(this).parent().next().children().eq(index).next().attr('id') == 'unluck'){
                number++;
            }
            switch (number){
                case 0: {
                    $(this).addClass('luck').removeClass('default');
                    break;
                }
                case 1:{
                    $(this).addClass('luck_1').removeClass('default');
                    break;
                }
                case 2:{
                    $(this).addClass('luck_2').removeClass('default');
                    break;
                }
                case 3:{
                    $(this).addClass('luck_3').removeClass('default');
                    break;
                }
                case 4:{
                    $(this).addClass('luck_4').removeClass('default');
                    break;
                }
                case 5:{
                    $(this).addClass('luck_5').removeClass('default');
                    break;
                }
                case 6:{
                    $(this).addClass('luck_6').removeClass('default');
                    break;
                }
                case 7:{
                    $(this).addClass('luck_7').removeClass('default');
                    break;
                }
                case 8:{
                    $(this).addClass('luck_8').removeClass('default');
                    break;
                }
            }
            if ($('.default').length == numberBomb) {
                $('#hint').html('YOU WIN! Can you play again?');
                $('td').unbind('click')
                       .unbind('mousedown');
                $('td[id=unluck]').addClass('unluck').removeClass('default');
            }
        });
    }
});

