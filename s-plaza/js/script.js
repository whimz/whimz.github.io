var bullits = [];
var plazaSliderLi = []; 
var plazaIndex = 0; //index of current slide of plaza
var gallerySliderLi = [];
var galleryIndex = 0;
var e, eFloors, eSpaces;
var optionsArrow = [];
var floorsLi = [];
var spacesList = [];
var spacesListLi = [];
var floorsPicList = [];
var floorIndex = 0;
var hidden = true;


function prepareLayout() {

	if (document.getElementsByClassName("bullits")) 
	{
		bullits = document.getElementsByClassName("bullits");
	}

	if (document.getElementById("sliderBullits")) 
	{
		document.getElementById("sliderBullits").onclick = function(event) {
			e = event || window.event;

			if (e.target !== this)
				for(var i = 0; i < bullits.length; i++)
					if (bullits[i] === e.target && plazaIndex !== i)
					{					
						plazaSliderLi[plazaIndex].style.opacity = 0;
						plazaSliderLi[i].style.opacity = 1;
						bullits[plazaIndex].style.backgroundColor = "#575756";
						bullits[i].style.backgroundColor = "#ffffff";
						plazaIndex = i;				  
					}
			}
	}

	if (document.getElementsByClassName("sliderLi")) 
	{
		plazaSliderLi = document.getElementsByClassName("sliderLi");	
	}
	
	if (document.getElementsByClassName("gallerySliderLi")) 
	{
		gallerySliderLi = document.getElementsByClassName("gallerySliderLi");
	}
		
	if (window.innerHeight < $("div.sliderAndArrowWrap").height()) 
		$("div.sliderAndArrowWrap").css("height", window.innerHeight);

	if (document.getElementsByClassName("optionsArrow"))
	{
		optionsArrow = document.getElementsByClassName("optionsArrow");
	}

	if (document.getElementsByClassName("spacesList"))
	{
		spacesList = document.getElementsByClassName("spacesList");
	}

	if (document.querySelectorAll(".floorsList > li")) 
	{
		floorsOptions();
	}

	if (document.querySelectorAll(".spacesList > li")) 
	{
		spacesOptions();
	}

	if (document.querySelectorAll(".floorsPicList > li")) 
	{
		floorsPicList = document.querySelectorAll(".floorsPicList > li");
	}
}//---END OF prepareLayout function---


//---scroll main page---
var page = $('html, body');
$('a[href*="div.aboutCompany"]').click(function() {
    page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top + $("header").height()
    }, 500);
    return false;
});


//gallerySlider forward
function slideRight() {
	if (galleryIndex === 0)
		document.getElementById("slLeft").style.display = "inline-block";	

	gallerySliderLi[galleryIndex].style.left = "-5000px";
	gallerySliderLi[galleryIndex].style.opacity = 0;
	gallerySliderLi[++galleryIndex].style.opacity = 1;

	if (galleryIndex === gallerySliderLi.length - 1)
		document.getElementById("slRight").style.display = "none";
}


//gallerySlider rewind
function slideLeft(){
	if (galleryIndex === gallerySliderLi.length - 1)
		document.getElementById("slRight").style.display = "inline-block";

	gallerySliderLi[--galleryIndex].style.left = "0px";
	gallerySliderLi[galleryIndex + 1].style.opacity = 0;	
	gallerySliderLi[galleryIndex].style.opacity = 1;

	if (galleryIndex === 0)
		document.getElementById("slLeft").style.display = "none";
}


//---floors items click---
function floorsOptions(){
	floorsLi = document.querySelectorAll(".floorsList > li");
	for (var i = floorsLi.length - 1; i >= 0; i--)
	{
		floorsLi[i].onclick = function(event){
			eFloors = event || window.event;
			for (var i = spacesList.length - 1; i >= 0; i--) {
				spacesList[i].style.display = "none";
			}
			hidden = true;
			for(var i = floorsLi.length - 1; i >= 0; i--)
			{
				if(eFloors.target === floorsLi[i])
				{
					floorIndex = i;
					document.getElementsByClassName("floorBtn")[0].innerHTML = eFloors.target.innerHTML;
					document.getElementsByClassName("floorValue")[0].innerHTML = eFloors.target.innerHTML;
					document.getElementById("summaryFloor").innerHTML = "Этаж: " + parseInt(eFloors.target.innerHTML);
					document.querySelectorAll(".floorsList")[0].style.display = "none";
					document.getElementsByClassName("spacesBtn")[0].innerHTML = parseFloat(spacesList[floorIndex].firstElementChild.innerHTML) + " м<sup>2</sup>";
					showPicture();
				}
				
			}
		};
	}
	document.getElementsByClassName("floorBtn")[0].innerHTML = floorsLi[0].innerHTML;
}


//---show floors plan---
function showPicture(){
	for (var i = floorsPicList.length - 1; i >= 0; i--) {
		if(i === floorIndex)
		{
			floorsPicList[i].style.display = "inline";
		}
		else
		{
			floorsPicList[i].style.display = "none";
		}
	}
}

//---spaces button click---
function showSpacesList(){
	
	if (hidden === true) 
	{
		spacesList[floorIndex].style.display = "block";
		spacesList[floorIndex].style.opacity = "1";
		spacesList[floorIndex].style.visibility = "visible";
		hidden = false;
	}
	else
	{
		spacesList[floorIndex].style.opacity = "0";
		spacesList[floorIndex].style.visibility = "hidden";
		spacesList[floorIndex].style.display = "none";
		hidden = true;
	}
}

//---floors button click---
function showFloorsList(){
	for (var i = spacesList.length - 1; i >= 0; i--) {
		spacesList[i].style.display = "none";
	}
	hidden = true;

	if (document.getElementsByClassName("floorsList")[0].style.display === "block") 
	{
		document.getElementsByClassName("floorsList")[0].style.display = "none";
	}
	else
	{
		document.getElementsByClassName("floorsList")[0].style.display = "block";
	}
}

//---spaces items click---
function spacesOptions(){
	spacesListLi = document.querySelectorAll(".spacesList > li");
	for (var i = spacesListLi.length - 1; i >= 0; i--) 
	{
		spacesListLi[i].onclick = function(event){
			eSpaces = event || window.event;
			for (var i = spacesListLi.length - 1; i >= 0; i--) 
			{
				if (eSpaces.target === spacesListLi[i]) 
				{
					document.getElementsByClassName("spacesBtn")[0].innerHTML = eSpaces.target.innerHTML;
					document.getElementsByClassName("spaceValue")[0].innerHTML = parseFloat(eSpaces.target.innerHTML) + " м<sup class='requestSup'>2</sup>";
					spacesList[floorIndex].style.opacity = "0";
					spacesList[floorIndex].style.visibility = "hidden";
					spacesList[floorIndex].style.display = "none";
					hidden = true;
					
				}					
			}
		};
	}
	document.getElementsByClassName("spacesBtn")[0].innerHTML = spacesListLi[0].innerHTML;
}
