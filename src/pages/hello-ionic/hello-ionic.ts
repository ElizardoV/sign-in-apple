import { Component } from '@angular/core';
declare var cordova: any;
declare var SignInWithApple: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  funciona: string = "";
  constructor() {

  }

  test() {
    //   cordova.plugins.SignInWithApple.signin(
    //   { requestedScopes: [0, 1] },
    //   function(succ){
    //     console.log(succ)
    //     alert(JSON.stringify(succ))
    //   },
    //   function(err){
    //     console.error(err)
    //     console.log(JSON.stringify(err))
    // });

    SignInWithApple.isAvailable().then(function(isAvailable) {
      console.info('isAvailable');




      var options = {
        requestedScopes: [SignInWithApple.Scope.Email, SignInWithApple.Scope.FullName],
        requestedOperation: SignInWithApple.Operation.Login
      }

      if (localStorage.getItem('user')) {

        alert("conseguido");

        SignInWithApple.getCredentialState({
          userId: localStorage.getItem('user'),
        }).then(function(credentialState) {
          alert("getCredentialState")
          alert(JSON.stringify(credentialState));

          if (credentialState == 0) {
            SignInWithApple.request(options).then(function(credential) {

              localStorage.setItem('user', credential.user)
              localStorage.setItem('state', credential.state)

              console.log('login correcto');
              alert("1.2")
              alert(JSON.stringify(credential));
              console.info(credential);
              this.funciona = 'login correcto';
            })
          } else {
            alert("existe");
          }



        });


      } else {
        SignInWithApple.request(options).then(function(credential) {
          console.log('login correcto');
          localStorage.setItem('user', credential.user)
          localStorage.setItem('state', credential.state)
          alert("1.1")
          alert(JSON.stringify(credential));
          console.info(credential);
          this.funciona = 'login correcto';
        })
      }





    })


  }
}
