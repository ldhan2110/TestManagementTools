
import React, {useEffect,useState} from 'react';
import ReactExport from 'react-data-export';
import { IconButton, Tooltip} from '@material-ui/core';
import {borders, TEST_CASE_COLUMNS} from './DefineTemplate';
import {  Download } from "react-feather";
import { red } from '@material-ui/core/colors';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

var multiDataSet = 
    [{
        columns: TEST_CASE_COLUMNS,
        data: [
         
        ],
    }];


function convertTCtoDS (item) {
    var DSitem = [];
    DSitem.push( {value: item.testcasename ? item.testcasename : item.name, style: {font: {sz: "11"}, border: borders}});
    DSitem.push( {value: item.description, style: {font: {sz: "11"}, border: borders}});
    DSitem.push( {value: item.priority, style: {font: {sz: "11"}, border: borders}});
    DSitem.push( {value: item.precondition, style: {font: {sz: "11"}, border: borders}})
    DSitem.push( {value: item.postcondition, style: {font: {sz: "11"}, border: borders}})

    var steps = "";
    var type = "";
    var expectResult = "";
    if (item.listStep.length !== 0) {
    item.listStep.map((step,index)=>{
        if (index < item.listStep.length-1){
            steps = steps + (index+1) + '. ' + step.stepDefine + "\r\n";
            type = type + (index+1) + '. ' + step.type + "\r\n";
            expectResult = expectResult + (index+1) + '. ' + step.expectResult + "\r\n";
        } else {
            steps = steps + (index+1) + '. ' + step.stepDefine;
            type = type + (index+1) + '. ' + step.type;
            expectResult = expectResult + (index+1) + '. ' + step.expectResult;
        }
    })
    DSitem.push( {value: steps, style: {font: {sz: "11"}, border: borders, alignment: {wrapText: true}}});
    DSitem.push( {value: expectResult, style: {font: {sz: "11"}, border: borders,alignment: {wrapText: true}}});
    DSitem.push( {value: type, style: {font: {sz: "11"}, border: borders,alignment: {wrapText: true}}});
    } else {
        DSitem.push( {value: steps, style: {font: {sz: "11"}, border: borders, alignment: {wrapText: true}}});
        DSitem.push( {value: expectResult, style: {font: {sz: "11"}, border: borders, alignment: {wrapText: true}}});
        DSitem.push( {value: type, style: {font: {sz: "11"}, border: borders, alignment: {wrapText: true}}});
    }
    return DSitem;
}

const ExportExcel = (props) => {

    const {dataSet, type} = props;

    const [dataset,setDataset] = useState(multiDataSet);

    useEffect(()=>{
        if (dataSet !== null && type === 'TC'){
            var dataD = convertTCtoDS(dataSet);
            multiDataSet[0].data = [dataD];
            setDataset(multiDataSet);
        }

        if (dataSet !== null && type === 'TS'){
            multiDataSet[0].data = [];
            dataSet.forEach((item, index) => {if(item.type !== 'TS')
                multiDataSet[0].data.push(convertTCtoDS(item));
            })
            setDataset(multiDataSet);
          
        }
    },[dataSet, type])

    
    return (
            <div>
            { dataset[0].data !== [] && 
                <ExcelFile element={<Tooltip title="Export test case(s)" style={{color: red[500]}}><IconButton><Download/></IconButton></Tooltip>}>
                    <ExcelSheet dataSet={dataset} name="Test Case"/>
                </ExcelFile>
            }
            </div>
        );
    
}

export default ExportExcel;