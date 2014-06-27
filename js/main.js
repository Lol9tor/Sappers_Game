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
    var ny=0,rotYINT;
    var nameClass;
    var flag = false;
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
        for (var u=0; u<numberBomb;) { //add unluck boxes to table
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
            if (flag){ // taboo click on box, while it animate
                return false;
            }
            flag = true;
            if ($(this).attr('id') == 'unluck'){
                $(this).addClass('unluck').removeClass('default');
                $('#hint').html('YOU LOSE! Maybe luck next time...');
                $('td').unbind('click')
                       .unbind('mousedown');
                $('td[id=unluck]').addClass('unluck').removeClass('default');
                flag = false;
                //rotateBox(this);
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
            nameClass = 'luck_'+number;
            // ---------------------------------
            // start effect coup image
            rotateBox(this);
            // end effect
            // ---------------------------------
            if ($('.default').length == (numberBomb+1)) {
                $('#hint').html('YOU WIN! Can you play again?');
                $('td').unbind('click')
                    .unbind('mousedown');
                $('td[id=unluck]').addClass('unluck').removeClass('default');
            }
        });
    }
    function rotateBox(element){
        rotYINT=setInterval(function(){
            ny=ny+2;
            element.style.transform="rotateY(" + ny + "deg)";
            element.style.webkitTransform="rotateY(" + ny + "deg)";
            element.style.OTransform="rotateY(" + ny + "deg)";
            element.style.MozTransform="rotateY(" + ny + "deg)";
            if (ny==90) {
                $(element).addClass(nameClass).removeClass('default');
            }
            if (ny==180) {
                clearInterval(rotYINT);
                if (ny>=180){ny=0}
                $(element).unbind('click')
                    .unbind('mousedown');
                flag = false;
            }
        },5);
    }
});

