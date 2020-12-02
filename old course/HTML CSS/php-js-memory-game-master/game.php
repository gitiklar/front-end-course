<?php 


function getArrCards(){
	
	$path = dirname(__FILE__)."/images/front/";
	
	$arrImages = scandir($path);
	$arrCars = array();
	foreach($arrImages as $image){
		
		if($image == "." || $image == "..")
			continue;
		
		$info = pathinfo($image);
		
		$filename = $info["basename"];
		$name = $info["filename"];
		
		$arrCard  = array();
		$arrCard["name"] = $name;
		$arrCard["filename"] = $filename;
		$arrCard["url"] = "images/front/{$filename}";
		
		$arrCars[] = $arrCard;
		$arrCars[] = $arrCard;
		
	}
	
	shuffle($arrCars);
		
	return($arrCars);
}

/**
 * put game css
 */
function putCss(){
	
	?>
	
	.field{
		background-color:lightgray;
		padding:50px;
		min-height:300px;
		min-width:300px;
	}
	
	.card{
		width:130px;
		height:150px;
		float:left;
		background-color:white;
		margin:20px;
		border:4px solid gray;
		position:relative;
	}
	
	.card.ok{
		border-color:green;
	}
	
	.card .back,
	.card .front{
		width:100%;
		height:100%;
		background-image:url('images/back/back1.png');
		background-size:cover;
		position:absolute;
		xbackground-color:red;
		display:block;
		cursor:pointer;
	}
	
	.card .front{
		display:none;
	}
	
	.card.show-front .front{
		display:block;
	}
	
	.card.show-front .back{
		display:none;
	}
	
	
	<?php 
}

/**
 * put game html
 */
function putGame(){
	
	$arrCards = getArrCards();
	
	?>
	<html>
	<head>
		<style>
			<?php putCss()?>
		</style>

<script
  src="https://code.jquery.com/jquery-1.12.4.min.js"
  integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
  crossorigin="anonymous"></script>
		
		<script src="js/script.js"></script>
  		
	</head>
	
	<body>
		<div class="field">
			
			<?php foreach($arrCards as $card):?>
			
			<div class="card card-name-<?php echo $card["name"]?>" data-name="<?php echo $card["name"]?>">
				
				<div class="front" style="background-image:url('<?php echo $card["url"]?>')"></div>
				<div class="back"></div>
			</div>
							
			<?php endforeach?>
			
			<div style="clear:both;"></div>				
			
		</div>
	</body>
	</html>
	
	<?php 
	
}


putGame();
