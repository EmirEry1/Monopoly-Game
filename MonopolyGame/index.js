
// TODO: Put animations to buttons


// Classes
var turn=0;
var changeTurn=false;

function Tile(number,name,price,moveOrder){
  this.number=number;
  this.name=name;
  this.price=price;
  this.level=0;
  this.moveOrder=moveOrder;
  this.owner=null;

  this.increaseLevel=function(){
    if(this.level<5){

      this.level++;
      }
      else{
        this.level=5;
      }
    }
  }

function Player(name,playerNumber,wealth){
  this.name=name;
  this.playerNumber=playerNumber;
  this.wealth=wealth;
  this.positionLeft=25;
  this.positionBottom=25;
  this.movesMade=0;
  this.tilesOwned=[];
  this.atStartingPosition=true;
  this.jailTime=0;
  this.isBroke=false;

  this.totalWealth=function(){
    var total=this.wealth;
    if(this.tilesOwned!=[]){
      for(i=0;i<this.tilesOwned.length;i++){
        total=parseInt(total)+this.tilesOwned[i].price;
        // TODO: There is a bug here. Fix it
      }
    }
    return total;
}

  this.checkBroke=function(){
    if(this.wealth<0){
      this.isBroke=true;
      var total=0;
      for(i=0;i<this.tilesOwned.length;i++){
        total+=parseInt(this.tilesOwned[i].price);
      }
      if(this.wealth+total<0){
        gameOver();
      }
      return true;
    }
    else{
      return false;
    }
  }
  this.goToJail=function(){

    if(this.jailTime==0){
      this.move(20);
      this.wealth=parseInt(this.wealth)-200;
      updatePlayerBars();
      document.querySelector(".warning-arrest").classList.add("appear");
      this.jailTime=4;
    }
    else if(this.jailTime==2||this.jailTime==3){
        document.querySelector(".arrest-text").innerHTML="You are in jail";
        document.querySelector(".warning-arrest").classList.add("appear");
    }

    else if(this.jailTime==1){}
  }

  this.buy=function(){

    if(this.movesMade!=0&&this.movesMade!=3&&this.movesMade!=6&&this.movesMade!=40&&
    this.movesMade!=13&&this.movesMade!=20&&this.movesMade!=23&&this.movesMade!=26&&this.movesMade!=33){
      var tileToBuy=findTileUsingMoveOrder(this.movesMade);


        if(tileToBuy.owner==null){
          if(this.wealth>=tileToBuy.price){
            this.wealth-=tileToBuy.price;
            tileToBuy.owner=this;
            this.tilesOwned.push(tileToBuy);
            updatePlayerBars();
            tileToBuy.increaseLevel();
          }
          else{
            alert("You dont have enough money to buy this property.");
          }
      }
      else{
        alert("This property has an owner");
      }
    }
    else{
      alert("This tile cannot be bought");
    }



  }
  this.payRent=function(){


        if(this.movesMade!=0&&this.movesMade!=3&&this.movesMade!=6&&this.movesMade!=40&&
        this.movesMade!=13&&this.movesMade!=20&&this.movesMade!=23&&this.movesMade!=26&&this.movesMade!=33){

          var tileToPay=findTileUsingMoveOrder(this.movesMade);
      if(tileToPay.owner==this){
        tileToPay.increaseLevel();

        document.querySelector(".warning-level").classList.add("appear");
        document.querySelector(".level-show").innerHTML=tileToPay.level;

        document.querySelector(".ok-level").addEventListener("click",function(){
          document.querySelector(".warning-level").classList.remove("appear");
        },{once:true});



      }
      else if (tileToPay.owner!=null && tileToPay.owner.jailTime==0) {

          tileToPay.owner.wealth+=tileToPay.level*tileToPay.price;
          this.wealth-=tileToPay.level*tileToPay.price;

          document.querySelector(".rent-fee").innerHTML=tileToPay.level*tileToPay.price;
          document.querySelector(".tile-owner").innerHTML=tileToPay.owner.name;
          tileToPay.increaseLevel();

          document.querySelector(".warning-rent").classList.add("appear");


          document.querySelector(".ok").addEventListener("click",function(){
              document.querySelector(".warning-rent").classList.remove("appear");
          },{once:true});

          updatePlayerBars();

        }

      }


  }

  this.earnSalary=function(){
    if(this.movesMade==0&&this.atStartingPosition==false){
      this.wealth=parseInt(this.wealth)+200;
    }
    updatePlayerBars();
  }



  this.moveOneTile=function(){

      this.earnSalary();

      if(this.movesMade<6){
        moveUp(this);
      }
      else if (this.movesMade>=6 && this.movesMade<20) {
        moveRight(this);

      }

      else if (this.movesMade>=20 && this.movesMade<26) {
        moveDown(this);

      }
      else if (this.movesMade>=26 && this.movesMade<40) {
        moveLeft(this);

      }

  }


  this.move=function(numberOfMoves){
      for(n=1;n<=numberOfMoves;n++){
          this.moveOneTile();
      }



  }

}

function nextTurn(){
  if(turn==3){
    turn=0;
  }
  else{
    turn++;
  }
  document.querySelector(".turn-bar").innerHTML="<h1>"+players[turn].name+ "'s Turn</h1>";
}


//Creating Tiles
var tiles=[
 tile1=new Tile(1,"Peanut",60,1),
 tile2=new Tile(2,"Pistachio",60,2),
 tile3=new Tile(3,"Ketchup",100,4),
 tile4=new Tile(4,"Mayo",100,5),
 tile5=new Tile(5,"Apple",140,7),
 tile6=new Tile(6,"Orange",140,8),
 tile7=new Tile(7,"Grape",140,9),
 tile8=new Tile(8,"Pear",160,10),
 tile9=new Tile(9,"Banana",160,11),
 tile10=new Tile(10,"Melon",160,12),
 tile11=new Tile(11,"Onion",180,14),
 tile12=new Tile(12,"Lettuce",180,15),
 tile13=new Tile(13,"Leek",180,16),
 tile14=new Tile(14,"Eggplant",200,17),
 tile15=new Tile(15,"Broccoli",200,18),
 tile16=new Tile(16,"Spinach",200,19),
 tile17=new Tile(17,"Chocolate",220,21),
 tile18=new Tile(18,"Chips",220,22),
 tile19=new Tile(19,"Cheese",220,24),
 tile20=new Tile(20,"Yogurt",240,25),
 tile21=new Tile(21,"Coke",260,27),
 tile22=new Tile(22,"Ice-tea",260,28),
 tile23=new Tile(23,"Fanta",260,29),
 tile25=new Tile(24,"Coffe",280,30),
 tile24=new Tile(25,"Ayran",280,31),
 tile26=new Tile(26,"Tea",280,32),
 tile27=new Tile(27,"Burger",300,34),
 tile28=new Tile(28,"Pizza",300,35),
 tile29=new Tile(29,"Chicken",300,36),
 tile30=new Tile(30,"Kebap",320,37),
 tile31=new Tile(31,"Fish",320,38),
 tile32=new Tile(32,"Beef",320,39)];

 function findTileUsingMoveOrder(moveOrder){
   for(i=0;i<tiles.length;i++){

     if(tiles[i].moveOrder==moveOrder){
        return tiles[i];
     }
   }

 }



//Opening Tile Page

var allTiles=document.querySelectorAll(".tile");
var cardView=document.querySelector(".card-view");
var cardName=document.querySelector(".card-name");
var cardPrice=document.querySelector(".price");
var cardLevel=document.querySelector(".level");
var cardOwner=document.querySelector(".owner");
var cardLevelRent=document.querySelectorAll(".rent-level");


var cardOpened=false;
var playerWealth;
var tileOwner;
var index;

// TODO: Change the owner of the tile
function openingCardView(){
  if(!cardOpened){
    document.querySelector(".sell-button").removeEventListener("click",sellTile,{once:true});
    /*
    We are using the code above because what the following code does is it creates an
    //eventListener each time the function is called. So when the user clickes diffrent
    //cards without closing the previous one, this code creates multiple eventListener
    //and in the end all of them execute when the sell button is clicked. This sells all
    //previously clicked tiles. So what we do is we delete the previous eventListener
    //(if there is one) in every openingCardView function call to prevent such problems.
    *///

    for(i=0;i<allTiles.length;i++){
        allTiles[i].addEventListener("click",function(event){
        var fullString=String(event.target.classList[1]).substring(2,4);
        console.log(fullString);
         index=parseInt(fullString);

        document.querySelector(".close-button").classList.remove("broke-position-close");
        document.querySelector(".sell-button").classList.remove("appear");


        if(tiles[index-1].owner!=null){
          if(tiles[index-1].owner.checkBroke()){
            document.querySelector(".sell-button").classList.add("appear");
            document.querySelector(".close-button").classList.add("broke-position-close");
            playerWealth=parseInt(players[turn].wealth);


            document.querySelector(".sell-button").addEventListener("click",sellTile,{once:true});

          }
        }


        cardView.classList.add("appear");

        cardName.innerHTML=tiles[index-1].name;
        cardPrice.innerHTML=tiles[index-1].price;
        cardLevel.innerHTML=tiles[index-1].level;
        for(j=0;j<cardLevelRent.length;j++){
          cardLevelRent[j].innerHTML=(j+1)*tiles[index-1].price;
        }



        if(tiles[index-1].owner!=null){
            cardOwner.innerHTML=tiles[index-1].owner.name;

        }
        else{
            cardOwner.innerHTML="None";
        }
// TODO: Implement selling properties



        cardOpened=true;


      });


     }
     closingCardView();
  }
}

//Closing Tile Page

function closingCardView(){
  document.querySelector(".close-button").addEventListener("click",function(){
      cardView.classList.remove("appear");
      cardOpened=false;
  });
}
openingCardView();

//Creating Players

// TODO: Take players names from inputs


var player1=new Player("Emir",1,"1500");
var player2=new Player("Esil",2,"1500");
var player3=new Player("Bilge",3,"1500");
var player4=new Player("Bilal",4,"1500");

var players=[player1,player2,player3,player4];
var playerImages=document.querySelectorAll(".player-image");


var playerBars=document.querySelectorAll(".player-bar");

function updatePlayerBars(){
  for(i=0;i<playerBars.length;i++){
    playerBars[i].innerHTML="<h1>"+players[i].name+"</h1><h2>Wealth: "+players[i].wealth+"$</h2>";
    //Showing Player Names and Wealth
  }
}

updatePlayerBars();

document.querySelector(".turn-bar").innerHTML="<h1>"+players[turn].name+ "'s Turn</h1>";


//Moving Functions
function updatPlayerPositions(){
  for(i=0;i<players.length;i++){
    playerImages[i].style.left=players[i].positionLeft+"px";
    playerImages[i].style.bottom=players[i].positionBottom+"px";
  }
}

function moveUp(player){
  player.movesMade++;

  if(player.movesMade==6 || player.movesMade==1 || player.movesMade==20 || player.movesMade==26){
      player.positionBottom+=90;
    }
  else{
    player.positionBottom+=80;
  }

  updatPlayerPositions();
}

function moveDown(player){
  player.movesMade++;

  if( player.movesMade==21 || player.movesMade==26){
      player.positionBottom-=90;
    }
  else{
    player.positionBottom-=80;
  }

  updatPlayerPositions();
}

function moveLeft(player){
  player.movesMade++;

  if(player.movesMade==40 || player.movesMade==27){
      if(player.movesMade==40){
        player.movesMade=0;
      }
      player.positionLeft-=90;
    }

    else if (player.movesMade==33 || player.movesMade==34) {
      player.positionLeft-=110;
    }
  else{
    player.positionLeft-=80;
  }

  updatPlayerPositions();
}
function moveRight(player){
  player.movesMade++;

  if(player.movesMade==7 || player.movesMade==20){
      player.positionLeft+=90;
    }
  else if (player.movesMade==13 || player.movesMade==14) {
      player.positionLeft+=110;
  }
  else{
    player.positionLeft+=80;
  }

  updatPlayerPositions();
}


//Event Listeners

//Throwing Dice




var diceButton=document.querySelector(".roll-dice");
var dice1=document.querySelector(".first-die");
var dice2=document.querySelector(".second-die");

var buyButton=document.querySelector(".buy-button");


var random1;
var random2;




function changeButton(){



  if(document.querySelector(".roll-dice").innerHTML=="<h1>Roll!</h1>"){
    document.querySelector(".roll-dice").innerHTML="<h1>Make Move!</h1>";

  }
  else if (document.querySelector(".roll-dice").innerHTML=="<h1>Make Move!</h1>") {
    document.querySelector(".roll-dice").innerHTML="<h1>Finish Turn</h1>";
  }

  else{
    document.querySelector(".roll-dice").innerHTML="<h1>Roll!</h1>";
  }
}

function rollingDice(){
  diceButton.addEventListener("click",function(){

      buyButton.removeEventListener("click",buyListener,{once:true});



     random1=Math.ceil(Math.random()*6);
     random2=Math.ceil(Math.random()*6);

     dice1.setAttribute("src","images/dice"+random1+".png");
     dice2.setAttribute("src","images/dice"+random2+".png");
     if(players[turn].jailTime==0){
       changeButton();
       makeMove();
     }

     else if(players[turn].jailTime!=0){
       if(random1==random2){
         document.querySelector(".warning-free").classList.add("appear");
         document.querySelector(".ok-free").addEventListener("click",function(){
           players[turn].jailTime=0;
           document.querySelector(".warning-free").classList.remove("appear");
           document.querySelector(".roll-dice").innerHTML="<h1>Finish Turn</h1>";
           finishTurn();
         },{once:true});
       }
       else if (random1!=random2 && players[turn].jailTime==1) {
         document.querySelector(".warning-jail-leave").classList.add("appear");
         document.querySelector(".ok-leave").addEventListener("click",function(){
            payJail();

         },{once:true})
       }
       else{
         changeButton();
         makeMove();
       }
     }




  },{once:true});



}
  function makeMove(){

    diceButton.addEventListener("click",function(){

      if(players[turn].jailTime==0||players[turn].jailTime==4){
        players[turn].move(random1+random2);
      }

      if((players[turn].movesMade==26&&players[turn].jailTime==0)||players[turn].jailTime!=0){

        changeButton();
        inJail();
      }
      else{

        if(random1!=random2){
          changeTurn=true;
        }
        players[turn].atStartingPosition=false;
        changeButton();
        finishTurn();
      }

    },{once:true});


  }

  function finishTurn(){

    //Checks if the player wants to buy the tile
    buyButton.addEventListener("click",buyListener,{once:true});



      //Pays rent if needed. (Conditions are defined on the rent method)
      players[turn].payRent();
      if(players[turn].checkBroke()){
        // TODO: Tell the player that they are broke
        var ownerOfTile=findTileUsingMoveOrder(players[turn].movesMade).owner;
        ownerOfTile.wealth=parseInt(players[turn].wealth)+parseInt(ownerOfTile.wealth);
        updatePlayerBars();

        brokeState();

      }



      //Changes the turn if the dice aren't a pair
    diceButton.addEventListener("click",function(){

      changeButton();
      if(changeTurn){
          nextTurn();
      }
      changeTurn=false;
      rollingDice();

    },{once:true});



  }
  function inJail(){
    players[turn].goToJail();

    //This code runs if the player has just got arresteds
    // if(players[turn].jailTime==4){
      document.querySelector(".pay").addEventListener("click",

        //Checks if the player has enough money


      payJail,{once:true});

        //If the player decides not to pay, we decrease the jailTime and proceed to the next player

      document.querySelector(".dont-pay").addEventListener("click",


      dontPayJail,{once:true});

    }




  function buyListener(){



      document.querySelector(".warning-buy").classList.add("appear");


      document.querySelector(".yes").addEventListener("click",buyAnswerYes,{once:true});
      document.querySelector(".no").addEventListener("click",buyAnswerNo,{once:true});




    }
    function buyAnswerYes(){
      players[turn].buy();
      document.querySelector(".warning-buy").classList.remove("appear");

    }
    function buyAnswerNo(){
      document.querySelector(".warning-buy").classList.remove("appear");
      buyButton.addEventListener("click",buyListener,{once:true});
    }

    function payJail(){
      //Checks if the player has enough money

      if(parseInt(players[turn].wealth)>=100){
        players[turn].wealth=parseInt(players[turn].wealth)-100;
        findWarningButton().classList.remove("appear");
        players[turn].jailTime=0;



        //If player has payed, it waites for the player to finish their turn

        document.querySelector(".roll-dice").innerHTML="<h1>Finish Turn</h1>";
        diceButton.addEventListener("click",function(){
          changeButton();

          nextTurn();
          changeTurn=false;
          updatePlayerBars();
          rollingDice();

        },{once:true});
      }
      else{
        alert("You dont have enough money.");
        inJail();
      }
    }

    function dontPayJail(){


      findWarningButton().classList.remove("appear");

      players[turn].jailTime--;
      document.querySelector(".roll-dice").innerHTML="<h1>Finish Turn</h1>";
      diceButton.addEventListener("click",function(){
        changeButton();

        nextTurn();
        changeTurn=false;

        rollingDice();

      },{once:true});
    }


    function findWarningButton(){
      var allWarnings=document.querySelectorAll(".warning");
      for (i=0;i<allWarnings.length;i++){
        for(j=0;j<allWarnings[i].classList.length;j++){
          if(allWarnings[i].classList[j]=="appear"){
            return allWarnings[i];
          }
        }
      }
    }
    var sellAlertFirst=true;
    function brokeState(){

      // TODO: Dont let the player finish the turn without selling
      // TODO: Using an invisible button in front of the dice button can work
      // TODO: To make the button invisible, you can use opacity 0
      document.querySelector(".sell-alert").classList.add("appear");

      if(sellAlertFirst){
        document.querySelector(".sell-alert").addEventListener("click",function(){
          if(players[turn].checkBroke()){
            alert("You have to sell some of your tiles to continue.");
            sellAlertFirst=false;
            }
            else{
              document.querySelector(".sell-alert").classList.remove("appear");
              diceButton.click();

            }
          });
          sellAlertFirst=false;
      }

      }

      function sellTile(){


          players[turn].wealth=playerWealth+tiles[index-1].price;
          var indexOfTile=players[turn].tilesOwned.indexOf(tiles[index-1]);
          players[turn].tilesOwned.splice(indexOfTile,1);

          if(players[turn].movesMade==6){
            tiles[index-1].owner=null;
            cardOwner.innerHTML="None";
          }
          else{
            tiles[index-1].owner=findTileUsingMoveOrder(players[turn].movesMade).owner;
            findTileUsingMoveOrder(players[turn].movesMade).owner.tilesOwned.push(tiles[index-1]);
            cardOwner.innerHTML=findTileUsingMoveOrder(players[turn].movesMade).owner.name;
          }
          // TODO: This code creates bunch of event listeners, fix it.

          document.querySelector(".close-button").classList.remove("broke-position-close");
          document.querySelector(".sell-button").classList.remove("appear");
          updatePlayerBars();
          addedFirstTime=true;

      }
      function gameOver(){
        var lastTile=findTileUsingMoveOrder(players[turn].movesMade);
        lastTile.owner.wealth=parseInt(lastTile.owner.wealth)+parseInt(players[turn].wealth);
        for(i=0;i<players[turn].tilesOwned.length;i++){
          lastTile.owner.tilesOwned.push(players[turn].tilesOwned[i]);
          players[turn].tilesOwned[i].owner=lastTile.owner;
          players[turn].tilesOwned.splice(i,1);
        }

        document.querySelector(".game-over").classList.add("appear");
        // TODO: Change all the innerHTML
        }




rollingDice();
