
/* Abdul Karim Bangura Portfolio - Clean Interactions */

const revealElements = document.querySelectorAll(".reveal");
function revealOnScroll(){
  revealElements.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 100){ el.classList.add("active"); }
  });
}
window.addEventListener("scroll", revealOnScroll); revealOnScroll();

const topBtn = document.getElementById("topBtn");
if(topBtn){
  window.addEventListener("scroll",()=>{ topBtn.style.display = window.scrollY > 400 ? "block" : "none"; });
  topBtn.addEventListener("click",()=>window.scrollTo({top:0, behavior:"smooth"}));
}

function sendMessage(event){
  event.preventDefault();
  const name = document.getElementById("name")?.value.trim() || "";
  const senderEmail = document.getElementById("email")?.value.trim() || "";
  const messageText = document.getElementById("message")?.value.trim() || "";
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${messageText}`);
  window.location.href = "mailto:karimbangura.dev@gmail.com?body=" + body;
  const status = document.getElementById("formMessage");
  if(status){ status.textContent = "Your email app is opening with the message ready."; status.style.color = "#19d3ff"; }
  event.target.reset();
}

const typingElement = document.getElementById("typing");
const words = ["Computer Science Student", "Web Development Learner", "Future Software Developer", "Practical Project Builder", "Building with HTML, CSS & JavaScript"];
let wordIndex=0, charIndex=0, deleting=false;
function typeEffect(){
  if(!typingElement) return;
  const current = words[wordIndex];
  typingElement.textContent = current.substring(0, deleting ? charIndex-1 : charIndex+1);
  charIndex += deleting ? -1 : 1;
  if(!deleting && charIndex === current.length){ deleting=true; setTimeout(typeEffect,1400); return; }
  if(deleting && charIndex === 0){ deleting=false; wordIndex=(wordIndex+1)%words.length; }
  setTimeout(typeEffect, deleting ? 45 : 85);
}
typeEffect();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{ if(window.scrollY >= section.offsetTop - 160) current = section.id; });
  navLinks.forEach(link=>{
    link.classList.remove("active-link");
    const href = link.getAttribute("href") || "";
    if(current && href.includes("#" + current)) link.classList.add("active-link");
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click", function(e){
    const targetId=this.getAttribute("href");
    if(targetId === "#") return;
    const target=document.querySelector(targetId);
    if(!target) return;
    e.preventDefault(); target.scrollIntoView({behavior:"smooth"});
  });
});

const themeToggle=document.getElementById("themeToggle");
if(localStorage.getItem("portfolioTheme") === "light") document.body.classList.add("light-mode");
function updateThemeIcon(){
  const icon = themeToggle?.querySelector("i"); if(!icon) return;
  icon.className = document.body.classList.contains("light-mode") ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
}
updateThemeIcon();
if(themeToggle){ themeToggle.addEventListener("click",()=>{ document.body.classList.toggle("light-mode"); localStorage.setItem("portfolioTheme", document.body.classList.contains("light-mode") ? "light" : "dark"); updateThemeIcon(); }); }

const tourStart=document.getElementById("tourStart");
const tourSections=[
  {id:"home", message:"Welcome to my portfolio."},
  {id:"about", message:"This section introduces my background."},
  {id:"skills", message:"Here are the skills and tools I am practicing."},
  {id:"projects", message:"These are my featured projects."},
  {id:"features", message:"These are the interactive features in this portfolio."},
  {id:"certificates", message:"These are my certificates and achievements."},
  {id:"contact", message:"This is where you can connect with me."}
];
let tourIndex=0;
function showSmallToast(text){
  let toast=document.getElementById("smallToast");
  if(!toast){ toast=document.createElement("div"); toast.id="smallToast"; toast.className="small-toast"; document.body.appendChild(toast); }
  toast.textContent=text; clearTimeout(toast.hideTimer); toast.hideTimer=setTimeout(()=>toast.remove(),2300);
}
function runPortfolioTour(){
  const t=tourSections[tourIndex]; const section=document.getElementById(t.id);
  if(!section){ tourIndex=(tourIndex+1)%tourSections.length; return; }
  document.querySelectorAll(".tour-highlight").forEach(x=>x.classList.remove("tour-highlight"));
  section.scrollIntoView({behavior:"smooth"});
  setTimeout(()=>{ section.classList.add("tour-highlight"); showSmallToast(t.message); },650);
  setTimeout(()=>{ section.classList.remove("tour-highlight"); tourIndex++; if(tourIndex<tourSections.length) runPortfolioTour(); else {tourIndex=0; showSmallToast("Tour complete. Thank you for viewing my portfolio.");}},3200);
}
if(tourStart) tourStart.addEventListener("click",()=>{tourIndex=0; runPortfolioTour();});

const profileCard=document.querySelector(".profile-card");
if(profileCard){
  profileCard.addEventListener("mousemove",e=>{ const r=profileCard.getBoundingClientRect(); const x=e.clientX-r.left, y=e.clientY-r.top; const ry=((x/r.width)-0.5)*8, rx=((y/r.height)-0.5)*-8; profileCard.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`; });
  profileCard.addEventListener("mouseleave",()=>profileCard.style.transform="perspective(1000px) rotateX(0) rotateY(0)");
}

const skillSection=document.getElementById("skills");
const skillBars=document.querySelectorAll(".skill-progress");
let skillsAnimated=false;
function animateSkillBars(){
  if(!skillSection || skillsAnimated) return;
  if(skillSection.getBoundingClientRect().top < window.innerHeight - 150){ skillBars.forEach(bar=>bar.style.width=(bar.dataset.progress||0)+"%"); skillsAnimated=true; }
}
window.addEventListener("scroll", animateSkillBars); animateSkillBars();

const toggleSkillsBtn=document.getElementById("toggleSkillsBtn");
const extraSkillsPanel=document.getElementById("extraSkillsPanel");
if(toggleSkillsBtn && extraSkillsPanel){
  extraSkillsPanel.style.display="none";
  toggleSkillsBtn.addEventListener("click",()=>{
    const expanded = extraSkillsPanel.style.display !== "none";
    extraSkillsPanel.style.display = expanded ? "none" : "grid";
    toggleSkillsBtn.innerHTML = expanded ? 'View More Skills <i class="bi bi-chevron-down"></i>' : 'Show Less Skills <i class="bi bi-chevron-up"></i>';
  });
}

const featureCounters=document.querySelectorAll(".feature-counter");
const featuresSection=document.getElementById("features");
let countersAnimated=false;
function animateFeatureCounters(){
  if(!featuresSection || countersAnimated) return;
  if(featuresSection.getBoundingClientRect().top < window.innerHeight - 150){
    featureCounters.forEach(counter=>{
      const target=Number(counter.dataset.target)||0; let current=0; const inc=Math.max(1,Math.ceil(target/45));
      const tick=()=>{ current+=inc; if(current>=target){ counter.textContent = target + (target===100?"%":"+"); return; } counter.textContent=current+(target===100?"%":"+"); requestAnimationFrame(tick);}; tick();
    }); countersAnimated=true;
  }
}
window.addEventListener("scroll", animateFeatureCounters); animateFeatureCounters();

const toggleFeaturesBtn=document.getElementById("toggleFeaturesBtn");
const featureExtras=document.querySelectorAll(".feature-extra");
if(toggleFeaturesBtn && featureExtras.length){
  featureExtras.forEach(x=>x.style.display="none");
  toggleFeaturesBtn.addEventListener("click",()=>{
    const expanded = Array.from(featureExtras).some(x=>x.style.display !== "none");
    featureExtras.forEach(x=>x.style.display = expanded ? "none" : "block");
    toggleFeaturesBtn.innerHTML = expanded ? 'View More Features <i class="bi bi-chevron-down"></i>' : 'Show Less Features <i class="bi bi-chevron-up"></i>';
  });
}

const projectFilterButtons=document.querySelectorAll(".project-filter");
const projectItems=document.querySelectorAll(".project-item");
projectFilterButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    projectFilterButtons.forEach(btn=>btn.classList.remove("active-filter")); button.classList.add("active-filter");
    const f=button.dataset.filter;
    projectItems.forEach(item=>{ const show=f==="all" || item.dataset.category===f; item.style.display=show?"block":"none"; item.style.opacity=show?"1":"0"; });
  });
});

const projectData={
  portfolio:{category:"Web Project", title:"Portfolio Website", image:"images/projects/portfolio-preview.png", description:"A clean personal portfolio designed to present my identity, skills, projects, certificates, and Computer Science progress.", details:[{title:"Purpose", text:"Create a professional online presence for my web development progress."},{title:"Main Features", text:"Dark/light mode, typing animation, project details, certificate previews, skill bars, portfolio tour, and responsive layout."},{title:"Skills Used", text:"HTML, CSS, JavaScript, Bootstrap, responsive design, and UI customization."},{title:"Status", text:"Completed as a portfolio project and ready to publish online."}], tags:["HTML","CSS","JavaScript","Bootstrap","Portfolio"], actions:[{label:"View Website", url:"index.html#home"},{label:"GitHub Profile", url:"https://github.com/karimbangura"}]},
  cafeteria:{category:"Entrepreneurship Project", title:"AIU Cafeteria Booking App", image:"images/projects/cafeteria-preview.png", description:"A campus food-ordering concept designed to reduce cafeteria queues and improve the student ordering experience.", details:[{title:"Problem", text:"Students may face long queues, limited break time, and difficulty planning meals."},{title:"Solution", text:"A pre-order and pickup system with order summary, pickup time, and student ID balance ideas."},{title:"Features", text:"Menu browsing, payment flow, wallet balance, notifications, and cafeteria-side order handling."},{title:"Skills Practiced", text:"Entrepreneurship, UI/UX thinking, problem analysis, and presentation design."}], tags:["UI/UX","Entrepreneurship","Campus Solution","Student App"], actions:[]},
  network:{category:"Data Communication Project", title:"Campus Network Topology Design", image:"images/projects/network-topology-preview.png", description:"A Data Communication and Networking project designed and implemented with Cisco Packet Tracer.", details:[{title:"Scenario", text:"AIU Skills Academy needed a structured multi-department network."},{title:"Network Design", text:"2 routers, 4 switches, 8 PCs, VLAN 10, VLAN 20, and a serial WAN connection."},{title:"Technical Work", text:"Subnetting, VLAN assignment, router-on-a-stick, routing, ping tests, and traceroute."},{title:"Result", text:"Departments were able to communicate across VLANs and routers."}], tags:["Cisco Packet Tracer","VLAN","Subnetting","Routing"], actions:[]},
  zara:{category:"Educational Game Project", title:"Zara Word Safari", image:"images/projects/zara-gameplay-poster.png", description:"A group educational game project for an Artificial Intelligence subject, designed to help children aged 4–6 learn vocabulary through simple interaction.", details:[{title:"Purpose", text:"Make vocabulary learning fun, visual, and child-friendly."},{title:"Target Users", text:"Kindergarten children aged 4–6."},{title:"Game Direction", text:"Simple activities such as matching, clicking, dragging, and choosing pictures."},{title:"Project Type", text:"University group project for Artificial Intelligence."}], tags:["Python","Educational Game","Group Project","AI Subject"], actions:[{label:"View Gameplay", url:"zara-gameplay.html"},{label:"View Code", url:"https://github.com/karimbangura/zara-word-safari"}]},
  "shopping-cart":{category:"Programming Project", title:"C Shopping Cart Program", image:null, description:"A small C console program that practices item selection, quantity handling, total calculation, and program flow.", details:[{title:"Purpose", text:"Practice C programming fundamentals using a practical mini-project."},{title:"Concepts", text:"Input, variables, conditions, loops, functions, totals, and simple menu flow."},{title:"Repository", text:"This can be placed inside the C-learning GitHub repository as a focused project folder."},{title:"Status", text:"Programming practice project."}], tags:["C Programming","Console App","GitHub"], actions:[{label:"C-learning Repository", url:"https://github.com/karimbangura/C-learning"}]},
  "c-lab":{category:"Programming Project", title:"C Shopping Cart Program", image:null, description:"A small C console program that practices item selection, quantity handling, total calculation, and program flow.", details:[{title:"Purpose", text:"Practice C programming fundamentals using a practical mini-project."},{title:"Concepts", text:"Input, variables, conditions, loops, functions, totals, and simple menu flow."}], tags:["C Programming","Console App"], actions:[{label:"C-learning Repository", url:"https://github.com/karimbangura/C-learning"}]}
};

const projectModal=document.getElementById("projectModal");
const modalCategory=document.getElementById("modalCategory");
const modalTitle=document.getElementById("modalTitle");
const modalDescription=document.getElementById("modalDescription");
const modalDetails=document.getElementById("modalDetails");
const modalTags=document.getElementById("modalTags");
const modalActions=document.getElementById("modalActions");
const modalProjectPreview=document.getElementById("modalProjectPreview");
const modalProjectImage=document.getElementById("modalProjectImage");
function openProjectModal(key){
  const p=projectData[key]; if(!p || !projectModal) return;
  modalCategory.textContent=p.category; modalTitle.textContent=p.title; modalDescription.textContent=p.description;
  if(modalProjectPreview && modalProjectImage){ if(p.image){ modalProjectImage.src=p.image; modalProjectImage.alt=p.title+" preview"; modalProjectPreview.style.display="block";} else { modalProjectPreview.style.display="none"; }}
  modalDetails.innerHTML=""; p.details.forEach(d=>{ const box=document.createElement("div"); box.className="modal-detail"; box.innerHTML=`<h4>${d.title}</h4><p>${d.text}</p>`; modalDetails.appendChild(box); });
  modalTags.innerHTML=""; p.tags.forEach(t=>{ const s=document.createElement("span"); s.textContent=t; modalTags.appendChild(s); });
  modalActions.innerHTML=""; p.actions.forEach(a=>{ const link=document.createElement("a"); link.href=a.url; link.target=a.url.startsWith("http")?"_blank":"_self"; link.textContent=a.label; modalActions.appendChild(link); });
  projectModal.classList.add("show"); document.body.style.overflow="hidden";
}
function closeProjectModal(){ if(projectModal){ projectModal.classList.remove("show"); document.body.style.overflow=""; }}
document.querySelectorAll(".project-details-btn").forEach(btn=>btn.addEventListener("click",()=>openProjectModal(btn.dataset.project)));
document.getElementById("projectModalClose")?.addEventListener("click", closeProjectModal);
document.getElementById("projectModalOverlay")?.addEventListener("click", closeProjectModal);

const certificateTabs=document.querySelectorAll(".certificate-tab");
const certificateItems=document.querySelectorAll(".certificate-item");
certificateTabs.forEach(tab=>{
  tab.addEventListener("click",()=>{
    certificateTabs.forEach(x=>x.classList.remove("active-cert-tab")); tab.classList.add("active-cert-tab");
    const f=tab.dataset.certFilter;
    certificateItems.forEach(item=>{ const show=f==="all" || item.dataset.certCategory===f; item.style.display=show?"block":"none"; item.style.opacity=show?"1":"0"; });
  });
});
const certificateData={
  "intro-python":{type:"Technical Certificate", title:"Introduction to Python", description:"This certificate represents my foundation in Python programming fundamentals.", image:"images/certificates/intro-python.png", tags:["Python","Programming"]},
  "intermediate-git":{type:"Technical Certificate", title:"Intermediate Git", description:"This certificate shows my progress in Git commands, repositories, and project workflow.", image:"images/certificates/intermediate-git.png", tags:["Git","GitHub","Version Control"]},
  "github-concepts":{type:"Technical Certificate", title:"Introduction to GitHub Concepts", description:"This certificate represents my foundation in GitHub concepts, repositories, and version control workflow.", image:"images/certificates/github-concepts.png", tags:["GitHub","Version Control"]},
  "python-course":{type:"Technical Certificate", title:"Python Certification Course", description:"This certificate supports my programming foundation and interest in software development.", image:"images/certificates/python-course.png", tags:["Python","Programming"]},
  "fundamentals":{type:"Technical Certificate", title:"Fundamentals Certification Course", description:"This certificate supports my foundation in computing and technology basics.", image:"images/certificates/fundamentals.png", tags:["IT Fundamentals","Computing"]},
  "iftar-volunteering":{type:"Achievement", title:"Iftar Volunteering Certificate", description:"This achievement recognizes my participation in volunteering and community service activities.", image:"images/certificates/iftar-volunteering.png", tags:["Volunteering","Service"]},
  "hsk1":{type:"Achievement", title:"HSK 1 Certificate", description:"This certificate represents beginner-level Chinese language learning progress.", image:"images/certificates/hsk1.png", tags:["HSK 1","Language"]}
};
const certificateModal=document.getElementById("certificateModal");
function openCertificateModal(key){
  const c=certificateData[key]; if(!c || !certificateModal) return;
  document.getElementById("certificateModalType").textContent=c.type;
  document.getElementById("certificateModalTitle").textContent=c.title;
  document.getElementById("certificateModalDescription").textContent=c.description;
  const img=document.getElementById("certificateModalImage"); const ph=document.getElementById("certificatePreviewPlaceholder");
  img.style.display="none"; ph.style.display="block"; ph.textContent="Opening certificate preview...";
  img.onload=()=>{ img.style.display="block"; ph.style.display="none"; };
  img.onerror=()=>{ img.style.display="none"; ph.style.display="block"; ph.innerHTML=`<a class="certificate-fallback-link" href="${c.image}" target="_blank">Open certificate image</a>`; };
  img.src=""; img.src=c.image;
  const tags=document.getElementById("certificateModalTags"); tags.innerHTML=""; c.tags.forEach(t=>{ const s=document.createElement("span"); s.textContent=t; tags.appendChild(s); });
  certificateModal.classList.add("show"); document.body.style.overflow="hidden";
}
function closeCertificateModal(){ if(certificateModal){ certificateModal.classList.remove("show"); document.body.style.overflow=""; }}
document.querySelectorAll(".certificate-view-btn").forEach(btn=>btn.addEventListener("click",e=>{ e.preventDefault(); openCertificateModal(btn.dataset.cert); }));
document.getElementById("certificateModalClose")?.addEventListener("click", closeCertificateModal);
document.getElementById("certificateModalOverlay")?.addEventListener("click", closeCertificateModal);
document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ closeProjectModal(); closeCertificateModal(); }});

document.querySelectorAll(".coming-soon-link").forEach(link=>link.addEventListener("click",e=>{ e.preventDefault(); showSmallToast("LinkedIn profile coming soon."); }));

const mobileMenu=document.getElementById("menu");
document.querySelectorAll(".navbar-collapse .nav-link").forEach(link=>{
  link.addEventListener("click",()=>{ if(mobileMenu?.classList.contains("show") && window.bootstrap){ (bootstrap.Collapse.getInstance(mobileMenu) || new bootstrap.Collapse(mobileMenu,{toggle:false})).hide(); }});
});

console.log("Abdul Karim Bangura Portfolio ready.");
