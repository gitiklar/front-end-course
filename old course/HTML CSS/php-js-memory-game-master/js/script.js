
var g_field, g_objCards,g_lock = false;

function trace(str){
	console.log(str);
}

function getActiveCard(){
	
	var objActiveCard = g_objCards.filter(".active");
	if(objActiveCard.length == 0)
		return(null);
	
	if(objActiveCard.length > 1)
		throw new Error("more then one active card!!!");
	
	return(objActiveCard);
}

/**
 * turn over the card to the back
 */
function clearActiveCard(objCard){
	
	objCard.removeClass("show-front");
	objCard.removeClass("active");
}


/**
 * compare 2 active cards, if equal - keep them turned on
 */
function compareCards(objCard, activeCard){
	
	var name1 = objCard.data("name");
	var name2 = activeCard.data("name");
	
	if(name1 != name2){
		clearActiveCard(objCard);
		clearActiveCard(activeCard);
		return(true);
	}
	
	//the cards are similar
	
	objCard.addClass("ok").removeClass("active");
	activeCard.addClass("ok").removeClass("active");
}


/**
 * on card click - set active card (turn it over)
 */
function onCardClick(){

	if(g_lock == true)
		return(true);
	
	var objCard = jQuery(this);

	if(objCard.hasClass("ok"))
		return(true);
	
	objCard.addClass("show-front");
		
	var activeCard = getActiveCard();
			
	
	if(activeCard){
		
		g_lock = true;
		
		setTimeout(function(){
			g_lock = false;
			
			compareCards(objCard, activeCard);
		},1000);
		
	}else{
		
		objCard.addClass("active");
	}
	
	
}


function initGame(){
	
	g_field = jQuery(".field");
	g_objCards = jQuery(".card");
	
	g_objCards.click(onCardClick);
		
}

jQuery(document).ready(function(){
	
	initGame();
		
})

