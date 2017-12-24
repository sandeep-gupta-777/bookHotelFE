import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
// import $ from 'jquery';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent  {
//   ngAfterViewInit(): void {
//     this.canvasCode();
//     let canvas :any= document.getElementById("canvas");
//     let parent = document.getElementById("parent");
//     canvas.width = parent.offsetWidth;
//     canvas.height = parent.offsetHeight;
//   }
//
//   constructor(private cdRef:ChangeDetectorRef) { }
//
//   ngOnInit() {
//
//   }
//
//   canvasCode(){
//     let canvas:any = document.getElementById("canvas");
//     let ctx:any = canvas.getContext("2d");
//     let lastX:any;
//     let lastY:any;
//     let strokeColor:any = "red";
//     let strokeWidth:any = 2;
//     let mouseX:any;
//     let mouseY:any;
//     let canvasOffset:any = $("#canvas").offset();
//     let offsetX:any = canvasOffset.left;
//     let offsetY:any = canvasOffset.top;
//     let isMouseDown :any= false;
//     let brushSize :any= 20;
//     let brushColor:any = "#ff0000";
//     ctx.lineJoin = "round";
//
// // command pattern -- undo
//     let points:any = [];
//
//
//     function handleMouseDown(e:any) {
//       mouseX = Number(e.clientX - offsetX);
//       mouseY = Number(e.clientY - offsetY);
//
//       // Put your mousedown stuff here
//       ctx.beginPath();
//       if (ctx.lineWidth != brushSize) {
//         ctx.lineWidth = brushSize;
//       }
//       if (ctx.strokeStyle != brushColor) {
//         ctx.strokeStyle = brushColor;
//       }
//       ctx.moveTo(mouseX, mouseY);
//       points.push({
//         x: mouseX,
//         y: mouseY,
//         size: brushSize,
//         color: brushColor,
//         mode: "begin"
//       });
//       lastX = mouseX;
//       lastY = mouseY;
//       isMouseDown = true;
//     }
//
//     function handleMouseUp(e:any) {
//       mouseX = Number(e.clientX - offsetX);
//       mouseY = Number(e.clientY - offsetY);
//
//       // Put your mouseup stuff here
//       isMouseDown = false;
//       points.push({
//         x: mouseX,
//         y: mouseY,
//         size: brushSize,
//         color: brushColor,
//         mode: "end"
//       });
//     }
//
//
//     function handleMouseMove(e:any) {
//       mouseX = Number(e.clientX - offsetX);
//       mouseY = Number(e.clientY - offsetY);
//
//       // Put your mousemove stuff here
//       if (isMouseDown) {
//         ctx.lineTo(mouseX, mouseY);
//         ctx.stroke();
//         lastX = mouseX;
//         lastY = mouseY;
//         // command pattern stuff
//         points.push({
//           x: mouseX,
//           y: mouseY,
//           size: brushSize,
//           color: brushColor,
//           mode: "draw"
//         });
//       }
//     }
//
//     $("#canvas").mousedown(function (e) {
//       handleMouseDown(e);
//     });
//     $("#canvas").mousemove(function (e) {
//       handleMouseMove(e);
//     });
//     $("#canvas").mouseup(function (e) {
//       handleMouseUp(e);
//     });
//
//
//     function redrawAll() {
//
//       if (points.length == 0) {
//         return;
//       }
//
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//       for (let i = 0; i < points.length; i++) {
//
//         let pt = points[i];
//
//         let begin = false;
//
//         if (ctx.lineWidth != pt.size) {
//           ctx.lineWidth = pt.size;
//           begin = true;
//         }
//         if (ctx.strokeStyle != pt.color) {
//           ctx.strokeStyle = pt.color;
//           begin = true;
//         }
//         if (pt.mode == "begin" || begin) {
//           ctx.beginPath();
//           ctx.moveTo(pt.x, pt.y);
//         }
//         ctx.lineTo(pt.x, pt.y);
//         if (pt.mode == "end" || (i == points.length - 1)) {
//           ctx.stroke();
//         }
//       }
//       ctx.stroke();
//     }
//
//     function undoLast() {
//       points.pop();
//       redrawAll();
//     }
//
//     $("#brush5").click(function () {
//       brushSize = 5;
//     });
//     $("#brush10").click(function () {
//       brushSize = 10;
//     });
//     $("#brushRed").click(function () {
//       brushColor = "#ff0000";
//     });
//     $("#brushBlue").click(function () {
//       brushColor = "#0000ff";
//     });
//
//     let interval;
//     $("#undo").mousedown(function () {
//       interval = setInterval(undoLast, 50);
//     }).mouseup(function () {
//       clearInterval(interval);
//     });;
//   }
}
