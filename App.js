let categories = ["business", "all", "sports", "science", "hatke", "automobile", "world", "politics"]
let newsAPI = "https://inshorts.deta.dev/news?category="

for(let i=0; i<categories.length; i++){
    let btn = document.createElement("button");
    btn.textContent = categories[i];
    btn.addEventListener("click", function(){
        fetchCategoryNews(categories[i]);
    })
    document.querySelector(".news_category").appendChild(btn);
}

 let obj = []

    function fetchCategoryNews(categ){
        document.querySelector(".news").innerHTML = "";
        fetch(newsAPI + categ.toLowerCase())
        .then((response) => response.json())
        .then((data) => {
            let newsdata = data?.data;
            obj.push(newsdata);
            newsdata.forEach((every) => {
                let div = document.createElement("div");
                div.classList.add("item");
                div.innerHTML = `
                    <div class="title">
                        <h4>BY ${every?.author}</h4>
                        <h5>CATEGORY ${every?.category}</h5>
                    </div>
                    <div class="details">
                        <p>
                         ${every.content} 
                         <span><a href="${every.url}">READ MORE</a></span>
                        </p> 
                    </div>
                    <div class="flex-end">
                        <button class="like" onclick="saveNews(event)"><i class="fa fa-heart"> </i></button>
                    </div>
                `;
                div.setAttribute("data-news", JSON.stringify(every))
                document.querySelector(".news").appendChild(div);
            });
        })
}

function saveNews(e){
    const obj = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-news");
    let data = localStorage.getItem("data");
    if(!data){
        data = []
    }else {
        data = JSON.parse(data);
    }
    data.push(JSON.parse(obj));

    console.log("save news called", e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-news"))
    localStorage.setItem("data", JSON.stringify(data));   
}

