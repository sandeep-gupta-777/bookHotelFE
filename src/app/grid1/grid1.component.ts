import { Component, OnInit } from '@angular/core';
import {isUndefined} from "util";

@Component({
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.css']
})
export class Grid1Component implements OnInit {


  constructor() { }
  mode:string = 'easy';
  arr = [1,2,3,4,5,6,7,8,9];
  gameStarted:boolean = false;
  boxCount = 8;
  boxHighlighted:number = -1;
  randomCount = 0;
  score=0;
  lastClickTime:number;
  currentClickTime:number;
  maxScore = 0;
  maxTimerCount = 120;//sec
  timerCount = 120;//sec
  setIntervalRef ;
  reset(){
    // this.arr = [];
    this.boxHighlighted = -1;
    this.gameStarted=false;
    clearInterval(this.setIntervalRef);
    this.score = 0;
    this.timerCount = 120;
  }
  ngOnInit() {
    console.log('on init');
    if(localStorage.getItem('maxScore'))
    this.maxScore = parseInt(localStorage.getItem('maxScore'));
  }
  startGame(){
    this.reset();
    this.gameStarted = true;
    this.setIntervalRef = setInterval(()=>{
      this.boxHighlighted = Math.floor(Math.random()*this.boxCount);
      --this.timerCount;
    }, 1000);
    setTimeout((()=>{
      clearInterval(this.setIntervalRef);
      this.gameFinished();
    }),this.maxTimerCount * 1000)
  }
  setMode(mode:string){
    this.mode =mode;
    if(this.mode==='easy') this.boxCount =8;
    else if(this.mode==='medium') this.boxCount =15;
    else if(this.mode==='hard') this.boxCount =35;

    this.arr = [];
    for(let i=0;i<=this.boxCount;i++){
      this.arr[i]=i;
    }
  }
  boxClicked(i){
    console.log('box clicked');
    this.currentClickTime = this.timerCount;
    if(this.lastClickTime===this.currentClickTime){
      return;
    }
    this.lastClickTime = this.currentClickTime;
    if(i===this.boxHighlighted){
      ++this.score;
      if(isUndefined(this.maxScore) ||this.score > this.maxScore ){
        localStorage.setItem('maxScore', this.score.toString());;
        this.maxScore = this.score;
      }
    }
    else {
      --this.score;
    }
  }
  gameFinished(){
    this.gameStarted = false;

    alert('Game Over!!');
    if(isUndefined(this.maxScore) ||this.score > this.maxScore ){
      localStorage.setItem('maxScore', this.score.toString());;
      this.maxScore = this.score;
    }
    this.reset();
  }


}
