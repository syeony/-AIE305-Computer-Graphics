let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let circleData = { center: new THREE.Vector2(375, 375), radius: 50 };

let redSet = new Set(); //중복을 허용하지 않는 array

//Get mouse position
function get_mouse_position(c, e) {
    var rect = c.getBoundingClientRect();
    return {
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top)
    };
}

//Add event lisnter
c.addEventListener("mousemove", function(e) {
    var mousePos = get_mouse_position(c,e);
    circleData.center.x = mousePos.x;
    circleData.center.y = mousePos.y;

    if(check){
        for (i = 0; i <= 750; i += 10) {
            for (j = 0; j <= 750; j += 10) {
                let pt = new THREE.Vector2(i, j);
                if (is_pt_inside_circle(pt, circleData))
                    redSet.add(pt.x.toString()+','+pt.y.toString());
            }
        }
    }
})
c.addEventListener("mousedown", function(e) {
    var mousePos = get_mouse_position(c,e);
    console.log("mousedown",mousePos.x,mousePos.y)
    check=true;
})
c.addEventListener("mouseup", function(e) {
    var mousePos = get_mouse_position(c,e);
    console.log("mousedown",mousePos.x,mousePos.y)
    check=false;
})
c.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
      circleData.radius += 1;
    } 
    else {
      circleData.radius -= 1;
      if(circleData.radius<0){
        circleData.radius=0;
      }
    }
  });

//Draw Funcitons
function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
    clear();
    draw_image();
    requestAnimationFrame(update);
}
update();

function draw_image()
{
    ctx.strokeStyle="red";
    draw_circle(circleData);

    ctx.strokeStyle="black";
    draw_sample_point();
}

function draw_sample_point() {
    for (i = 0; i <= 750; i += 10) {
        for (j = 0; j <= 750; j += 10) {
            let pt = new THREE.Vector2(i, j);
            let color = '';
            let size = 0;

            if (is_pt_inside_circle(pt, circleData) || redSet.has(pt.x.toString()+','+pt.y.toString())) {
                color = "#ff0000";
                size = 2;
                if(i%20==0){
                    color="#00ff00";
                }
            }
            else{
                color = 'black';
                size = 1;
            }
            draw_point(pt, color, size);
        }
    }
}

function draw_point(pt, color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, size, 0, 2 * Math.PI);
    ctx.fill();
}

function draw_circle(data) {
    ctx.beginPath();
    ctx.arc(data.center.x, data.center.y, data.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function is_pt_inside_circle(pt, circle) {
    return pt.distanceTo(circle.center) <= circle.radius;
}