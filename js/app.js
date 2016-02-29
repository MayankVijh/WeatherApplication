$(document).ready(function($){
//Variable to loop through Autocomplete API selection 
    var i;
//Variable to add item to array for Autocomplete
    var out;
//Create array for Autocomplete API
    var arr=[];
//Entry for selected cities
    var selected=[];
//Intially hide the image and a tags
    $("#display_temp").hide();
    $("#close_city").hide();
     $("#add_city").hide();
//Function to invoke at key press
    $('#autocomplete').keyup(function(){
        var value=$(this).val();           
        //Call Autocomplete Function
        callAutocomplete(value);
      });

    //Autocomplete textboox creation
    function callAutocomplete(value)
    {//Ajax call to get jsonp data
        $.ajax({
        url:"http://autocomplete.wunderground.com/aq?format=JSON&cb=?",
        dataType: "jsonp",
        data:{
            "query":value
            },
        crossDomain: true,
        success: function (parsed_json) {//Function evoked on success of Ajax call
            var c =$.each(parsed_json.RESULTS,function(i,item){
                        out=(parsed_json.RESULTS[i].name);
                        arr.push(out);

                        });
            $( "#autocomplete" ).autocomplete({//Jquery function to bind data to textbox
                source:arr,
                select: function(e, ui){
                    $('#autocomplete').val(ui.item.value);
                    alert($('#autocomplete').val());
                    //Call hourly api to get data
                    hourlyapicall($('#autocomplete').val());
                 }

            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }

        });
    }
    
    //Hour api function
    function hourlyapicall(name)
    {
        $("#selecteddiv").show();
         $("#selectedlist").html('');
        //Key for wundergraound api call
        var key="3d8e6a855cf177b2"
        $.getJSON("http://api.wunderground.com/api/"+key+"/hourly/q/CA/"+name+".json",function(resp){
            var tempcel = resp.hourly_forecast[0].temp.metric;
            var tempfar = resp.hourly_forecast[0].temp.english;
            var condition = resp.hourly_forecast[0].condition;
            var time = resp.hourly_forecast[0].FCTTIME.hour;
            var totaltemp = tempcel+" &#8451; / "+tempfar+ " &#8457;";
            //Bind image corresponding to the condition returned from api
            var img = $("#showimg");
            var imgsrc=bindimage(img,condition);
            alert(imgsrc);
            selected.push({//Create array for selected cities
                name: name, 
                condition: condition,
                src: imgsrc
            });
            localStorage.setItem('selected', JSON.stringify(selected));
            alert(temp);
            alert(condition);
            alert(time);
            
            $("#select").hide();
            $("#display_temp").show();
            $("#close_city").hide();
     $("#add_city").show();
            $("#temp").html(totaltemp);
            $("#condition").html(condition);
            $("#name").html(name);
            if (time>=19 || time<=7)
            {
                $("body").css("background-color","#06245f");
            }
            else
            {
                 $("body").css("background-color","#06cdff");
            }
            $.each(selected , function(i, val) { alert("Hi");
                $("#selectedlist").append('<li class="horizontal-li"><a id="all'+i+'" href="javascript:void(0)"><img class="ul-image" src="'+selected[i].src+'"></a><br>'+selected[i].name+'<br>'+selected[i].condition+'</li>');
                });
        });

    
    
    }
    
//Function to get the images according to the option    
    function bindimage(img,condition)
    {
         if (condition==="Mostly Cloudy")
           {
               img.attr("src","images/very_cloudy_1x.png");
               return "images/very_cloudy_1x.png"
           }
           else if(condition==="Partly Cloudy" || condition==="Scattered Clouds" || condition==="Overcast" || condition==="Funnel Cloud")
           {
               img.attr("src","images/cloudy_1x.png");
               return "images/very_cloudy_1x.png"
           }
            else if(condition==="Heavy Fog")
           {
               img.attr("src","images/fog_cloudy_1x.png");
               return "images/fog_cloudy_1x.png"
           }
            else if(condition.indexOf("Fog") >= 0)
           {
               img.attr("src","images/fog_1x.png");
               return "images/fog_1x.png";
           }
           else if(condition.indexOf("Rain") >= 0)
           {
               img.attr("src","images/rain_1x.png");
               return "images/rain_1x.png";
           }
           else if(condition.indexOf("Hail") >= 0)
           {
               img.attr("src","images/hail_1x.png");
               return "images/hail_1x.png";
           }
           else if(condition.indexOf("Snow") >= 0 || condition.indexOf("Ice") >= 0)
           {
               img.attr("src","images/snow_1x.png");
               return "images/snow_1x.png";
           }
            else if(condition==="Clear")
           {
               img.attr("src","images/sun_1x.png");
               return "images/sun_1x.png";
           }
            else if (condition.indexOf("Thunderstorm") >= 0)
           {
               img.attr("src","images/thunderstorm_1x.png");
               return "images/thunderstorm_1x.png";
           }
            else if (condition.indexOf("Tornado") >= 0)
           {
               img.attr("src","images/tornado_1x.png");
               return "images/tornado_1x.png";
           }
            else if (condition.indexOf("Sand") >= 0)
           {
               img.attr("src","images/windy_1x.png");
               return "images/windy_1x.png";
           }
            else
            {
                img.hide();
                return "Not Found";
            }
    }
    
    
   $('#add_city').on("click",function(){
                 $("#display_temp").hide();
                $("#select").show();
       $("#close_city").show();
     $("#add_city").hide();
       $("#selecteddiv").hide();
        
            });   
    
    $('#close_city').on("click",function(){
                 $("#display_temp").show();
                $("#select").hide();
        $("#close_city").hide();
     $("#add_city").show();
        $("#selecteddiv").show();
            });  
    
     $('#choose_city').on("click",function(){
                
            });  
    
});







