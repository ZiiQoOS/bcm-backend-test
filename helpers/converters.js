const converter = {
    csvToJSON(csv) {
        let lines = csv.split("\n");
        let result = [];
        let headers = lines[0].split(",");
        for (let i = 1; i < lines.length - 1; i++) { // we need to exclude the last line because the endpoint sends back an empty line at the end
            let obj = {};
            let currentLine = lines[i].split(",");
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
        return JSON.parse(JSON.stringify(result));
    }
};
module.exports = converter;