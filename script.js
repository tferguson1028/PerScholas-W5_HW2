const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.querySelector("nav#top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// Menu data structure
let menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

menuLinks.forEach((link) => 
{
  let anchorEl = document.createElement("a");
  anchorEl.href = link.href;
  anchorEl.textContent = link.text;
  topMenuEl.appendChild(anchorEl);
});

const subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

let topMenuLinks = topMenuEl.querySelectorAll("a");
let showingSubMenu = false;

topMenuEl.addEventListener("click", function(event)
{
  event.preventDefault();
  event.stopPropagation();
  let targetEl = event.target;
  if(targetEl.tagName !== "A")
    return;
    
  console.log(targetEl);
  if(targetEl.classList.contains("active"))
  {
    targetEl.classList.remove("active");
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    return;
  }
  
  topMenuLinks.forEach((a) => a.classList.remove("active"));
  targetEl.classList.add("active");
  
  // This works, yay
  let subLinks;
  for(let link of menuLinks)
  {
    if(link.text === targetEl.textContent && link.subLinks !== undefined)
    {
      showingSubMenu = true;
      buildSubMenu(link.subLinks); // There's no reason to 5.7 this in a lower space.
      subMenuEl.style.top = "100%";
      break;
    }else
    {
      showingSubMenu = false;
      subMenuEl.style.top = "0";
    }
  }
});


function buildSubMenu(subLinks)
{
  subMenuEl.replaceChildren();
  for(let link of subLinks)
  {
    let subLinkEl = document.createElement("a");
    subLinkEl.href = link.href;
    subLinkEl.textContent = link.text;
    subMenuEl.appendChild(subLinkEl);
  }
}




