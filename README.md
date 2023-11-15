# Project-3-API-REACT

**Team**:
Aitor, Yeray and Alberto.

**Project Idea**:
The idea for the creation of this API came up from the need any school institution or, as in our particular case, any university, has to keep a record of all its students, professors, classrooms, and all the equipment involved. However, the thing which triggered the inspiration for this project was the fact of fulfilling the need teachers/professors and students may have when it comes to booking a classroom for a particular occasion, be it teaching, studying or giving a lecture. Each classroom has their particular equipment and will be addressed to professors or students, who will be able to book them if their role matches the one the classroom has.

Another point that needs to be mentioned is the fact that the API also manages the buildings/faculties the university includes such as Engineering, Architecture, Maths, etc. —these can only be managed by one person, being a requirement having the role of building administrator to be able to do so—.

**Roles**: 
There are four roles involved:
- API Administrator (admin)
- Building Administrator (buildingAdmin)
- Professor (professor)
- Student (student)

The difference between them lays on the fact that an API Administrator will have full permissions (this means, they are able to view, create, update and delete information from all tables).
There is no remarkable difference between the rest of the roles apart from the fact that a building can only be assigned a person who actually is a building administrator, a professor can make classroom reservations as long as the class they are interested in is aimed at professors and the same for students.

**Tables**:
Our database needed six tables, being one of them the result of the many to many relation between other two tables:
Bookings
Buildings
Classrooms
Equipments
Classrooms-Equipments (resulting table from the many to many relation between Classrooms and Equipments)
Users

**Relationships between tables**:

One to one:
Buildings and Users

One to many:
Buildings and Classrooms
Classrooms and Bookings
Users and Bookings
Classrooms  and Classrooms-Equipments
Equipment and Classrooms-Equipments

Many to many:
Classrooms and Equipments

**Authentication Endpoints**
The Authentication flow for the application is:

![Alt text](image.png)

### Auth Endpoints

| METHOD | ENDPOINT                  | TOKEN | ROLE     | DESCRIPTION                   | POST PARAMS                | RETURNS                                                 |
| ------ | ------------------------- | ----- | -------- | ----------------------------- | -------------------------- | ------------------------------------------------------  |
| POST   | /signup                   | NO    | Student  | Signup User                   | req.body                   | {"Equipment created", equipment }                       |
| POST   | /login                    | NO    | Student  | Create User                   | req.body                   | {"User successfully created!", user, token}             |


### Users Endpoints

| METHOD | ENDPOINT                  | TOKEN | ROLE     | DESCRIPTION                  | POST PARAMS                | RETURNS                                                 |
| ------ | ------------------------- | ----- | -------- | ---------------------------- | -------------------------- | ------------------------------------------------------  |
| GET    | /user                     | YES   | Admin    | Get all users                | -                          | [{ user }]                                              |
| GET    | /user/getProfile          | YES   | Student  | Get user profile             | -                          | { user }                                                |
| GET    | /user/:id                 | YES   | Admin    | Get One User                 | user_id                    | { user }                                                |
| POST   | /user                     | YES   | Admin    | Create One User              | req.body                   | {"User successfully created!", user }                   |
| PUT    | /user/updateProfile       | YES   | Student  | Update user                  | member_id                  | "User successfully updated!"                            |
| PUT    | /user/updatePassword      | YES   | Student  | Update Password User         | req.body                   | {"Your password has been successfully updated!", token} |
| PUT    | /user/:id                 | YES   | Admin    | Update user                  | user_id                    | "User successfully updated!"                            |
| DELETE | /user/:id                 | YES   | Admin    | Remove one user              | user_id                    | {'User successfully deleted!', user}                    |


### Buildings Endpoints

| METHOD | ENDPOINT                  | TOKEN | ROLE     | DESCRIPTION                  | POST PARAMS                | RETURNS                                                 |
| ------ | ------------------------- | ----- | -------- | ---------------------------- | -------------------------- | ------------------------------------------------------  |
| GET    | /buildings                | YES   | Admin    | Get all Buildings            | -                          | [{ building }]                                          |
| GET    | /building/:id             | YES   | Admin    | Get One building             | building_id                | { building }                                            |
| POST   | /building                 | YES   | Admin    | Create One building          | req.body                   | {"Building successfully created!", building }           |
| PUT    | /building/:id             | YES   | Admin    | Update building              | building_id                | "Building successfully updated!"                        |
| DELETE | /building/:id             | YES   | Admin    | Remove one building          | building_id                | {"Building successfuly deleted!", building}             |


### Classrooms Endpoints

| METHOD | ENDPOINT                  | TOKEN | ROLE     | DESCRIPTION                   | POST PARAMS                | RETURNS                                                 |
| ------ | ------------------------- | ----- | -------- | ----------------------------- | -------------------------- | ------------------------------------------------------  |
| GET    | /classroom                | YES   | Admin    | Get All Classrooms            | -                          | [{ classroom }]                                         |
| GET    | /classroom/:id            | YES   | Admin    | Get One Classroom             | classroom_id               | { classroom }                                           |
| POST   | /classroom                | YES   | Admin    | Create One Classroom          | req.body                   | {"Classroom created", classroom }                       |
| PUT    | /classroom/:id            | YES   | Admin    | Update Classroom              | classroom_id               | "Classroom updated"                                     |
| DELETE | /classroom/:id            | YES   | Admin    | Remove one Classroom          | classroom_id               | "Classroom deleted"                                     |


### Equipment Endpoints

| METHOD | ENDPOINT                  | TOKEN | ROLE     | DESCRIPTION                   | POST PARAMS                | RETURNS                                                 |
| ------ | ------------------------- | ----- | -------- | ----------------------------- | -------------------------- | ------------------------------------------------------  |
| GET    | /equipment                | YES   | Admin    | Get All Equipment             | -                          | [{ equipment }]                                         |
| GET    | /equipment/:id            | YES   | Admin    | Get One Equipment             | equipment_id               | { equipment }                                           |
| POST   | /equipment                | YES   | Admin    | Create One Equipment          | req.body                   | {"Equipment created", equipment }                       |
| PUT    | /equipment/:id            | YES   | Admin    | Update Equipment              | equipment_id               | {"Equipment updated", equipment }                       |
| DELETE | /equipment/:id            | YES   | Admin    | Remove one Equipment          | equipment_id               | "Equipment deleted"                                     |


### Classroom-Equipment Endpoints

| METHOD | ENDPOINT                                               | TOKEN | ROLE     | DESCRIPTION                        | POST/QUERY PARAMS          | RETURNS                                                 |
| ------ | ------------------------------------------------------ | ----- | -------- | ---------------------------------- | -------------------------- | ------------------------------------------------------  |
| GET    | /classroom_equipment                                   | YES   | Admin    | Get All Classroom_equipment        | -                          | [{ Classroom_equipment }]                               |
| GET    | /classroom_equipment?idClassroom=classroomId           | YES   | Admin    | Get One Classroom equipment        | query params               | [{ Classroom_equipment }]                               |
| GET    | /classroom_equipment?idEquipment=equipmentId           | YES   | Admin    | Get Equipment Classroom            | query params               | [{ Classroom_equipment }]                               |
| POST   | /classroom_equipment                                   | YES   | Admin    | Create One Classroom_equipment     | post (req.body)            | {"Classroom_equipment created", Classroom_equipment }   |
| DELETE | /classroom_equipment/idClassroom/:id/idEquipment/:id   | YES   | Admin    | Remove one Classroom_equipment     | equipment_id/classroom_id  | "Classroom_equipment deleted"                           |

### Bookings Endpoints

| METHOD | ENDPOINT                  | TOKEN | ROLE     | DESCRIPTION                   | POST PARAMS                | RETURNS                                                            |
| ------ | ------------------------- | ----- | -------- | ----------------------------- | -------------------------- | ------------------------------------------------------  |
| GET    | /booking                | YES   | Admin    | Get All Bookings                | -                          | [{ bookings }]                                         |
| GET    | /booking/:id            | YES   | Admin    | Get One Booking                 | booking_id                 | { booking }                                           |
| GET    | /booking/getMyBookings  | YES   | Student    | Get User Bookings             | - (locals.user.id)         | { message: 'This/These is/are your booking/s', bookings: [{booking}] } |
| POST   | /booking/:id                | YES   | Admin    | Create One Booking              | user_id                   | { message: 'Booking successfully created!', booking: booking }                       |
| POST   | /booking                | YES   | Student   | Create One Booking              | req.body                   | { message: 'Booking successfully created!', booking: booking }               |
| PUT    | /booking/:id            | YES   | Admin    | Update Booking                  | booking_id               | { message: 'Booking updated', booking: booking }                       |
| PUT    | /booking/updateMyBooking/:id            | YES   | Student    | Update Booking                  | booking_id               | "Your booking has been successfully updated!"                     |
| DELETE | /booking/:id            | YES   | Admin    | Remove one Booking              | booking_id               | "Booking deleted"                                     |
| DELETE | /booking/deleteMyBooking/:id            | YES   | Student    | Remove one User Booking              | booking_id               | "Booking deleted"                                     |
| DELETE | /booking/deleteBookings?startdate=startDate&enddate=endDate           | YES   | Admin    | Remove Bookings in a date range              | query params               | "Booking's deleted"                                     |
