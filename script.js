let currentUser = null;

function showPage(page) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(page).classList.add('active');

  if(page === 'dashboard') loadUserReports();
  if(page === 'admin') loadAllReports();
}

function login() {
  const name = document.getElementById('username').value;
  const role = document.getElementById('role').value;
  currentUser = { name, role };
  alert("Logged in");
}

function getPriority(desc) {
  desc = desc.toLowerCase();
  if(desc.includes("fire")) return "high";
  if(desc.includes("water")) return "medium";
  return "low";
}

function submitReport() {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];

  let report = {
    user: currentUser?.name || "guest",
    title: document.getElementById("title").value,
    desc: document.getElementById("desc").value,
    priority: getPriority(document.getElementById("desc").value),
    status: "Pending"
  };

  reports.push(report);
  localStorage.setItem("reports", JSON.stringify(reports));

  alert("Submitted");
}

function loadUserReports() {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  let div = document.getElementById("userReports");
  div.innerHTML = "";

  reports.forEach(r => {
    div.innerHTML += `<p>${r.title} - ${r.priority} - ${r.status}</p>`;
  });
}

function loadAllReports() {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  let div = document.getElementById("allReports");
  div.innerHTML = "";

  reports.forEach((r, i) => {
    div.innerHTML += `<p>${r.title} - ${r.status}
    <button onclick="resolve(${i})">Resolve</button></p>`;
  });
}

function resolve(i) {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports[i].status = "Resolved";
  localStorage.setItem("reports", JSON.stringify(reports));
  loadAllReports();
}