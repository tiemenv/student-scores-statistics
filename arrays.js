/*
INSTRUCTIONS:
- See the solution screenshot with the final result.
- USE the helper functions and variables.
- USE the const scores variable provided below.
- When the functions at the bottom are implemented correctly,
the results are rendered in the scores.html.

HINT AND RULES:
- Don't touch the "don't touch" code :)
- Make sure to read the detailed instructions in the slides.
-----------------------------------------------
------------ Touch and DIE --------------------
-----------------------------------------------
*/
// !! USE these consts !!
const students = ['MATTHIAS', 'BART', 'THOMAS', 'ALIES', 'LUC',
	'TOM', 'KOEN', 'ANN',];
const subjects = ['MATH', 'DUTCH', 'MUSIC', 'PROGRAMMING',];
const maximumScore = 20;
const numOfStudents = students.length;
const numOfSubjects = subjects.length;
const scores = generateIntegerMatrix(numOfStudents, numOfSubjects, maximumScore);

// The functions you will implement are called here.
document.getElementById('points').appendChild(generateHTMLTable(getPoints()));
document.getElementById('subjectStatistics').appendChild(generateHTMLTable(getSubjectStatistics()));
document.getElementById('studentStatistics').appendChild(generateHTMLTable(getStudentStatistics()));
/*-----------------------------------------------------------------------------
--------------------- Implement functions below -------------------------------
-------------------------------------------------------------------------------
*/
// This is the first table in the solution screenshot
function getPoints() {
	// This functions return the scores matrix, expanded with row and column titles.
	// The results are directly passed to the generateHTMLTable function.
	console.log("Scores: ", scores);
	return expandMatrixWithTitles(scores, students, subjects);
}

// This is the second table in the solution screenshot
function getStudentStatistics() {
	// The results are directly passed to the generateHTMLTable function.
	console.log("scores for getStudentStatistics: ", scores);
	let resultMatrix = [];
	let classAverage = 0;
	let classAverageSum = 0;
	let classAverageNumberOfScores = scores.length;
	//iterates over each ROW
	for (let i = 0; i<scores.length; i++){
		let matrixRow = [];
		let average = 0;
		let sum = 0;
		let numberOfScores = scores[i].length;
		//iterates over each COLUMN
		for (let j = 0; j<scores[i].length; j++){
			sum += parseInt(scores[i][j]);
		}
		average = Math.floor(sum/numberOfScores);
		classAverageSum += average;
		matrixRow.push(average);
		resultMatrix.push(matrixRow);
	}
	classAverage = Math.floor(classAverageSum/classAverageNumberOfScores);
	console.log("class average: ", classAverage);
	for (let i = 0; i<resultMatrix.length; i++){
		if(resultMatrix[i][0] > classAverage){
			resultMatrix[i].push("A");
		} else if (resultMatrix[i][0] == classAverage){
			resultMatrix[i].push("=");
		} else if (resultMatrix[i][0] < classAverage){
			resultMatrix[i].push("B");
		}
	}
	return expandMatrixWithTitles(resultMatrix, students, ["Average", "Above, equal or below class average (= " + classAverage + ")"]);
}

// This is the third table in the solution screenshot
function getSubjectStatistics() {
	// The results are directly passed to the generateHTMLTable function.
	console.log("scores for getSubjectStatistics: ", scores);
	let resultMatrix = [];
	//iterates over each COLUMN
	for(let i = 0;i<scores[0].length; i++){
		let matrixRow = []
		let highestScore = 0;
		let average = 0;
		let averageSum = 0;
		let averageCount = scores.length;
		//iterates over each ROW
		for(let j = 0;j<scores.length; j++){
			if(scores[j][i] > highestScore){
				highestScore = scores[j][i];
			}
			averageSum += scores[j][i];
		}
		average = Math.floor(averageSum/averageCount);
		matrixRow.push(highestScore);
		matrixRow.push(average)
		resultMatrix.push(matrixRow);
	}
	console.log("getSubjectStatistics's result: ", resultMatrix);
	// return resultMatrix;
	return expandMatrixWithTitles(resultMatrix, subjects, ["Highest score", "Average"]);
	

}

function generateIntegerMatrix(numberOfRows, numbersOfCols, maxCellValue) {
	// Return a 2D matrix with random generated scores.
	// This functions is already assigned to the scores variable, see line 23;
	let matrix = [];
	for (let i = 0; i < numberOfRows; i++) {
		let matrixRow = [];
		for (let j = 0; j < numbersOfCols; j++) {
			matrixRow.push(generateNonZeroNaturalNumber(maxCellValue));
		}
		matrix.push(matrixRow);
	}
	console.log("matrix after generateIntegerMatrix: ", matrix);
	return matrix;
}

function generateHTMLTable(matrix) {
	// Return a HTML table, use the DOM API.
	console.log("matrix in generateHTMLTable: ", matrix);
	const table = document.createElement('table');
	const tableBody = document.createElement('tbody')
	const tableHead = document.createElement('thead');

	for (let i = 0; i < matrix.length; i++) {
		let tr = document.createElement('tr');
		for (let j = 0; j < matrix[i].length; j++) {
			let td;
			if (i === 0 || j === 0) {
				td = document.createElement('th');
			} else {
				td = document.createElement('td');
			}
			let tdText = document.createTextNode(matrix[i][j] == null ? "" : matrix[i][j]);
			td.appendChild(tdText);
			tr.appendChild(td);
		}
		tableBody.appendChild(tr);
	}


	table.appendChild(tableHead);
	table.appendChild(tableBody);
	return table;
}
/*
---------------------------------------------------------
------------ Helper functions and variables -------------
---------------------------------------------------------
*/
function generateNonZeroNaturalNumber(inclusiveLimit) {
	return Math.floor(Math.random() * (inclusiveLimit + 1));
}

function createRow(type, dataRow) {
	const row = document.createElement(type);

	for (let j = 0; j < dataRow.length; j++) {
		const dataCell = type === 'tr'
			? createDataCell('td', dataRow[j])
			: createDataCell('th', dataRow[j]);
		row.appendChild(dataCell);
	}
	return row;
}

function createDataCell(type, data) {
	const value = data == null || data == undefined ? '' : data;
	const td = document.createElement(type);

	td.appendChild(document.createTextNode(value));
	return td;
}

// Make sure the number of titles equals the number of rows and columns respectively
function expandMatrixWithTitles(matrix, rowTitles, columnTitles) {
	const expandedTable = [];

	for (let i = 0; i < rowTitles.length; i++) {
		expandedTable.push([rowTitles[i], ...matrix[i]]);
	}
	return [[null, ...columnTitles], ...expandedTable]; // add table header
}
