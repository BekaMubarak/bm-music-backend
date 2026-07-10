document.getElementById('upload-song-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('track-title').value;
  const genre = document.getElementById('track-genre').value;
  const audioFile = document.getElementById('track-audio').files[0];
  const coverFile = document.getElementById('track-cover').files[0];

  // Simple beginner validation to make sure file picks are present
  if (!audioFile || !coverFile) {
    alert("Please ensure both an audio file and cover artwork image are selected.");
    return;
  }

  console.log("Preparing track bundle for submission:", {
    title,
    genre,
    audioName: audioFile.name,
    coverName: coverFile.name
  });

  alert("Track files captured! Next, we will connect the JavaScript bridge to push these directly to Cloudinary via our backend routes.");
});
