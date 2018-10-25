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
        
    cell.each(function(i,elem){
        if(i%3 === 0 | i ===0 ){
            var myKey = $(elem).children().eq(2).text().trim().toString();
            var myContent = $(elem).contents().filter(function() {
                    return this.type === 'text';
                }).text().trim();
            myContent = myContent.split(",")[0];
            myKey = toTitleCase(myKey)
            myKey= myKey.replace("-", "");
            myKey = myKey.trim();
            dict.push({
    				meeting_name: myKey,
    				meeting_address: myContent
    			});
        }
    })
    
    // console.log(dict);
    dict = JSON.stringify(dict);
    
    fs.writeFile(save_path, dict, 'utf8')
    
}

