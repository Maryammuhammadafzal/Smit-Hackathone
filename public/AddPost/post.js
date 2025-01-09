import {
        db,
        collection,
        addDoc,
        getDocs,
        doc,
        setDoc,
        Timestamp,
        get,
        set,
        ref ,child ,  update , remove,onValue,
        getDatabase
} from "./firebase.js";

let uid = localStorage.getItem("uid");


const postForm = document.querySelector('.post-form');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const postsContainer = document.getElementById('postsContainer');

postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const post = {
            title: postTitle.value,
            content: postContent.value,
            author: auth.currentUser.displayName,
            timestamp: new Date().toISOString()
        };
    
        try {
            await push(ref(db, 'posts/'), post);
            postTitle.value = '';
            postContent.value = '';
            alert("Post added successfully!");
        } catch (error) {
            console.error("Error adding post:", error);
        }
    });
    