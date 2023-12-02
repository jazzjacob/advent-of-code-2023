/*

Made by @jazzjacob

Advent of code - day 1
https://adventofcode.com/2023/day/1

*/

const CONSTS = {
	CALIBRATION_DOCUMENT_NAME: '1.txt' 
}

function runProgram() {
	console.log("Program is running!");
	
	readDataFile().then(data => {
		// Convert each line of the original string into items in an array of strings
		const eachLineOfText = getArrayOfStringsFromEachLine(data.toString())
		
		// Convert the array into "Calibration Values" according to the rules in the specification
		const calibrationValues = getCalibrationValues(eachLineOfText);
		const sum = sumOfNumbersInArray(calibrationValues);
		console.log("Total sum: " + sum.toString())
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

function getCalibrationValues(arrayOfStrings) {
	const arrayOfCalibrationValues = [];
	arrayOfStrings.forEach(string => {
		const digitsInString = getDigitsInString(string);
		const firstAndLastNumberAsString = `${digitsInString[0]}${digitsInString[digitsInString.length - 1]}`
		arrayOfCalibrationValues.push(parseInt(firstAndLastNumberAsString));
	});
	return arrayOfCalibrationValues;
}

function getDigitsInString(string) {
	const digits = [];
	for (character of string) {
		if (characterIsADigit(character)) {
			digits.push(parseInt(character));
		}
	}
	return digits;
}

function getArrayOfStringsFromEachLine(string) {
	let currentLine = "";
	const array = [];
	for (character of string) {
		if (character == '\n') {
			array.push(currentLine);
			currentLine = "";
		} else {
			currentLine += character;
		}
	}
	array.push(currentLine)
	return array;
}

function characterIsADigit(character) {
	return /[0-9]/.test(character);
}

runProgram();