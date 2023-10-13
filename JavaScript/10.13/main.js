const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageArray=["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg"];
/* Declaring the alternative text for each image file */

/* Looping through images */
for (let i = 0; i < 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageArray[i]);
    newImage.setAttribute('alt', imageArray[i]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click",() => {
        const src=newImage.getAttribute('src');
        displayedImage.setAttribute('src',src);
      })
}

btn.addEventListener("click",() =>
{
    const className=btn.getAttribute("class");
    if(className==="dark")
    {
        btn.setAttribute("class","light");
        btn.textContent="Lighten";
        overlay.style.backgroundColor="rgba(0,0,0,0.5)";

    }
    else
    {
        btn.setAttribute("class","dark");
        btn.textContent="Draken";
        overlay.style.backgroundColor="rgba(0,0,0,0)";
    }
})
//const newImage = document.createElement('img');
//newImage.setAttribute('src', xxx);
//newImage.setAttribute('alt', xxx);
//thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
