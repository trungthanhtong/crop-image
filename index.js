let currentX, currentY, offsetLeft, offsetTop;
let previousX, previousY;


const resizeImg = () => {
    const image = document.querySelector("#img");
    const width = image.clientWidth;
    const height = image.clientHeight;
    if (height > width) {
        image.style.width = "100%";
    } else {
        image.style.height = "100%";
    }
};

// const relocateImage = () => {
//     const image = document.querySelector("#img");
//     const imageRect = image.getBoundingClientRect();
//     const imageTop = imageRect.y;
//     const imageLeft = imageRect.x;
//     const imageBottom = imageTop + imageRect.height;
//     const imageRight = imageLeft + imageRect.width;

//     const cropCircle = document.querySelector(".crop-circle");
//     const cropCircleRect = cropCircle.getBoundingClientRect();
//     const top = cropCircleRect.y;
//     const left = cropCircleRect.x;
//     const right = left + cropCircleRect.width;
//     const bottom = top + cropCircleRect.height;

//     let x = 0;
//     let y = 0;

//     console.log("circle", top, bottom, left, right);
//     console.log("img", imageTop, imageLeft, imageLeft, imageRight);

//     if (imageTop > top) {
//         y = Math.round(top - imageTop);
//     }
//     // if (imageBottom > bottom) {
//     //     y = Math.round(bottom - imageBottom);
//     // }
//     // if (imageLeft > left) {
//     //     x = Math.round(left - imageLeft);
//     // }
//     // if (imageRight < right) {
//     //     x = Math.round(right - imageRight);
//     // }

//     image.style.transform = `translate(${x}px, ${y}px)`;
// };

const zoomInAndOut = (event) => {
    const scale = Number(event.value) / 100;
    const imageContainer = document.querySelector(".img-container");
    imageContainer.style.transform = `scale(${scale})`;


    // relocateImage()

    // console.log(imageTop, imageRight)
};

const mouseUp = () => {
    const image = document.querySelector("#img");
    image.style.removeProperty("transform");
    image.style.left = offsetLeft + "px";
    image.style.top = offsetTop + "px";
    window.removeEventListener("mousemove", moveImage, true);
};

const mouseDown = (e) => {
    currentX = e.clientX;
    currentY = e.clientY;

    window.addEventListener("mousemove", moveImage, true);
};

const moveImage = (e) => {
    const cropCircle = document.querySelector(".crop-circle");
    const cropCircleRect = cropCircle.getBoundingClientRect();
    const top = cropCircleRect.y;
    const left = cropCircleRect.x;
    const right = left + cropCircleRect.width;
    const bottom = top + cropCircleRect.height;

    let x = e.clientX - currentX;
    let y = e.clientY - currentY;

    const image = document.querySelector("#img");
    const imageRect = image.getBoundingClientRect();
    const imageLeft = imageRect.x;
    const imageTop = imageRect.y;
    const imageBottom = imageTop + imageRect.height;
    const imageRight = imageLeft + imageRect.width;

    if (imageTop >= top && y - previousY > 0) {
        y = previousY;
    }

    if (imageBottom <= bottom && previousY - y > 0) {
        y = previousY;
    }

    if (imageLeft >= left && x - previousX > 0) {
        x = previousX;
    }

    if (imageRight <= right && previousX - x > 0) {
        x = previousX;
    }

    offsetLeft = image.offsetLeft + x;
    offsetTop = image.offsetTop + y;

    image.style.position = "absolute";
    image.style.transform = `translate(${x}px, ${y}px)`;

    previousX = x;
    previousY = y;
};

const addListeners = () => {
    document
        .querySelector("#img")
        .addEventListener("mousedown", mouseDown, false);
    window.addEventListener("mouseup", mouseUp, false);
};

addListeners();

const getData = () => {
    const image = document.querySelector("#img");
    const imageRect = image.getBoundingClientRect();
    const imageNaturalWidth = image.naturalWidth;
    console.log(imageRect);

    const cropCircle = document.querySelector(".crop-circle");
    const cropCircleRect = cropCircle.getBoundingClientRect();
    console.log(cropCircleRect);

    const ratio = imageNaturalWidth / imageRect.width;

    const left = (cropCircleRect.left - imageRect.left) * ratio;
    const top = (cropCircleRect.top - imageRect.top) * ratio;
    const bottom = top + cropCircleRect.height * ratio;
    const right = left + cropCircleRect.width * ratio;
    console.log(top, left, bottom, right);


    const canvas = document.querySelector(".test canvas");
    const ctx = canvas.getContext("2d");
    const length = right - left;
    
    
    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, 300, 300);
        ctx.beginPath();
        ctx.drawImage(
            img,
            left, top,
            length, length,
            0, 0,
            500, 500
        );
    };

    img.src = image.src;

    const img1 = canvas.toDataURL("image/png");

    const show = document.querySelector('.show');


    show.innerHTML = ('<img src="'+img1+'"/>');

    
    console.log(img1)
};

window.addEventListener("load", () => {
    getData();
});
