"use strict";

// const { withOptions } = require("tailwindcss/plugin");

const playerDisplay = document.querySelector(".playerDisplay");
const gameBoard = document.querySelector(".gameBoard");
const infoDisplay = document.querySelector(".infoDisplay");
const width = 8;
let playerGo = "black";

const rook =
	'<div class="piece" id="rook"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div> ';
const knight =
	'<div class="piece" id="knight"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5V238.9c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400H384l28.9-159c2.1-11.3 3.1-22.8 3.1-34.3V192C416 86 330 0 224 0H83.8C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432H64L22.6 473.4z"/></svg></div> ';
const bishop =
	'<div class="piece" id="bishop"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7V400H256V372.7c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32H128zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512H297.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432H48z"/></svg></div> ';
const queen =
	'<div class="piece" id="queen"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400H384 343.6 168.4 128 112.3L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224l0 0 0 0h0zM112 432H400l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H86.6C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z"/></svg></div>';
const king =
	'<div class="piece" id="king"> <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c17.7 0 32 14.3 32 32V48h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H256v48H408c22.1 0 40 17.9 40 40c0 5.3-1 10.5-3.1 15.4L368 400H80L3.1 215.4C1 210.5 0 205.3 0 200c0-22.1 17.9-40 40-40H192V112H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V32c0-17.7 14.3-32 32-32zM38.6 473.4L80 432H368l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H54.6C42.1 512 32 501.9 32 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div> ';
const pawn =
	'<div class="piece" id="pawn"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M105.1 224H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h16v5.49c0 44-4.14 86.6-24 122.51h176c-19.89-35.91-24-78.51-24-122.51V288h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-25.1c29.39-18.38 49.1-50.78 49.1-88a104 104 0 0 0-208 0c0 37.22 19.71 69.62 49.1 88zM304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/></svg>';

const startPieces = [
	rook,
	knight,
	bishop,
	queen,
	king,
	bishop,
	knight,
	rook,
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	pawn,
	rook,
	knight,
	bishop,
	queen,
	king,
	bishop,
	knight,
	rook,
];
// createBoard function injected into gameBoard section
function createBoard() {
	startPieces.forEach((startPiece, i) => {
		const square = document.createElement("section");
		square.classList.add("square");
		square.innerHTML = startPiece;
		square.firstChild?.setAttribute("draggable", true);
		square.setAttribute("square-id", i);
		const row = Math.floor((63 - i) / 8) + 1;
		if (row % 2 === 0) {
			square.classList.add(i % 2 === 0 ? "beige" : "brown");
		} else {
			square.classList.add(i % 2 === 0 ? "brown" : "beige");
		}
		if (i <= 15) {
			square.classList.add("black");
		}
		if (i >= 48) {
			square.firstChild.classList.add("white");
		}
		gameBoard.append(square);
	});

	// loop through startPieces and create div for each square
	// add a class to it
	// style gameBoard
	// style square
	// alternate square colors
	// append gameBoard with square
	// set square attribute to i
	// add pieces innerhtml
}

createBoard();

// grab every square
// add event listeners to them
const allSquares = document.querySelectorAll(".square");
allSquares.forEach((square) => {
	square.addEventListener("dragstart", dragStart);
	square.addEventListener("dragover", dragOver);
	square.addEventListener("drop", dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
	startPositionId = e.target.parentNode.getAttribute("square-id");
	draggedElement = e.target;
}

function dragOver(e) {
	e.preventDefault();
}

function dragDrop(e) {
	e.stopPropagation();
	const correctGo = draggedElement.firstChild.classList.contains(playerGo);
	const taken = e.target.classList.contains("piece");
	console.log("taken", taken);
	const opponentGo = playerGo === "white" ? "black" : "white";
	const valid = checkIfValid(e.target);
	const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);
	if (correctGo) {
		if (takenByOpponent && valid) {
			e.target.parentNode.append(draggedElement);
			e.target.remove();
			checkForWin()
			changePlayer();
			return;
		}
		if (taken && !takenByOpponent) {
			return;
		}
		if (valid) {
			e.target.append(draggedElement);
			checkForWin()
			changePlayer();
			return;
		}
	}
}
function checkIfValid(target) {
	const targetId =
		~~target.getAttribute("square-id") ||
		~~target.parentNode.getAttribute("square-id");
	const startId = ~~startPositionId;
	const piece = draggedElement.id;
	console.log("targetId", targetId);
	console.log("startId", startId);
	console.log("piece", piece);
	
function changePlayer() {
	playerDisplay.textContent = "black";
	if (playerGo === "black") {
		reverseIds();
		playerGo = "white";
		playerDisplay.textContent = "white";
	} else {
		revertIds();
		playerGo = "black";
		playerDisplay.textContent = "black";
	}
}

function reverseIds() {
	const allSquares = document.querySelectorAll(".square");
	allSquares.forEach((square, i) =>
		square.setAttribute("square-id", width * width - 1 - i)
	);
}

function revertIds() {
	const allSquares = document.querySelectorAll(".square");
	allSquares.forEach((square, i) => square.setAttribute("square-id", i));
}



	switch (piece) {
		case "pawn":
			const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
			if (
				(starterRow.includes(startId) && startId + width * 2 === targetId) ||
				startId + width === targetId ||
				(startId + width - 1 === targetId &&
					document.querySelector(`[square-id='${startId + width - 1}']`)
						.firstChild) ||
				(startId + width + 1 === targetId &&
					document.querySelector(`[square-id='${startId + width + 1}']`)
						.firstChild)
			) {
				return true;
			}
			break;
		case 'knight':
			if (
				startId + width * 2 + 1 === targetId ||
				startId + width * 2 - 1 === targetId ||
				startId + width - 2 === targetId ||
				startId + width + 2 === targetId ||
				startId - width * 2 + 1 === targetId ||
				startId - width * 2 - 1 === targetId ||
				startId - width - 2 === targetId ||
				startId - width + 2 === targetId
			) {
				return true
			}
			break
		case 'bishop':
			if (
				startId + width + 1 === targetId ||
				startId + width * 2 + 2  === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild ||
				startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild ||
				startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild ||
				startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}]`).firstChild ||
				startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}]`).firstChild ||
				startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}]`).firstChild ||
				// ---
				startId - width - 1 === targetId ||
				startId - width * 2 - 2  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild | -
				startId - width * 3 - 3  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild ||
				startId - width * 4 - 4  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild ||
				startId - width * 5 - 5  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}]`).firstChild ||
				startId - width * 6 - 6  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}]`).firstChild ||
				startId - width * 7 - 7  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}]`).firstChild ||
				// ---
				startId - width - 1 === targetId ||
				startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild | -
				startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild ||
				startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild ||
				startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}]`).firstChild ||
				startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}]`).firstChild ||
				startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}]`).firstChild ||
				//---

				startId + width - 1 === targetId ||
				startId + width * 2 - 2 && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild | -
				startId + width * 3 - 3 && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild ||
				startId + width * 4 - 4 && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild ||
				startId + width * 5 - 5 && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}]`).firstChild ||
				startId + width * 6 - 6 && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}]`).firstChild ||
				startId + width * 7 - 7 && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}]`).firstChild
			) {
				return true
			}
			break;
		case 'rook':
			if (startId + width === targetId ||
				startId + width * 2 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild ||
				startId + width * 3 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild ||
				startId + width * 4 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild ||
				startId + width * 5 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}]`).firstChild ||
				startId + width * 6 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}]`).firstChild ||
				startId + width * 7 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}]`).firstChild ||
				// ---
				startId - width === targetId ||
				startId - width * 2 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild ||
				startId - width * 3 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild ||
				startId - width * 4 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild ||
				startId - width * 5 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}]`).firstChild ||
				startId - width * 6 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}]`).firstChild ||
				startId - width * 7 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}]`).firstChild ||
				// ---
				startId + width === targetId ||
				startId + width * 2  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild ||
				startId + width * 3  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild ||
				startId + width * 4  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild ||
				startId + width * 5  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + 4}]`).firstChild ||
				startId + width * 6  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + 5}]`).firstChild ||
				startId + width * 7  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + 5}]`).firstChild && !document.querySelector(`[square-id="${startId + 6}]`).firstChild ||
				// ---
				startId - width === targetId ||
				startId - width * 2  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild ||
				startId - width * 3  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild ||
				startId - width * 4  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild ||
				startId - width * 5  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - 4}]`).firstChild ||
				startId - width * 6  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - 5}]`).firstChild ||
				startId - width * 7  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - 5}]`).firstChild && !document.querySelector(`[square-id="${startId - 6}]`).firstChild
			) {
				return true
			}
			break;
		case 'queen':
			if (
				// bishop like moves
				startId + width + 1 === targetId ||
				startId + width * 2 + 2  === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild ||
				startId + width * 3 + 3  === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild ||
				startId + width * 4 + 4  === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild ||
				startId + width * 5 + 5  === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}]`).firstChild ||
				startId + width * 6 + 6  === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}]`).firstChild ||
				startId + width * 7 + 7  === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}]`).firstChild ||
				// ---
				startId - width - 1 === targetId ||
				startId - width * 2 - 2  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild | -
				startId - width * 3 - 3  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild ||
				startId - width * 4 - 4  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild ||
				startId - width * 5 - 5  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}]`).firstChild ||
				startId - width * 6 - 6  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}]`).firstChild ||
				startId - width * 7 - 7  === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}]`).firstChild ||
				// ---
				startId - width - 1 === targetId ||
				startId - width * 2 + 2  === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild | -
				startId - width * 3 + 3  === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild ||
				startId - width * 4 + 4  === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild ||
				startId - width * 5 + 5  === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}]`).firstChild ||
				startId - width * 6 + 6  === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}]`).firstChild ||
				startId - width * 7 + 7  === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}]`).firstChild ||
				//---

				startId + width - 1 === targetId ||
				startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild | -
				startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild ||
				startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild ||
				startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}]`).firstChild ||
				startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}]`).firstChild ||
				startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}]`).firstChild ||
				// rook like moves
				startId + width * 2 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild ||
				startId + width * 3 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild ||
				startId + width * 4 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild ||
				startId + width * 5 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}]`).firstChild ||
				startId + width * 6 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}]`).firstChild ||
				startId + width * 7 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}]`).firstChild ||
				// ---
				startId - width === targetId ||
				startId - width * 2  === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild ||
				startId - width * 3  === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild ||
				startId - width * 4  === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild ||
				startId - width * 5  === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}]`).firstChild ||
				startId - width * 6  === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}]`).firstChild ||
				startId - width * 7  === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}]`).firstChild ||
				// ---
				startId + width === targetId ||
				startId + width * 2  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild ||
				startId + width * 3  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild ||
				startId + width * 4  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild ||
				startId + width * 5  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + 4}]`).firstChild ||
				startId + width * 6  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + 5}]`).firstChild ||
				startId + width * 7  === targetId && !document.querySelector(`[square-id='${startId + 1}']`).firstChild && !document.querySelector(`[square-id="${startId + 2}]`).firstChild && !document.querySelector(`[square-id="${startId + 3}]`).firstChild && !document.querySelector(`[square-id="${startId + 4}]`).firstChild && !document.querySelector(`[square-id="${startId + 5}]`).firstChild && !document.querySelector(`[square-id="${startId + 6}]`).firstChild ||
				// ---
				startId - width === targetId ||
				startId - width * 2  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild ||
				startId - width * 3  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild ||
				startId - width * 4  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild ||
				startId - width * 5  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - 4}]`).firstChild ||
				startId - width * 6  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - 5}]`).firstChild ||
				startId - width * 7  === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id="${startId - 2}]`).firstChild && !document.querySelector(`[square-id="${startId - 3}]`).firstChild && !document.querySelector(`[square-id="${startId - 4}]`).firstChild && !document.querySelector(`[square-id="${startId - 5}]`).firstChild && !document.querySelector(`[square-id="${startId - 6}]`).firstChild
			) {
				return true
			}
			break;
		case 'king':
			if (
				startId - 1 === targetId ||
				startId + 1 === targetId ||
				startId + width === targetId ||
				startId - width === targetId ||
				startId + width - 1 === targetId ||
				startId + width + 1 === targetId ||
				startId - width - 1 === targetId ||
				startId - width + 1 === targetId 
				
			) {
				return true
			}
	}
}

function checkForWin() {
	const kings = document.querySelector('#king')
	console.log(kings)
	if (kings.some(king => king.firstChild.classList.contains('white'))) {
		infoDisplay.innerHTML = 'Black wins!'
		const allSquares = document.querySelector('.square')
		allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
	}

	if (!kings.some(king => king.firstChild.classList.contains('black'))) {
		infoDisplay.innerHTML = 'White wins!'
		const allSquares = document.querySelector('.square')
		allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
	}
}