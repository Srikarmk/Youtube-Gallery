const videosContainer = document.getElementById("videosContainer");
const videoIdInput = document.getElementById("videoId");
let youTubeVideoIds = [];
const popup = document.getElementById("popup");
const video = document.querySelector("#popup > iframe");
const loadVideos = () => {
  youTubeVideoIds = JSON.parse(localStorage.getItem("youtubeVideoIds")) || [];
};

const displayVideos = () => {
  const videosHtmlString = youTubeVideoIds
    .map(
      (id) => `
        <li onClick="clickVideo(event,'${id}')">
        <img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for YouTube video with id ${id}">
        <button class="delete-btn"> &times;</button>
        </li>
        
        `
    )
    .join("");
  videosContainer.innerHTML = videosHtmlString;
};

const clickVideo = (event, id) => {
  console.log(id);
  if (event.target.classList.contains("delete-btn")) {
    youTubeVideoIds = youTubeVideoIds.filter((i) => i !== id);
    localStorage.setItem("youtubeVideoIds", JSON.stringify(youTubeVideoIds));
    displayVideos();
  } else {
    video.src = `https://www.youtube.com/embed/${id}`;
    popup.classList.add("open");
    popup.classList.remove("closed");
  }
};

const saveVideo = (e) => {
  e.preventDefault();
  const videoId = videoIdInput.value;
  youTubeVideoIds.unshift(videoId);
  videoIdInput.value = "";
  localStorage.setItem("youtubeVideoIds", JSON.stringify(youTubeVideoIds));
  displayVideos();
};

const handlePopupClick = () => {
  popup.classList.add("closed");
  popup.classList.add("removed");
};
loadVideos();
displayVideos();
