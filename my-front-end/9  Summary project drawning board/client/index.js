"use strict";
import EventBus from './eventBus.js';
import Header from './header.js';
import DrawingBoard from './drawingBoard.js';
import AsideLeft from './asideLeft.js';
import AsideRight from './asideRight.js';
import PaintingService from './paintingsService.js';
export const bus = new EventBus();
export const service = new PaintingService();

const headerElement = document.createElement('header');
headerElement.classList.add('header');
document.body.insertBefore(headerElement, document.querySelector('span.spanToInsertBefore'));
const header = new Header(headerElement);

const drawingBoardElement = document.createElement('main');
drawingBoardElement.classList.add('main');
document.body.insertBefore(drawingBoardElement, document.querySelector('span.spanToInsertBefore'));
window.drawingBoard = new DrawingBoard(drawingBoardElement);

const asideLeftElement = document.createElement('aside');
asideLeftElement.classList.add('asideLeft');
document.body.insertBefore(asideLeftElement, document.querySelector('span.spanToInsertBefore'));
const asideLeft = new AsideLeft(asideLeftElement);

const asideRightElement = document.createElement('aside');
asideRightElement.classList.add('asideRight');
document.body.insertBefore(asideRightElement, document.querySelector('span.spanToInsertBefore'));
export const asideRight = new AsideRight(asideRightElement);