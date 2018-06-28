// JQuery for the creation of work tickets
// Created 2017/11 by Warren Fitzhenry

function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 0);
	}
}
function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if(direction == 'right') {
		new_value = now_value + ( 100 / number_of_steps );
	}
	else if(direction == 'left') {
		new_value = now_value - ( 100 / number_of_steps );
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

jQuery(document).ready(function() {

    $('form fieldset:first').fadeIn('slow');
    
    $('form input[type="text"], form input[type="password"], form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    

    // When user clicks on next button...

    $('form .btn-next').on('click', function() {  // .btn-next is the class for the next button.
    	var parent_fieldset = $(this).parents('fieldset');   // set this variable to the current fieldset.
    	var next_step = true;   // sets this true, if not filled in correctly, then changes to false
    	var current_active_step = $(this).parents('form').find('.form-wizard.active');
    	var progress_line = $(this).parents('form').find('.progress-line');
    	

        // first step = confirm client details are correct.
        // if checkbox not selected then text shows up red. next-step = false, not allowed to continue.
        parent_fieldset.find('input[type="checkbox"]').each(function() {
            // if not checked, then change the css of form.check.label to red.  ( dot . = class). next_step = false (not allowed to continue)
            if( $(this).prop("checked") == false ) {
                $('.form-check-label').css("color","red");
                next_step = false;
            }
            else {
                $('.form-check-label').css("color","black");
            }
        });


        // if any select box is visible and user has not chosen anything then input error is shown. (input-error classs is added). 'select' is an html tag
        // default value is empty ""
        //cannot continue (next step becomes false)
        parent_fieldset.find(':visible').find('select').each(function() {
            if( $(this).val() == "" ) {
                $(this).addClass('input-error');
                next_step = false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        


        //if user has selected 'Other' (textarea) and if this is not filled in, then input error.   # = id
        parent_fieldset.find(':visible').find('#prob_desc').each(function() {
            var textarea = $('#prob_desc');
            var isVisible = textarea.is(':visible');
            if( $(this).val() == "" && ((isVisible === true))) {
                $(this).addClass('input-error');
                next_step = false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });

  	

        // if next step is true, then move along to next step. remove 'active' from current wizard form and add to the next.
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
    			current_active_step.removeClass('active').addClass('activated').next().addClass('active');   // remove the active class from the current form wizard, and add to the next
    			bar_progress(progress_line, 'right');
	    		$(this).next().fadeIn();
    			scroll_to_class( $('form'), 25 );
	    	});
    	}
    	
    });
    
    // previous step
    $('form .btn-previous').on('click', function() {
    	var current_active_step = $(this).parents('form').find('.form-wizard.active');
    	var progress_line = $(this).parents('form').find('.progress-line');
    	
    	$(this).parents('fieldset').fadeOut(400, function() {
    		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
    		bar_progress(progress_line, 'left');
    		$(this).prev().fadeIn();
			scroll_to_class( $('form'), 25 );
    	});
    });
    
    /*
    $('form').on('submit', function(e) {
    	$(this).find('input[type="text"], input[type="password"], input[type="username"], input[type="email"], input[type="tel"], input[type="url"], select').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    });
    */

    // when user selects a prob type, the next menu for the selected prob description is shown.
    $("#prob_type_1").change(function(){
    correspondingID = $(this).find(":selected").val()  // variable to capture the selected value  from the dropdown list.
    $(".warren").hide();                               // hide all classes but, 
    $("#" + correspondingID).show();                    // show the menu for the selected dropdown.
    }),




    // when  prob type selected is SS-20 Appliance, and when user selected 'Other' from the dropdown, then
    // a textarea input shows, and is required. If user then changes this to another selection, textarea is hidden.
    $( "#SS-20Appliance" ).change(function() {
    var val = $("#SS-20Appliance").find(":selected").val();
    if(val=="Other"){
    $("#prob_desc").show();
    } else {
    $("#prob_desc").hide();
    }
    });

      // when  prob type selected is bboxxappliance and when user selected 'Other' from the dropdown, then
    // a textarea input shows, and is required. If user then changes this to another selection, textarea is hidden.
    $( "#BBoxxAppliance" ).change(function() {
    var val = $("#BBoxxAppliance").find(":selected").val();
    if(val=="Other"){
    $("#prob_desc").show();
    } else {
    $("#prob_desc").hide();
    }
    });

     // when  prob type selected is SS-20 dbbox, and when user selected 'Other' from the dropdown, then
    // a textarea input shows, and is required. If user then changes this to another selection, textarea is hidden.
    $( "#SS-20DBBox" ).change(function() {
    var val = $("#SS-20DBBox").find(":selected").val();
    if(val=="Other"){
    $("#prob_desc").show();
    } else {
    $("#prob_desc").hide();
    }
    });

    // if prob type selected is 'SS-20 Low Battery'. When the menu is changed, and the user selected 'Other' then a text area input shows, and is required.
    $( "#SS-20LowBattery" ).change(function() {
    var val = $("#SS-20LowBattery").find(":selected").val();
    if(val=="Other"){
    $("#prob_desc").show();
    } else {
    $("#prob_desc").hide();
    }
    });
    $lowbattery = $("#lowbatterymodal");


    // if prob type selected is 'SS-20 Failed Comms'. When the menu is changed, and the user selected 'Other' then a text area input shows, and is required.
    $( "#SS-20FailedComms" ).change(function() {
    var val = $("#SS-20FailedComms").find(":selected").val();
    if(val=="Other"){
    $("#prob_desc").show();
    } else {
    $("#prob_desc").hide();
    }
    });


    // if prob type selected is 'Administration'. When the menu is changed, and the user selected 'Other' then a text area input shows, and is required.
    $( "#Administration" ).change(function() {
    var val = $("#Administration").find(":selected").val();
    if(val=="Other"){
    $("#prob_desc").show();
    } else {
    $("#prob_desc").hide();
    }
    });






    // if prob type selected is 'SS-20 Db Box'. When the menu is changed, and the user selected 'Other' then a text area input shows, and is required.    
    $( "#BBoxxCUUnit" ).change(function() {              
    var val = $("#BBoxxCUUnit").find(":selected").val();
    if(val=="Other"){
    $("#prob_desc").show();
    } else {
    $("#prob_desc").hide();
    }
    $htbmodal = $("#htbmodal");
    if(val =="Middle LED is Flashing - System Disabled"){
        $htbmodal.modal("show")
    }
    $balancemodal = $("#balancemodal");
    if(val =="Account Balance Query"){
        $balancemodal.modal("show")
    }
    $batterypre = $("#batterypre");
    $batteryprep = $("#batteryprep").val();
    if((val =="Bottom LED is Flashing - Battery Discharged") || (val =="Middle LED is Flashing - System Disabled")){
        if ($batteryprep == 'Y') {
        $batterypre.modal("show")
        }
    }  
    });



    /*

    $('.form-control-2').bind('change', function() {
    var elements = $('div.bboxxcuunit-comments').children().hide(); // hide all the elements
    var value = $(this).val();

    if (value.length) { // if somethings' selected
        elements.filter('.' + value).show(); // show the ones we want
    }
    }).trigger('change');

    */

});

