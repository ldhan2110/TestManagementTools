import XLSX from 'xlsx';
import {TEST_CASE_ADDR} from './SheetAddrs';


function readHeader (worksheet) {
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

    TEST_CASE_ADDR.map((item,index) => {
      var desired_cell = worksheet[item.addr];
      result[item.name] = (desired_cell ? desired_cell.v : undefined);
    })
    
    return result;
}

export default function handleFile(e, setMethod) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    var result = {};
    reader.onload = function(e) {
      var idx = 0;
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});

      workbook.SheetNames.forEach(function(sheetName) {
        var worksheet = workbook.Sheets[sheetName];
        if (idx === 0) {
          result= readHeader(worksheet);
        } else {
          var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          XL_row_object.map((item,index)=>{
            result.listStep.push({id: item['Step'], stepDefine: item['Definition'], expectResult: item['Expected Result'], type: item['Type']})
          })
        }
        idx++;
      })
      /* DO SOMETHING WITH workbook HERE */
     setMethod(result);
    };
    reader.readAsArrayBuffer(f);
}