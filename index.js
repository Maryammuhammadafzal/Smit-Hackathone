import {
        db,
        collection,
        addDoc,
        getDocs,
        doc,
        setDoc,
        Timestamp,
        deleteDoc,
        get,
        set,
        ref, child, update, remove, onValue,
        getDatabase
} from "./firebase.js";

let uid = localStorage.getItem("uid");




let started = document.getElementById("started");
started.addEventListener("click", () => {
        window.location.href = "./public/Login-Form/login.html";
});

// console.log(new Date().toLocaleString());

const currentDate = new Date();
const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
];
const day = currentDate.getDate();
const month = monthNames[currentDate.getMonth()];
const formattedDate = `${month} ${day}`;

//  ----------Dom Elements-----------------
let modal = document.getElementById("modal");
let modalTitle = document.getElementById("modalTitle");
let modalDis = document.getElementById("modalDis");
let modalFile = document.getElementById("modalFile");

let blogTime = document.getElementById("blogTime");
let blogTitle = document.getElementById("blogTitle");
let blogDis = document.getElementById("blogDis");
let blogImage = document.getElementById("blogImage");

let blogBox = document.getElementById("blogBox");

//  modal
// Close Modal When Clicking Outside of Modal Content
window.addEventListener("click", (event) => {
        if (event.target === modal) {
                modal.style.display = "none"; // Hide modal
        }
});
// Close Modal When Clicking on close button
window.closeModal = document
        .getElementById("closeModal")
        .addEventListener("click", () => {
                postContainer.style.display = "none";
        });


const categories = ["Ai", "Technology", "Design"];
const categorySelect = document.getElementById("blogCategory");
let selectedCategory = "";
categorySelect.addEventListener("change", () => {
        selectedCategory = categorySelect.value;
        console.log("Inside event listener:", selectedCategory);
});

console.log("Outside event listener:", selectedCategory);

const blogContainer = document.getElementById('blogBox'); 

// Function to fetch and display blog posts
const displayBlogs = async () => {
        try {
          const blogContainer = document.getElementById('blogBox'); // Container where blogs will be displayed
          blogContainer.innerHTML = ''; // Clear any existing content
      
          // Query all blog posts (assuming 'blog' is a collection or a subcollection of posts)
          const querySnapshot = await getDocs(collection(db, 'blog'));  // Replace 'blog' with your actual collection name
      
          querySnapshot.forEach((doc) => {
            const postData = doc.data(); // Get data for each post
            const postDiv = document.createElement('div');
            postDiv.classList.add('post'); // Add some class for styling
      
            // Construct the HTML for the post
            postDiv.innerHTML = `
              <h3>${postData.usertitle}</h3>
              <p>${postData.description}</p>
              <p><small>Published: ${new Date(postData.time).toLocaleString()}</small></p>
              <p><small>Category: ${postData.category}</small></p>
              <button id="delete" onclick="deletePost('${uid}')">Delete Post</button>
            `;
      
            // Append the post to the container
            blogContainer.appendChild(postDiv);
          });
      
        } catch (error) {
          console.error('Error fetching blog posts: ', error);
        }
      };
      
      // Call displayBlogs to load posts
      displayBlogs();


let createBlogBtn = document.getElementById("createBlog");
let createBlog = () => {
        modal.style.display = "flex";

        // Firebase Database work
        let addData = async () => {
                try {
                        submitBlog.addEventListener("click", async () => {
                                if (!modalTitle.value || !modalDis.value || !selectedCategory) {
                                        Swal.fire({
                                                title: "Error",
                                                text: "All fields are required",
                                                icon: "error",
                                        });
                                        return;
                                } else {
                                        try {
                                                await setDoc(doc(db, `blog/${selectedCategory}${uid}`), {
                                                        usertitle: modalTitle.value,
                                                        description: modalDis.value,
                                                        time: formattedDate,
                                                        category: selectedCategory,
                                                });

                                                // Successfully created post
                                                Swal.fire({
                                                        icon: "success",
                                                        title: "Post Created Successfully",
                                                        toast: true,
                                                        position: "top-end",
                                                        showConfirmButton: false,
                                                        timer: 3000,
                                                });

                                                // Reset modal and inputs
                                                modal.style.display = "none";
                                                modalTitle.value = "";
                                                modalDis.value = "";
                                        } catch (error) {
                                                console.error("Error adding user: ", error);
                                                Swal.fire({
                                                        title: "Error",
                                                        text: "Unsuccessful",
                                                        icon: "error",
                                                });
                                        }
                                }
                        }, { once: true });
                } catch (err) {
                        console.error(err);
                }
        };

        addData();
};

// Add event listener for creating a blog
createBlogBtn && createBlogBtn.addEventListener("click", createBlog);


const searchPosts = () => {
        const searchInput = document.getElementById('searchInput').value.toLowerCase(); // Get the search input value
        const blogContainer = document.getElementById('blogBox'); // The container where posts are displayed
        const allPosts = blogContainer.getElementsByClassName('post'); // Get all the posts
      
        // Loop through each post and hide or display based on search query
        Array.from(allPosts).forEach((postDiv) => {
          const title = postDiv.querySelector('h3').textContent.toLowerCase(); // Get the title of the post
          const description = postDiv.querySelector('p').textContent.toLowerCase(); // Get the description of the post
          const category = postDiv.querySelector('small').textContent.toLowerCase(); // Get the category of the post
      
          // Show or hide post based on matching search query
          if (title.includes(searchInput) || description.includes(searchInput) || category.includes(searchInput)) {
            postDiv.style.display = ''; // Show post
          } else {
            postDiv.style.display = 'none'; // Hide post
          }
        });
      };
      
      // Add event listener to search input
      document.getElementById('searchInput').addEventListener('input', searchPosts);
      document.getElementById('searchInputBig').addEventListener('input', searchPosts);


      // Function to delete a post from Firestore
window.deletePost = async () => {
        try {
          // Get reference to the post in Firestore
          const postRef = doc(db, `blog/${selectedCategory}${uid}`);
          
          // Delete the post from Firestore
          await deleteDoc(postRef);
      
          // Optionally, remove the post from the UI
          const postDiv = document.getElementById(uid); 
          if (postDiv) {
            postDiv.remove(); // Remove post from the DOM
          }
      
          // Show success message
          Swal.fire({
            icon: "success",
            title: "Post Deleted Successfully",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });


        } catch (error) {
          console.error('Error deleting post:', error);
          Swal.fire({
            icon: "error",
            title: "Error deleting post",
            text: "Something went wrong.",
          });
        }
      };

    
