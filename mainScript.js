var xhttp = new XMLHttpRequest();
var lessonInfo;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        lessonInfo = JSON.parse(xhttp.responseText);
        console.log(lessonInfo);
    }
};
xhttp.open("GET", "LESSONINFO.json", true);
xhttp.send();
let buttons = document.getElementById("gradeDetails");

const gradeFlowChart = document.getElementById("gradeFlowChart");
const gradeBtnsHolder = document.getElementById("gradeBtns");
const mnTitle = document.getElementById("mnTitle");
const mnSub = document.getElementById("mnSub");

const temp = document.getElementById("lessonSelectUI");
buttons.addEventListener("click",function(e){
    target = e.target.parentElement;
    if(!isNaN(target.id) && !target.id==""){
        let lessonObj = lessonInfo[target.id];
        let bar;
        Object.keys(lessonObj).forEach((key) => {
            bar = temp.content.cloneNode(true);
            bar.querySelector('.lessonCode').textContent = key;
            bar.querySelector('.lessonDesc').firstChild.textContent = lessonObj[key];
            gradeFlowChart.appendChild(bar);
        })
        mnTitle.textContent = "Lessons";
        mnSub.textContent = "Grade "+target.id+" all lessons";
        gradeFlowChart.style.display = "block";
        gradeBtnsHolder.style.display = "none";
    }
});

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click",function(){
    gradeFlowChart.style.display = "none";
    gradeBtnsHolder.style.display = "block";
	while(gradeFlowChart.lastChild && gradeFlowChart.lastChild.id!="backBtn") {
		gradeFlowChart.lastChild.remove();
	}
})

gradeFlowChart.addEventListener("click",function(e){
    target = e.target.parentElement;
	if(target.classList.contains("lessonSelectData") || target.parentElement.classList.contains("lessonSelectData")){
		if(target.parentElement.classList.contains("lessonSelectData")){
			target = target.parentElement;
		}
		let code = target.childNodes[1].textContent.replace(":","");
		let req = new XMLHttpRequest();
		let lessonData;
		req.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				lessonData = req.responseText;
				updateLesson(lessonData);
			}
		};
		req.open("GET", "rawLessonData/"+code+".json", true);
		req.send();
	}
});

function updateLesson(txt){
	let layoutData = JSON.parse(txt);
	console.log(JSON.parse(txt));
}
