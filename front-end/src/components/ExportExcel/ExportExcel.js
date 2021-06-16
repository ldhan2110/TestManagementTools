
import React, {Component} from 'react';
import ReactExport from 'react-data-export';
import { IconButton} from '@material-ui/core';
import {borders, TEST_CASE_COLUMNS} from './DefineTemplate';
import {  Download } from "react-feather";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const multiDataSet = [
    {
        columns: TEST_CASE_COLUMNS,
        data: [
            [
                {value: "H1", style: {font: {sz: "24", bold: true}, border: borders}},
                {value: "Bold", style: {font: {bold: true}}},
                {value: "Red", style: {fill: {patternType: "solid", fgColor: {rgb: "FFFF0000"}}}},
                {value: "H1", style: {font: {sz: "24", bold: true}, border: borders}},
                {value: "H1", style: {font: {sz: "24", bold: true}, border: borders}},
                {value: "H1", style: {font: {sz: "24", bold: true}, border: borders}},
                {value: "H1", style: {font: {sz: "24", bold: true}, border: borders}},
                {value: "H1", style: {font: {sz: "24", bold: true}, border: borders}},
            ],
           
        ]
    }
];

function convertTCtoDS (item) {

}

const ExportExcel = (props) => {

    const {dataSet, type} = props;

   
    return (
            <div>
                <ExcelFile element={<IconButton size="small"><Download/></IconButton>}>
                    <ExcelSheet dataSet={multiDataSet} name="Test Case"/>
                </ExcelFile>
            </div>
        );
    
}

export default ExportExcel;