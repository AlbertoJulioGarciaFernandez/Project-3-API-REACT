CREATE TABLE `classrooms` (
  `id` integer PRIMARY KEY,
  `classroomName` nvarchar(255),
  `capacity` integer,
  `idBuilding` integer,
  `aimedAt` enum
);

CREATE TABLE `bookings` (
  `id` integer PRIMARY KEY,
  `bookingDate` date,
  `bookingTime` nvarchar(255),
  `idUser` integer,
  `idClassroom` integer
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `firstName` nvarchar(255),
  `lastName` nvarchar(255),
  `address` nvarchar(255),
  `email` nvarchar(255),
  `password` nvarchar(255),
  `role` enum
);

CREATE TABLE `buildings` (
  `id` integer PRIMARY KEY,
  `buildingName` nvarchar(255),
  `address` nvarchar(255),
  `phoneNumber` nvarchar(255),
  `providedServices` nvarchar(255),
  `buildingManagerId` integer
);

CREATE TABLE `equipments` (
  `id` integer PRIMARY KEY,
  `equipmentName` nvarchar(255),
  `description` nvarchar(255)
);

CREATE TABLE `classroomsEquipments` (
  `idClassroom` integer,
  `idEquipment` integer,
  `quantity` integer,
  PRIMARY KEY (`idClassroom`, `idEquipment`)
);

ALTER TABLE `classrooms` ADD FOREIGN KEY (`idBuilding`) REFERENCES `buildings` (`id`);

ALTER TABLE `classroomsEquipments` ADD FOREIGN KEY (`idClassroom`) REFERENCES `classrooms` (`id`);

ALTER TABLE `classroomsEquipments` ADD FOREIGN KEY (`idEquipment`) REFERENCES `equipments` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `buildings` (`buildingManagerId`);

ALTER TABLE `bookings` ADD FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

ALTER TABLE `bookings` ADD FOREIGN KEY (`idClassroom`) REFERENCES `classrooms` (`id`);
