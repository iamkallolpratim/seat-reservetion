var str = [];
var selectingSeats = [];
var formData = [];
var initiate;
var no_of_seat , arrayLength, total_seats;
var bookedSeats = [];

$(function () {
	var settings = {
            rows: 6,
            cols: 12,
            rowCssPrefix: 'row-',
            colCssPrefix: 'col-',
            seatWidth: 65,
            seatHeight: 65,
            seatCss: 'seat',
            selectedSeatCss: 'selectedSeat',
			selectingSeatCss: 'selectingSeat'
        };
		
		total_seats = settings.rows * settings.cols;

        initiate = function (reservedSeat) {
            var  seatNo, className;
            
            for (i = 0; i < settings.rows; i++) {
                
            	for (j = 0; j < settings.cols; j++) {
                    
            		seatNo = (i + j * settings.rows + 1);
                    
            		className = settings.seatCss + ' ' + settings.rowCssPrefix 
            					+ i.toString() + ' ' + settings.colCssPrefix + j.toString();
                    
            		if ($.isArray(reservedSeat) && $.inArray(seatNo, reservedSeat) != -1) {
                        className += ' ' + settings.selectedSeatCss;
                    }
                    
            		
            		var liRow = '<li class="' + className + '"' 
            					+'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' 
            					+'<a title="' + seatNo + '">' + seatNo + '</a>' 
            					+'</li>';
            		
            		
            		str.push(liRow);
            		
                }
            }
            
            $('#seat-list').html(str.join(''));
        
        };
        
      //initialize the seats
        //initiate();
        
        //initialize with reserved seat
        bookedSeats = [5, 10, 25, 35, 65];
        initiate(bookedSeats);
        
        
      //select seats
        $('.' + settings.seatCss).click(function () {
        	no_of_seat = $('#no_of_seats').val();
			if ($(this).hasClass(settings.selectedSeatCss)){
				
				alert('This seat is already reserved');
			}
			else{
                if(no_of_seat == 0){
                	alert('put no of seat fist');
                }
                
                else{
                	$(this).toggleClass(settings.selectingSeatCss);
    				selectingSeats = [];
    				storeInArray();
    				arrayLength = selectingSeats.length;
    				if(arrayLength > no_of_seat){
    					alert('opps! you can\'t click more than inputed seats');
    					$(this).removeClass(settings.selectingSeatCss);
    					selectingSeats.pop();
    					console.log(selectingSeats);
    				}
    					
    				
    			}
				
			}
         });
        
        
        //store selecting seats in a array
        function storeInArray(){
        	//selectingSeats.splice(0, selectingSeats.length);
        	var item;
        	$.each($('#seat-list li.' + settings.selectingSeatCss + ' a'), function (index, value) {
                 item = $(this).attr('title');                   
                 selectingSeats.push(item);                   
             });
        	//arrayLength = selectingSeats.length;
        	console.log(selectingSeats);
        }
	
});

//validation on putting seat number
$('#no_of_seats').keyup(function() {
	var $field = $(this);

	// this is the value before the keypress
	var beforeVal = $field.val();
	if (beforeVal > total_seats) {
		alert('you can\'t enter more than total seats');
		$('#no_of_seats').val('');
	}
});

//save details
function saveDetails(){
	var name = $.trim($("#name").val());
	var no_seat = $.trim($("#no_of_seats").val());
	
	if (name == 0 || name == '') {
		alert('please enter your name');
	} else if (no_seat == 0 || no_seat == '') {
		alert('please enter no of seats');
	} else if (selectingSeats.length == 0  ) {
		alert('please select seats');
	} else {
		
		formData.push({'name':name, 'no_seat':no_seat, 'selectingSeats' : selectingSeats});
		
		console.log(formData);
		
		for (var i=0; i < formData.length; i++){
			
			var tableRow = '<tr>'
							+'<td>'+formData[i].name+'</td>'
							+'<td>'+formData[i].no_seat+'</td>'
							+'<td>'+selectingSeats+'</td>'
							+'</tr>';
			
		}	
		
		$('#seat_table').append(tableRow);
		$('form#booking-form').each(function() {
			this.reset();
		});
		selectingSeats = [];
	}
}