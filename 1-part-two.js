/*

Made by @jazzjacob

Advent of code - day 1
https://adventofcode.com/2023/day/1

*/

const CONSTS = {
	CALIBRATION_DOCUMENT_NAME: '1.txt',
	DIGITS_SPELLED_OUT: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
}

function runProgram() {
	console.log("Program is running!");
	
	readDataFile().then(data => {
		// Convert the data string into "Calibration Values" according to the rules in the specification
		const calibrationValues = getCalibrationValues(data.toString())
		console.log(calibrationValues)
		
		const sumOfCalibrationValues = sumOfNumbersInArray(calibrationValues);
		console.log("Total sum: " + sumOfCalibrationValues.toString())
	})
}

function readDataFile() {
	// Requiring fs module in which readFile function is defined.
	const fs = require('fs')
	const util = require('util');
	
	// Convert fs.readFile into Promise version of same    
	const readFile = util.promisify(fs.readFile);
	
	return readFile(CONSTS.CALIBRATION_DOCUMENT_NAME);
}

function sumOfNumbersInArray(numbersArray) {
	let sum = 0;
	numbersArray.forEach(number => {
		sum += number;
	});
	return sum;
}

function concatFirstAndLastDigitInArray(digitArray) {
	const firstAndLastDigitAsString = `${digitArray[0]}${digitArray[digitArray.length - 1]}`
	return parseInt(firstAndLastDigitAsString);
}

function getCalibrationValues(string) {
	let accumulativeString = "";
	let fullLine = "";
	let numbersFromLine = [];
	const totalArray = [];
	
	for (let i = 0; i < string.length ;i++) {
		const character = string[i];
		if (character == '\n') {
			totalArray.push(concatFirstAndLastDigitInArray(numbersFromLine));
			numbersFromLine = [];
			continue;
		}
	
		if (characterIsADigit(character)) {
			numbersFromLine.push(parseInt(character))
			continue;
		}
		let partMatch = false;
		let fullMatch = false;
		let index = 0;
		let accumulativeString = "";
		
		do {
			accumulativeString += string[i + index];
			const matchResults = checkIfMatchInArrayOfStrings(CONSTS.DIGITS_SPELLED_OUT, accumulativeString);
			partMatch = matchResults.partMatch;
			fullMatch = matchResults.fullMatch;
			index++;
			if (fullMatch) {
				const digit = translateToDigit(accumulativeString);
				numbersFromLine.push(digit)
			}
		} while (partMatch && !fullMatch && i < string.length - 1);
	}
	totalArray.push(concatFirstAndLastDigitInArray(numbersFromLine));

	return totalArray;
}

function translateToDigit(string) {
	switch (string) {
		case 'one': return 1; break;
		case 'two': return 2; break;
		case 'three': return 3; break;
		case 'four': return 4; break;
		case 'five': return 5; break;
		case 'six': return 6; break;
		case 'seven': return 7; break;
		case 'eight': return 8; break;
		case 'nine': return 9; break;
		default:
			return -1;
	}
}

function checkIfMatchInArrayOfStrings(arrayOfStrings, stringToMatch) {
	for (let i = 0 ; i < arrayOfStrings.length ; i++) {
		if (arrayOfStrings[i] == stringToMatch) {
			return {partMatch: true, fullMatch: true};
		} 
		if (arrayOfStrings[i].startsWith(stringToMatch)) {
			return {partMatch: true, fullMatch: false}
		}
	}
	return {partMatch: false, fullMatch: false}
}

function characterIsADigit(character) {
	return /[0-9]/.test(character);
}

runProgram();