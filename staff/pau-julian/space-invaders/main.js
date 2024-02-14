let ship = document.getElementById('ship')
let x = 35
let y = 85
let movingLeft = false;
let movingRight = false;
let movingUp = false;
let movingDown = false;
const movementInterval = 60;

ship.style.left = x + 'vw'
ship.style.top = y + 'vh'

//move ship

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && x > 5)
        movingLeft = true;
    else if (event.key === 'ArrowRight' && x < 85)
        movingRight = true;
    else if (event.key === 'ArrowUp' && y > 70)
        movingUp = true;
    else if (event.key === 'ArrowDown' && y < 90)
        movingDown = true;

    moveShip();
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft')
        movingLeft = false;
    else if (event.key === 'ArrowRight')
        movingRight = false;
    else if (event.key === 'ArrowUp')
        movingUp = false;
    else if (event.key === 'ArrowDown')
        movingDown = false;

    moveShip();
});


function moveShip() {
    if (movingLeft && x > 5) {
        x--;
    }
    if (movingRight && x < 85) {
        x++;
    }
    if (movingUp && y > 70) {
        y--;
    }
    if (movingDown && y < 90) {
        y++;
    }

    ship.style.left = x + 'vw'
    ship.style.top = y + 'vh'

}

setInterval(moveShip, movementInterval);

//fire bullet

let lastTimeBullet = 0;

function fireBullet() {

    const currentTime = new Date().getTime();

    if (currentTime - lastTimeBullet < 1000) {
        return;
    }

    lastTimeBullet = currentTime;

    const bullet = document.createElement('div');
    bullet.classList.add('bullet');

    const shipRect = ship.getBoundingClientRect();
    bullet.style.left = (shipRect.left + shipRect.width / 2.4) + 'px';
    bullet.style.top = shipRect.top + 'px';

    document.body.appendChild(bullet);


    function moveBullet() {
        const bulletRect = bullet.getBoundingClientRect();
        bullet.style.top = (bulletRect.top - 3) + 'px';


        checkCollision(bullet, moveBullet);

        if (bulletRect.top < 0) {
            bullet.remove();
            clearInterval(intervalId);
        }
    }

    const intervalId = setInterval(moveBullet, 50);

}

/*document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        fireBullet();
        checkCollisions();
    }
});
*/



//killing aliens

function checkCollisions() {
    const bullet = document.querySelector('.bullet');
    const aliens = document.querySelectorAll('[class^="alien"]')

    const bulletRect = bullet.getBoundingClientRect();

    aliens.forEach(alien => {
        const alienRect = alien.getBoundingClientRect();

        if (
            bulletRect.top < alienRect.bottom &&
            bulletRect.bottom > alienRect.top &&
            bulletRect.left < alienRect.right &&
            bulletRect.right > alienRect.left
        ) {

            bullet.remove();
            alien.remove();

        }
    });
}

setInterval(checkCollisions, 16);


document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        fireBullet();
    }
});
