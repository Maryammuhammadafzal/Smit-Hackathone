import {
        db,
        collection,
        addDoc,
        getDocs,
        doc,
        setDoc,
        Timestamp
} from "./firebase.js"

let uid = localStorage.getItem('uid')

let started = document.getElementById('started')
started.addEventListener('click', () => {
        window.location.href = "./Login-Form/login.html"
})

console.log(new Date().toLocaleString());


const currentDate = new Date();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day = currentDate.getDate(); 
const month = monthNames[currentDate.getMonth()]; 
const formattedDate = `${month} ${day}`;




//  ----------Dom Elements-----------------
let modal = document.getElementById('modal')
let modalTitle = document.getElementById('modalTitle')
let modalDis = document.getElementById('modalDis')
let modalFile = document.getElementById('modalFile')


let blogTime = document.getElementById('blogTime')
let blogTitle = document.getElementById('blogTitle')
let blogDis = document.getElementById('blogDis')
let blogImage = document.getElementById('blogImage')
const blogCategory = document.getElementById("blogCategory").value

let blogBox = document.getElementById("blogBox")


// // Cloudinary
// const cloudName = "diq2krkmt";
// const unsignedUploadPreset = "oibcek4o";
// let imgUrl;
// let uploadImage = ()=>{
// modalFile.addEventListener("change", () => {
//   let file = modalFile.files[0];
//   let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
//   let fd = new FormData();
//   fd.append("upload_preset", unsignedUploadPreset);
//   fd.append("file", file);

//   fetch(url, {
//     method: "POST",
//     body: fd,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       let resourceURl = data.secure_url;

//       let transformedUrl = resourceURl.replace(
//         "upload/",
//         "upload/h_200,w_200/r_max/c_crop,g_face"
//       );
//       console.log("uploaded succesfully", resourceURl);
//       imgUrl = resourceURl;
        
//     })
//     .catch((e) => {
//       console.log(e);
//     });
 
// });
// }
// uploadImage()


//  modal
// Close Modal When Clicking Outside of Modal Content
window.addEventListener('click', event => {
        if (event.target === modal) {
                modal.style.display = 'none' // Hide modal
        }
})
// Close Modal When Clicking on close button
window.closeModal = document.getElementById('closeModal').addEventListener('click', () => {
        postContainer.style.display = 'none'
})




const categories = ["Ai" , "Technology" , "Design"] 
async function fetchAllBlogs() {
  const blogs = [];
  
  try {
    for (const category of categories) {
      const categoryCollection = collection(db, category); 
      const querySnapshot = await getDocs(categoryCollection); 
      
      querySnapshot.forEach((doc) => {
        blogs.push({ ...doc.data(), category, id: doc.id }); 
      });
    }

    displayBlogs(blogs);
  } catch (error) {
    console.error("Error fetching blogs: ", error);
  }
}

// Function to display blogs on the page
function displayBlogs(blogs) {


  blogs.forEach((blog) => {
   

    blogBox.innerHTML += `
      <div class="card d-flex flex-row">
                                <div class="card-body">
                                        <div class="card-header" id="blogTime">${blog.time}</div>
                                  <h5 class="card-title" id="blogTitle">${blog.usertitle}</h5>
                                  <p class="card-text" id="blogDis">${blog.discription}.</p>
                                </div>
                                <div class="cardImage w-50" style="height: 300px;">
                                        <img src="./Images/logo.jpg" id="blogImage" alt="Card image cap" style="height: 300px; width: 100%;">
                                </div>
                              </div>
    `;
   
  });

}


        fetchAllBlogs(); 
   
console.log(blogBox.innerHTML);










let createBlogBtn = document.getElementById('createBlog')
let createBlog = () => {
        modal.style.display = 'flex'

        ///---------------------Firebase Database work ----------------//
        let addData = async() => {
                window.submitBlog = document.getElementById('submitBlog')
                window.submitBlog.addEventListener('click', async() => {
                        try {
                                const userRef = doc(db, blogCategory, uid); 
                                await setDoc(userRef, {
                                        usertitle: modalTitle.value,
                                        discription: modalDis.value,
                                        time : formattedDate,
                                });
                            
                                   //Succesfully creat post
                                   const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: toast => {
                                                toast.onmouseenter = Swal.stopTimer
                                                toast.onmouseleave = Swal.resumeTimer
                                        }
                                })
                                Toast.fire({
                                        icon: 'success',
                                        title: 'Post Created Successfully'
                                })

                                modal.style.display = 'none'
                                
                                modalTitle = ""
                                modalDis = ""
                                modalFile = ""
                                

                              } catch (error) {
                                console.error("Error adding user: ", error);
                                Swal.fire({
                                        title: 'Error',
                                        text: 'Unsuccessful',
                                        icon: 'error'
                                })
                              }
                })
        }

        addData()

}
createBlogBtn && createBlogBtn.addEventListener('click', createBlog)

   
