// this.http.post('http://dietic.eu-north-1.elasticbeanstalk.com/api/v1/auth/register',JSON.stringify(person),{headers:this.headers}).subscribe((response)=>{
//     console.log(response);
//       this.responseDataRegister = response;
//     if(response =! null){
//       sessionStorage.setItem('email', person.email);
//       sessionStorage.setItem('firstName', person.firstName);
//       sessionStorage.setItem('lastName', person.lastName);
//       console.log(this.responseDataRegister.token);
//       sessionStorage.setItem('token', this.responseDataRegister.token);
//     this.router.navigate(['dashboard']);}
//     });