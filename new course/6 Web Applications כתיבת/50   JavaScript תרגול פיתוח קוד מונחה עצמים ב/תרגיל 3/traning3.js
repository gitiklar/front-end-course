class Car {
    constructor(color, speed=0) {
      this.color = color;
      this.speed = speed;
    }
  
    drive(speed) {
      this.speed = speed;
    }
  
    isFasterThan(other) {
      return this.speed > other.speed;
    }
  }

  class Race {
      constructor() {
          this.arrOFCars = [];
      }
      
      addCars(...arrOFCars) {
          arrOFCars.forEach(car => {
              this.arrOFCars.push(car);
          });
      }

      winner() {
          return this.arrOFCars.reduce((car1,car2)=>car1.speed>car2.speed? car1:car2);
      }
  }
  
  const c1 = new Car('red');
  const c2 = new Car('blue', 50);
  const c3 = new Car('black');
  
  const race = new Race();
  race.addCars(c1, c2, c3);
  
  const c4 = new Car('yellow', 60);

  race.addCars(c4);
  
  c1.drive(20);
  c3.drive(10);
  c1.drive(80);
  c3.drive(100);
  
  var winningCar = race.winner();
  console.log('And the winner is: ' + winningCar.color);