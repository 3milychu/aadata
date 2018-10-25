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
    var constant_2 = 0;
    
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
    				meeting_address: meeting_address,
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
           var id = constant_2++;
            var content = $(elem).contents().map(function() {
                if (this.type === 'text' | this.nodeType == 1)
                    return $(this).text().trim()
            }).get();
           var details = Array.from(content);
           
            // search for what you need in the array, find the index of it, 
            // and add to find the position of information to return
            
            var monday_index = details.indexOf('Mondays From');
            var monday_start = "";
            var monday_end = "";
            var monday_topic = "";
            var monday_interests = "";
            if(monday_index!= -1) {
                monday_start = details[monday_index+1];
                monday_end = details[monday_index+3];
                if(details[monday_index+5].match(/Type|Special/gi)){
                    if(details[monday_index+5].match(/Type/gi)){
                        monday_topic=details[monday_index+6];
                    } else {
                        monday_interests=details[monday_index+6];
                    }
                }
                if(details[monday_index+8].match(/Special/gi)){
                    monday_interests=details[monday_index+9];
                }
            };
            
            var tuesday_index = details.indexOf('Tuesdays From');
            var tuesday_start = "";
            var tuesday_end = "";
            var tuesday_topic = "";
            var tuesday_interests = "";
            if(tuesday_index!= -1) {
                tuesday_start = details[tuesday_index+1];
                tuesday_end = details[tuesday_index+3];
                if(details[tuesday_index+5].match(/Type|Special/gi)){
                    if(details[tuesday_index+5].match(/Type/gi)){
                        tuesday_topic=details[tuesday_index+6];
                    } else {
                        tuesday_interests=details[tuesday_index+6];
                    }
                }
                if(details[tuesday_index+8].match(/Special/gi)){
                    tuesday_interests=details[tuesday_index+9];
                }
            };
            
            var wednesday_index = details.indexOf('Wednesdays From');
            var wednesday_start = "";
            var wednesday_end = "";
            var wednesday_topic = "";
            var wednesday_interests = "";
            if(wednesday_index!= -1) {
                wednesday_start = details[wednesday_index+1];
                wednesday_end = details[wednesday_index+3];
                if(details[wednesday_index+5].match(/Type|Special/gi)){
                    if(details[wednesday_index+5].match(/Type/gi)){
                        wednesday_topic=details[wednesday_index+6];
                    } else {
                        wednesday_interests=details[wednesday_index+6];
                    }
                }
                if(details[wednesday_index+8].match(/Special/gi)){
                    wednesday_interests=details[wednesday_index+9];
                }
            };
            
            var thursday_index = details.indexOf('Thursdays From');
            var thursday_start = "";
            var thursday_end = "";
            var thursday_topic = "";
            var thursday_interests = "";
            if(thursday_index!= -1) {
                thursday_start = details[thursday_index+1];
                thursday_end = details[thursday_index+3];
                if(details[thursday_index+5].match(/Type|Special/gi)){
                    if(details[thursday_index+5].match(/Type/gi)){
                        thursday_topic=details[thursday_index+6];
                    } else {
                        thursday_interests=details[thursday_index+6];
                    }
                }
                if(details[thursday_index+8].match(/Special/gi)){
                    thursday_interests=details[thursday_index+9];
                }
            };
            
            var friday_index = details.indexOf('Fridays From');
            var friday_start = "";
            var friday_end = "";
            var friday_topic = "";
            var friday_interests = "";
            if(friday_index!= -1) {
                friday_start = details[friday_index+1];
                friday_end = details[friday_index+3];
                if(details[friday_index+5].match(/Type|Special/gi)){
                    if(details[friday_index+5].match(/Type/gi)){
                        friday_topic=details[friday_index+6];
                    } else {
                        friday_interests=details[friday_index+6];
                    }
                }
                if(details[friday_index+8].match(/Special/gi)){
                    friday_interests=details[friday_index+9];
                }
            };
            
            var saturday_index = details.indexOf('Saturdays From');
            var saturday_start = "";
            var saturday_end = "";
            var saturday_topic = "";
            var saturday_interests = "";
            if(saturday_index!= -1) {
                saturday_start = details[saturday_index+1];
                saturday_end = details[saturday_index+3];
                if(details[saturday_index+5].match(/Type|Special/gi)){
                    if(details[saturday_index+5].match(/Type/gi)){
                        saturday_topic=details[saturday_index+6];
                    } else {
                        saturday_interests=details[saturday_index+6];
                    }
                }
                if(details[saturday_index+8].match(/Special/gi)){
                    saturday_interests=details[saturday_index+9];
                }
            };
            
            var sunday_index = details.indexOf('Saturdays From');
            var sunday_start = "";
            var sunday_end = "";
            var sunday_topic = "";
            var sunday_interests = "";
            if(sunday_index!= -1) {
                sunday_start = details[sunday_index+1];
                sunday_end = details[sunday_index+3];
                if(details[sunday_index+5].match(/Type|Special/gi)){
                    if(details[sunday_index+5].match(/Type/gi)){
                        sunday_topic=details[sunday_index+6];
                    } else {
                        sunday_interests=details[sunday_index+6];
                    }
                }
                if(details[sunday_index+8].match(/Special/gi)){
                    sunday_interests=details[sunday_index+9];
                }
            };
            
            dict[id].meeting_times = {
                    Monday: {
                        start: monday_start,
                        end: monday_end,
                        details: {
                            topic: monday_topic,
                            interest: monday_interests 
                        }
                    },
                    Tuesday: {
                        start: tuesday_start,
                        end: tuesday_end,
                        details: {
                            topic: tuesday_topic,
                            interest: tuesday_interests 
                        }
                    },
                    Wednesday: {
                        start: wednesday_start,
                        end: wednesday_end,
                        details: {
                            topic: wednesday_topic,
                            interest: wednesday_interests 
                        }
                    },
                    Thursday: {
                        start: thursday_start,
                        end: thursday_end,
                        details: {
                            topic: thursday_topic,
                            interest: thursday_interests 
                        }
                    },
                    Friday: {
                        start: friday_start,
                        end: friday_end,
                        details: {
                            topic: friday_topic,
                            interest: friday_interests 
                        }
                    },
                    Saturday: {
                        start: saturday_start,
                        end: saturday_end,
                        details: {
                            topic: saturday_topic,
                            interest: saturday_interests 
                        }
                    },
                    Sunday: {
                        start: sunday_start,
                        end: sunday_end,
                        details: {
                            topic: sunday_topic,
                            interest: sunday_interests 
                        }
                    }
                }
        }
    })
    
    dict = JSON.stringify(dict);
    fs.writeFile(save_path, dict, 'utf8')
    
}