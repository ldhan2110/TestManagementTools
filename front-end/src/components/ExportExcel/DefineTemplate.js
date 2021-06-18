const borders = {
  top: { style: "thin" },
  bottom: { style: "thin" },
  left: { style: "thin" },
  right: { style: "thin" }
}

const center_alignment = {
  vertical: 'center',
  horizontal: 'center',
  wrapText: true
}

const TEST_CASE_COLUMNS = [
  {title: "Test Case Name", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 122}},//pixels width 
  {title: "Description", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 190}},//pixels width 
  {title: "Priority", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 68}},//char width 
  {title: "Pre-condition", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 140}},
  {title: "Post-condition", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 140}},//pixels width 
  {title: "Steps", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 190}},//pixels width 
  {title: "Expected Result", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 190}},//char width 
  {title: "Type", style: {fill: {patternType: "solid", fgColor: {rgb: "77cee2"}}, font: {sz: "12", bold: true}, alignment: center_alignment, border: borders}, width: {wpx: 100}},
];

export {borders, TEST_CASE_COLUMNS};