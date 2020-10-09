class PerkingArea {
    constructor() {
        this.name = 'Stasiun Manggarai';
        this.MAX_AREA = 50;
        this.availableArea = this.MAX_AREA;
        this.CAR_PARKING_FEE = 5000;
        this.MOTOR_PARKING_FEE = 2000;
        this._cash = 0;
        this.parkedList = [];
    }

    set cash(value) {
        this._cash = value
    }

    isParkingAvailable(vehicle) {
        return this.availableArea > vehicle.PARKING_SIZE_AREA
    }

    isTheVehicleParked(vehicle) {
        return parkingArea.parkedList.indexOf(vehicle) >= 0
    }

    deleteVehichleList(vehicle) {
        parkingArea.parkedList = parkingArea.parkedList.filter((item) => item !== vehicle);
    }

    calcParkingFee(vehicle) {
        let ONE_HOUR_ASSUMPTION = 3000; // 3000 milisecond
        let parkingTime = parseInt(Math.abs((new Date - vehicle._parkingTicket.entryTime)) / ONE_HOUR_ASSUMPTION);
        if (vehicle instanceof Car) return this.CAR_PARKING_FEE * parkingTime
        if (vehicle instanceof MotorCycle) return this.MOTOR_PARKING_FEE * parkingTime
    }

    sayHello() {
        console.log(
            `Selamat datang di Parking Area ${this.name}
            biaya parkir mobil adalah Rp${this.CAR_PARKING_FEE}/jam
            biaya parkir motor adalah Rp${this.MOTOR_PARKING_FEE}/jam`);
    }
}

class ParkingMachine {
    constructor(id) {
        this.machineId = id;
        this.cash = 0;
        this.lastTicketNumber = 100;
    }

    getTicket() {
        this.lastTicketNumber++
        return `${this.id}${this.lastTicketNumber}`

    }

    vehicleIn(vehicle) {
        if (parkingArea.isTheVehicleParked(vehicle)) return `${vehicle.name} telah parkir sebelumnya`
        if (!parkingArea.isParkingAvailable(vehicle)) return `parkiran penuh`;
        parkingArea.parkedList.push(vehicle);
        parkingArea.availableArea -= vehicle.PARKING_SIZE_AREA;
        this.lastTicketNumber++;
        let newTicket = `${this.machineId}${this.lastTicketNumber}`
        vehicle.parkingTicket = {
            entryTime: new Date(),
            ticketNumber: newTicket
        }
        return `nomor tiket ${vehicle.name} adalah ${newTicket}`
    }

    vehicleOut(vehicle) {
        if (!parkingArea.isTheVehicleParked(vehicle)) return `${vehicle.name} tidak parkir disini`
        parkingArea.deleteVehichleList(vehicle);
        parkingArea.availableArea += vehicle.PARKING_SIZE_AREA;
        let parkingFee = parkingArea.calcParkingFee(vehicle);
        this.cash += parkingFee;
        vehicle.parkingTicket = {
            entryTime: null,
            ticketNumber: null
        }

        return `Biaya parkir ${vehicle.name} adalah Rp${parkingFee}`;
    }
}

class Vehicle {
    constructor(name) {
        this.name = name;
        this.parkingSizeArea;
        this._parkingTicket;
    }

    set parkingTicket(value) {
        this._parkingTicket = value
    }

    get parkingTicket() {
        return this._parkingTicket
    }
}

class Car extends Vehicle {
    constructor(name) {
        super(name);
        this.PARKING_SIZE_AREA = 20;
    }
}

class MotorCycle extends Vehicle {
    constructor(name) {
        super(name);
        this.PARKING_SIZE_AREA = 5;
    }
}

let parkingArea = new PerkingArea();
let parkMachineA = new ParkingMachine('A');
let parkMachineB = new ParkingMachine('B');
let motorCycle1 = new MotorCycle('Honda Blade');
let motorCycle2 = new MotorCycle('Yamaha Mio');
let motorCycle3 = new MotorCycle('Suzuki Thunder');
let car1 = new Car('Toyota Avanza');
let car2 = new Car('Suzuki Ertiga');
let car3 = new Car('Honda Jazz');



























// class Person {
//     constructor(name, gender, origin) {
//         this.name = name;
//         this.gender = gender;
//         this.origin = origin;
//     }
//     sayHello() {
//         console.log(
//             `Hallo nama saya ${this.name} saya berasal dari ${this.origin}`
//         );
//     }
// }

// class Admin extends Person {
//     constructor(name, gender, origin) {
//         super(name, gender, origin);
//     }

//     sayHello() {
//         console.log(`Hallo saya ${this.name}. Mau booking kamar hotel? `);
//     }

//     checkInVisitor(visitor, room) {
//         if (!room.reservationStatus) {
//             visitor.bookedRoom.push(room);
//             room.setReservationStatus(true);
//             console.log(visitor);
//             // console.log(room);
//         } else {
//             console.log("Kamar sudah di booking orang lain");
//         }
//     }

//     checkOutVisitor(visitor, room) {
//         let findIndexOfTheRoom = visitor.bookedRoom.indexOf(room);
//         if (findIndexOfTheRoom >= 0) {
//             visitor.bookedRoom.remove(findIndexOfTheRoom);
//             room.setReservationStatus(false);
//             console.log(visitor);
//         } else {
//             console.log(
//                 `Kamar nomor ${room.roomID} belum dibooking sebelumnya`
//             );
//         }
//     }
// }

// class Visitor extends Person {
//     constructor(name, gender, origin) {
//         super(name, gender, origin);
//         this.bookedRoom = [];
//     }
// }

// class Room {
//     constructor(roomID) {
//         this.roomID = roomID;
//         this.reservationStatus = false;
//     }
//     setReservationStatus(value) {
//         this.reservationStatus = value;
//     }
// }

// class RoomType1 extends Room {
//     constructor(roomID) {
//         super(roomID);
//         this.price = 300000;
//         this.amenities = [
//             "King Bed",
//             "WiFi",
//             "AC",
//             "TV",
//             "Kitchen",
//             "Free Parking",
//         ];
//     }
// }

// class RoomType2 extends Room {
//     constructor(roomID) {
//         super(roomID);
//         this.price = 200000;
//         this.amenities = ["Queen Bed", "WiFi", "AC", "TV"];
//     }
// }

// // Array Remove - By John Resig (MIT Licensed)
// Array.prototype.remove = function (from, to) {
//     var rest = this.slice((to || from) + 1 || this.length);
//     this.length = from < 0 ? this.length + from : from;
//     return this.push.apply(this, rest);
// };

// let putri = new Admin("Putri", "Perempuan", "Jogja");
// let rafi = new Visitor("Rafi", "Laki-laki", "Padang");
// let alfian = new Visitor("Alfian", "Laki-laki", "Bandung");

// let room1 = new RoomType1(1);
// let room2 = new RoomType1(2);
// let room3 = new RoomType2(3);
// let room4 = new RoomType2(4);

// putri.sayHello()