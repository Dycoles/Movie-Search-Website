const res = await fetch("http://localhost:5000/api/posters/sync", {
  method: "POST",
});

const data = await res.json();
console.log(data);
console.log("Poster sync completed");