
//--------------- Importing -----------------------------//
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail 
  
} from "../../firebase.js"

//--------------- Dom Inputs-----------------------------//
let loginEmail = document.getElementById('loginEmail')
let loginPassword = document.getElementById('loginPassword')
//-----------------login Button ---------------------//
let loginBtn = document.getElementById('loginBtn')
let signupLink = document.getElementById("signupLink")
let googleBtn = document.getElementById('googleBtn')
let forgetPass = document.getElementById('forgetPass')


//------------------GO To Sinup page Finction --------------------//
let gotoSinupPage = () => {
  window.location.href = '../Signup-form/signup.html'
}
signupLink && signupLink.addEventListener('Click' , gotoSinupPage)

//------------------login Finction --------------------//
let login = () => {


  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      //Succesfully signed in
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Login successfully",
      });
      // redirect to dashboard
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          // page redirection
          setTimeout(() => {
            window.location.href = "../../index.html"
          }, 1000)
          // ...
        }
      })

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;


      // Switch statements on error
      switch (errorCode) {
        case 'auth/missing-email':
          //  if email is empty Email
          Swal.fire({
            icon: "error",
            title: "Null",
            text: "Email is required",
          });

          break;

        case 'auth/invalid-email':
          //  if email is empty Email
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Email is Incorrect",
          });


          signupEmail.classList += ' border-red';

          break;

        case 'auth/missing-password':
          //  if passwordis empty 
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Password is required",
          });


          signupPassword.classList += ' border-red';

          break;

        default:
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${errorCode}`,
          });
          break;
      }


    });
  ;
}


//---------------------Signin with popup -----------------//

let googleSignIn = () => {

  signInWithPopup(auth, provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // redirect to dashboard
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          // page redirection
          setTimeout(() => {
            window.location.href = "../../index.htm"
          }, 1000)
        }
      });
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);

    });

}


// ----------------------------Forget Password----------------------//
let forgetPassword = () => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
     //Succesfully signed in
     const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Login successfully",
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `${errorMessage}`,
    });
  });
  }

//---------------------Event Listener -----------------//
loginBtn.addEventListener('click', login)
signupLink.addEventListener('click', gotoSinupPage)
googleBtn.addEventListener('click', googleSignIn)
forgetPass.addEventListener('click', forgetPassword)


