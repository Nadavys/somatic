import config from '../config'
import csv from 'csvtojson'
const {dataUrl} = config

console.log("data source", dataUrl)

//note, wrong way to cache in js, just for dev
var cache = null;

var fetchCsv = async function() {
  return await fetch(dataUrl).then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
          return decoder.decode(result.value)
      });
  });
}

const decode =  async function(txt){
    return new Promise(resolve =>
        csv()
        .fromString(txt)
        .then((jsonObj)=>{
            // console.log("jsonObj**",jsonObj);
             resolve(jsonObj);
        }))
    }

export default async function(input){
    if(cache === null){
        const txt = await fetchCsv();
        cache =  await decode(txt)
    }

    const inputNames = Object.keys(input);
    const results = []
    
    cache.forEach(item => {
        let isValid = true;
        inputNames.forEach(inputName => {
           if(item[inputName].indexOf(input[inputName]) === -1) isValid = false; 
        })
        if(isValid) results.push(item)
    })

    return results;
    

}