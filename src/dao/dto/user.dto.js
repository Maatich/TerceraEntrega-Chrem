export class CreateCurrentUserDto {
    constructor(currentUser){
        this.nombre = currentUser.first_name;
        this.apellido = currentUser.last_name;
        this.email = currentUser.email;
        this.role = currentUser.role;
    }  
}

export class GetCurrentUserDto{
    constructor(currentUser){
        this.nombre = currentUser.nombre + ' ' + currentUser.apellido;
        this.email = currentUser.email;
        this.age = currentUser.age;
        this.role = currentUser.role;
    }
}