"use strict";
import EventBus from './eventBus.js';
import Header from './header.js';
import DrawingBoard from './drawingBoard.js';
import AsideLeft from './asideLeft.js';
import AsideRight from './asideRight.js';
import PaintingService from './paintingsService.js';
const bus = new EventBus();
export const service = new PaintingService(bus);

//to remove 1 from 3
window.service2 = service;

const headerElement = document.createElement('header');
headerElement.classList.add('header');
document.body.insertBefore(headerElement, document.querySelector('script:first-of-type'));
const header = new Header(headerElement, bus);

const drawingBoardElement = document.createElement('main');
drawingBoardElement.classList.add('main');
document.body.insertBefore(drawingBoardElement, document.querySelector('script:first-of-type'));
window.drawingBoard = new DrawingBoard(drawingBoardElement, bus);

const asideLeftElement = document.createElement('aside');
asideLeftElement.classList.add('asideLeft');
document.body.insertBefore(asideLeftElement, document.querySelector('script:first-of-type'));
const asideLeft = new AsideLeft(asideLeftElement, bus);

const asideRightElement = document.createElement('aside');
asideRightElement.classList.add('asideRight');
document.body.insertBefore(asideRightElement, document.querySelector('script:first-of-type'));
const asideRight = new AsideRight(asideRightElement, bus);