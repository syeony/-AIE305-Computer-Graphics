let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let xValue = 50;
let yValue = 200;

let boxPts = [];

boxPts.push(new THREE.Vector2(150, 150));
boxPts.push(new THREE.Vector2(350, 350));

boxPts.push(new THREE.Vector2(xValue, yValue));
boxPts.push(new THREE.Vector2(xValue + 50, yValue + 50));

function draw_box(minPt, maxPt, isFill) {
    ctx.beginPath();
    ctx.rect(minPt.x, minPt.y, maxPt.x - minPt.x, maxPt.y - minPt.y);
    if (isFill)
        ctx.fill();
    else
        ctx.stroke();
}

function draw_circle(ctr, rad, isFill) {
    ctx.beginPath();
    ctx.arc(ctr.x, ctr.y, rad,0, 2 * Math.PI);//중심점,반지름,0도부터2파이까지
    if (isFill)
        ctx.fill();//색채워짐
    else
        ctx.stroke();//라인만
}

function draw_image() {
    circleCtr = new THREE.Vector2(250, 250);
    let isFill = false; // 원이 채워졌는지 여부
    if (circle_box_collision(circleCtr, 50, boxPts[2], boxPts[3])) {
        isFill = true;
    }
    
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    draw_box(boxPts[2], boxPts[3], isFill);

    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    draw_circle(circleCtr, 50, isFill);

}

function circle_box_collision(circleCtr, rad, boxMin, boxMax) {
    // 원의 중심과 사각형의 가장 가까운 점 찾기
    let closestX = Math.max(boxMin.x, Math.min(circleCtr.x, boxMax.x));
    let closestY = Math.max(boxMin.y, Math.min(circleCtr.y, boxMax.y));
    // 원의 중심과 가장 가까운 점 간의 거리 계산
    let distanceX = circleCtr.x - closestX;
    let distanceY = circleCtr.y - closestY;
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    // 거리가 반지름보다 작거나 같으면 충돌감지(색 채워짐)
    return distance <= rad;
   }
   
/*function circle_box_collision(circleCtr, rad, boxMin, boxMax) {
    if (
        circleCtr.x + rad > boxMin.x &&
        circleCtr.x - rad < boxMax.x &&
        circleCtr.y + rad > boxMin.y &&
        circleCtr.y - rad < boxMax.y
    ) {
        return true;
    }
    return false;
}*/

//Keyboard Input
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        xValue += 5;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        xValue -= 5;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        yValue -= 5;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        yValue += 5;
    }

    boxPts[2].x = xValue;
    boxPts[3].x = xValue + 50;
    boxPts[2].y = yValue;
    boxPts[3].y = yValue + 50;
}

//Animation Callback
function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
    clear();
    draw_image();
    requestAnimationFrame(update);
}
update();
document.addEventListener('keydown', keyDown);