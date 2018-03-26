// FPS config
var showFps = false;

// Viewport settings
var viewWidth  = 1000;
var viewHeight = 400;

// Physics settings
var acc      = 0.1;
var minSpeed = 0.1;
var maxSpeed = 5;
var particleMinScale = 0.33;
var particleMaxScale = 1;
var numParticles = 1000;

// Colours scheme
var particleColor;
var backgroundColor;

// Particle settings
var particleSWeight  = 2;
var particleLength   = 10;

function Particle() {
    return {
        x: random(0, viewWidth),
        y: random(-2*particleLength, viewHeight),
        dist: random(particleMinScale, particleMaxScale),
        vel: random(minSpeed , maxSpeed),
        reset: function() {
            this.x = random(0, viewWidth),
            this.y = random(-2*particleLength, -particleLength),
            this.dist = random(particleMinScale, particleMaxScale),
            this.vel = random(minSpeed , maxSpeed)
        },
        draw: function() {
            stroke(particleColor);
            strokeWeight(this.dist * particleSWeight);
            line(this.x, this.y, this.x, this.y + this.dist * particleLength);
        },
        update: function() {
            this.y = this.y + this.vel * this.dist;
            if(this.vel < maxSpeed) {
                this.vel += acc;
            }
            if(this.y > viewHeight) {
                this.reset();
            }
        }
    };
}

// Raindrops particles array
var particles = [];

function setup() {
    createCanvas(viewWidth, viewHeight);
    // Setup colours
    particleColor   = color(255);
    backgroundColor = color(125, 15, 150);

    // Spawn particles
    for(var i = 0; i < numParticles; i++) {
        particles[i] = new Particle();
    }
}

function draw() {
    background(backgroundColor);

    for(var p of particles) {
        p.update();
        p.draw();
    }

    if(showFps) {
        textSize(20);
        noStroke();
        fill(255);
        text(round(getFrameRate()), 10, 380, 110, 400);
    }
}