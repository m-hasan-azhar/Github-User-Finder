// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5ItcT_MNIZnTnAyp3d12lITCFkV_tqzA",
  authDomain: "github-user-finder505.firebaseapp.com",
  projectId: "github-user-finder505",
  storageBucket: "github-user-finder505.firebasestorage.app",
  messagingSenderId: "636778001552",
  appId: "1:636778001552:web:cf1757473c828b5631d415",
  measurementId: "G-26MEEQSXZ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let searchBtn = document.querySelector(".btn-primary");
let usernameInput = document.getElementById("username");
let errorDiv = document.getElementById("error");
let resultsDiv = document.getElementById("results");
let errorMessage = document.getElementById("errorMessage");

resultsDiv.style.display = "none";
errorDiv.style.display = "none";

async function searchGitHubUser() {
  let username = usernameInput.value;
  resultsDiv.style.display = "none";
  errorDiv.style.display = "none";
  try {
    let response = await fetch(`https://api.github.com/users/${username}`);
    let data = await response.json();
    if (response.ok) {
      document.getElementById("avatar").src = data.avatar_url;
      document.getElementById("displayName").textContent =
        data.name || data.login;
      document.getElementById("username").textContent = "@" + data.login;
      document.getElementById("profileLink").href = data.html_url;
      document.getElementById("publicRepos").textContent = data.public_repos;
      document.getElementById("followers").textContent = data.followers;
      document.getElementById("following").textContent = data.following;
      document.getElementById("publicGists").textContent = data.public_gists;
      document.getElementById("location").textContent =
        data.location || "Not specified";
      document.getElementById("blog").textContent =
        data.blog || "Not specified";
      document.getElementById("twitter").textContent =
        data.twitter_username || "Not specified";
      document.getElementById("bio").textContent =
        data.bio || "No bio available";
      document.getElementById("createdAt").textContent = data.created_at;

      resultsDiv.style.display = "block";
    } else {
      errorMessage.textContent = "User not found";
      errorDiv.style.display = "block";
    }
  } catch (error) {
    errorMessage.textContent = "Error fetching user data";
    errorDiv.style.display = "block";
  }
}
searchBtn.onclick = searchGitHubUser;
