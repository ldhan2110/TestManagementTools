import XLSX from 'xlsx';
import {TEST_CASE_ADDR} from './SheetAddrs';


function parseSteps (steps, expectResults, types) {
  var result = [];

  if (steps && expectResults && types) {
    //Parse both steps and expectResult
    var listSteps = steps.split("\r\n");
    var listExpectResult = expectResults.split("\r\n");
   

    //Add to TC Item
    listSteps.map((item) => {
        var temp = item.split('. ');
        result.push({id: temp[0], stepDefine: temp[1], expectResult: '', type: types});
    });

    //Update expect result for each step TC Item
    if (listExpectResult.length === 1)
      result[result.length - 1].expectResult = listExpectResult[0];
    else
    listExpectResult.map((item) => {
      var temp = item.split('. ');
      var idx = result.findIndex(x => x.id === temp[0]);
      if (idx  !== -1){
        result[idx].expectResult = temp[1];
      }
    }); 

    
  }
  return result;
}


function convertToTCItem (item) {
    var result = {
        testcaseName: '',
        description: '',
        testsuite: "",
        priority: '',
        type: '',
        precondition: '',
        postcondition: '',
        listStep:[]
    }

    //Parse TC Info
    TEST_CASE_ADDR.map((fields,index) => {
      if (fields.name !== 'Steps' && fields.name !== 'Expected Result') {
        var desired_cell = item[fields.name];
        result[fields.convertedField] = (desired_cell ? desired_cell : undefined);
      }
    })

    //Parse TC Steps
    result.listStep = parseSteps(item['Steps'], item['Expected Result'], result['type']);
    return result;
}

export default function handleFile(e, setMethod) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    var result = [];
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});

      workbook.SheetNames.forEach(function(sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        XL_row_object.map((item,index)=>{
          result.push(convertToTCItem(item));
 
        })

      })
      /* DO SOMETHING WITH workbook HERE */
      setMethod(result.filter(item => item.testcaseName !== undefined));
    };
    reader.readAsArrayBuffer(f);
}