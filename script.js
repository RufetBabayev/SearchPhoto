// selectors
const iputSearch = document.querySelector("#iputSearch");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const photosContiner = document.querySelector("#photosContiner");
const formInput = document.querySelector("#formInput");
// api tools

let inputValue = "";
const storagePhotos = JSON.parse(localStorage.getItem("storagePhotos")) || {};

async function getData(data) {
  const fetchData = await fetch(
    `https://api.unsplash.com/search/photos?query=${data}`,
    {
      method: "GET",
      headers: {
        Authorization: "Client-ID B1git8vkm0euthpuUNHe7YJ91om8Xzwtvh7h_IK8hNA",
      },
    }
  );
  if (fetchData.status === 200) {
    let res = await fetchData.json();
    localStorage.setItem("storagePhotos", JSON.stringify(res));

    createUi(res);
  }
}

function createUi(data) {
  const html = data.results
    .map((photoData) => {
      return `  <div>
          <figure class="size-[250px]">
            <img
              class="size-full object-cover"
              src=${photoData.urls.small}
              alt=""
            />
          </figure>
        </div> `;
    })
    .join("");
  photosContiner.innerHTML = html;
}

formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(inputValue);
});

iputSearch.addEventListener("change", (e) => (inputValue = e.target.value));

if (storagePhotos) {
  createUi(storagePhotos);
}
