'use strict';
const excelToJson = require('convert-excel-to-json');

// let MongoClient = require('mongodb').MongoClient;
// let url = "mongodb://localhost:27017/";

// -> Read Excel File to Json Data

const excelData = excelToJson({
    sourceFile: 'customers.xlsx',
    sheets:[{
		// Excel Sheet Name
        name: 'Customers',
		
		// Header Row -> be skipped and will not be present at our result object.
		header:{
            rows: 1
        },
		
		// Mapping columns to keys
        columnToKey: {
        	A: '_id',
    		B: 'name',
			C: 'address',
			D: 'age'
        }
    }]
});

// -> Log Excel Data to Console
console.log(excelData);

/**
{ 
   Customers:
	[ 
		 { _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
		 { _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
		 { _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
		 { _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
		 { _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
	] 
}
*/

// -> Insert Json-Object to MongoDB
// MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
    
//     var dbo = db.db("gkzdb");
    
//     dbo.collection("customers").insertMany(excelData.Customers, (err, res) => {
//       if (err) throw err;
      
//       console.log("Number of documents inserted: " + res.insertedCount);
//       /**
//           Number of documents inserted: 5
//       */
//       db.close();
//     });
//   });