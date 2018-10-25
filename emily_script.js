var fs = require('fs');
var cheerio = require('cheerio');

var toTitleCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};

for(var i=1;i<6;i++){
    
    var file = i;
    var content = fs.readFileSync('data/m0' + file + '.txt');
    var $ = cheerio.load(content);
    var table = $('table').eq(2);
    var cell = table.find($('td'));
    var save_path = 'parsed_data/parsed_m0' + file + '.json';
    var dict = [];
    var constant = 0;
    
    cell.each(function(i,elem){
       var value = i;
        
        // get needed info from left-hand side cells
        if(i%3 === 0 | i===0 ){
            var id = constant++;
            var location_name = $('h4',elem).text();
            var meeting_name = $(elem).children().eq(2).text().trim().toString();
            var meeting_address = $(elem).contents().filter(function() {
                    return this.type === 'text';
                }).text().trim();
            meeting_address = meeting_address.split(",")[0];
            meeting_name = toTitleCase(meeting_name)
            meeting_name= meeting_name.replace("-", "");
            meeting_name = meeting_name.trim();
            dict.push({
                    id: id,
    				meeting_name: meeting_name,
    				location_name: location_name,
    				meeting_address: meeting_address
    			});
        } 
        
        // get needed info from middle cells
        var middle_cells = [1];
        var middle_start = 1;
        for (i=0;i<50;i++){
            middle_start = middle_start+3;
            middle_cells.push(middle_start);
        }
        var test = middle_cells.includes(value);
        
       if (test === true){
            var content = $(elem).contents().map(function() {
                if (this.type === 'text' | this.nodeType == 1)
                    return $(this).text().trim()
            }).get();
           var details = Array.from(content);
           
            // search for what you need in the array, find the index of it, 
            // and add to find the position of information to return
            
            var monday_index = details.indexOf('Mondays From');
            var monday_start;
            var monday_end;
            if(monday_index!= -1) {
                monday_start = details[monday_index+1];
                monday_end = details[monday_index+3];
            } else {
                monday_start = "";
                monday_end= "";
            }
            
            var tuesday_index = details.indexOf('Tuesdays From');
            var tuesday_start;
            var tuesday_end;
            if(tuesday_index!= -1) {
                tuesday_start = details[tuesday_index+1];
                tuesday_end = details[tuesday_index+3];
            } else {
                tuesday_start = "";
                tuesday_end= "";
            }
            
            var wednesday_index = details.indexOf('Wednesdays From');
            var wednesday_start;
            var wednesday_end;
            if(wednesday_index!= -1) {
                wednesday_start = details[wednesday_index+1];
                wednesday_end = details[wednesday_index+3];
            } else {
                wednesday_start = "";
                wednesday_end= "";
            }
            
            var thursday_index = details.indexOf('Thursdays From');
            var thursday_start;
            var thursday_end;
            if(thursday_index!= -1) {
                thursday_start = details[thursday_index+1];
                thursday_end = details[thursday_index+3];
            } else {
                thursday_start = "";
                thursday_end= "";
            }
            
            var friday_index = details.indexOf('Fridays From');
            var friday_start;
            var friday_end;
            if(friday_index!= -1) {
                friday_start = details[friday_index+1];
                friday_end = details[friday_index+3];
            } else {
                friday_start = "";
                friday_end= "";
            }
            
            var saturday_index = details.indexOf('Saturdays From');
            var saturday_start;
            var saturday_end;
            if(saturday_index!= -1) {
                saturday_start = details[saturday_index+1];
                saturday_end = details[saturday_index+3];
            } else {
                saturday_start = "";
                saturday_end= "";
            }
            
            var sunday_index = details.indexOf('Sundays From');
            var sunday_start;
            var sunday_end;
            if(sunday_index!= -1) {
                sunday_start = details[sunday_index+1];
                sunday_end = details[sunday_index+3];
            } else {
                sunday_start = "";
                sunday_end= "";
            }
            
            dict.push({
                id: id,
                meeting_times:{
                    Monday: {
                        start: monday_start,
                        end: monday_end
                    },
                    Tuesday: {
                        start: tuesday_start,
                        end: tuesday_end
                    },
                    Wednesday: {
                        start: wednesday_start,
                        end: wednesday_end
                    },
                    Thursday: {
                        start: thursday_start,
                        end: thursday_end
                    },
                    Friday: {
                        start: friday_start,
                        end: friday_end
                    },
                    Saturday: {
                        start: saturday_start,
                        end: saturday_end
                    },
                    Sunday: {
                        start: sunday_start,
                        end: sunday_end
                    }
                }
            })
        }
    })
    // console.log(dict);
    dict = JSON.stringify(dict);
    
    fs.writeFile(save_path, dict, 'utf8')
    
}

