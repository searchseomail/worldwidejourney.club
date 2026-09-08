
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");
    const resultsBox = document.getElementById("searchResults");
    let index =[];
    fetch(BASE_URL + "/search_index.json").then(r => r.json()).then(data => index = data).catch(e => console.log("Index empty"));
    
    input.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        resultsBox.innerHTML = "";
        if(q.length < 2) { resultsBox.style.display = "none"; return; }
        
        const matches = index.filter(i => i.title.toLowerCase().includes(q) || i.content.toLowerCase().includes(q)).slice(0, 6);
        if(matches.length > 0) {
            resultsBox.style.display = "block";
            matches.forEach(m => {
                resultsBox.innerHTML += `<a href="${BASE_URL}/posts/${m.slug}.html" style="display:block; padding:10px; border-bottom:1px solid #eee; text-decoration:none; color:#333;"><strong>${m.title}</strong><br><small style="color:#666;">${m.content}</small></a>`;
            });
        } else {
            resultsBox.style.display = "none";
        }
    });
    document.addEventListener("click", (e) => { if(!input.contains(e.target) && !resultsBox.contains(e.target)) resultsBox.style.display = "none"; });
});