var urlList = "sibal";

window.onload = function(){
  console.log("1" + urlList);
  take_session();
  console.log("3" + urlList);
  var fbt = document.getElementById('fbt');
  var abt = document.getElementById('add');
  var tbt = document.getElementById('test');

  document.createElement('div');
  //Find Menu버튼을 클릭했을때
  fbt.addEventListener('click', test);
  abt.addEventListener('click', selectId);
  tbt.addEventListener('click', function(){console.log("4"+urlList)});
}

function test(){
  chrome.tabs.executeScript({
    //크롬에서 현재 페이지의 url을 가져와
    code:'document.location.href;'
  }, function(data){
    var Curl = data;
    //현재 페이지가 네이버라면
    if(Curl == 'https://www.naver.com/'){
      createDiv("#PM_ID_btnServiceMore");
      chrome.tabs.remove();
      self.close();
    }else{
      alert("Can't find menu");
    }
  });
}

//클릭한 컴포넌트 id알아내기
// 현재탭의 body에 이벤트리스너 삽입(클릭)
// 클릭이벤트가 일어나면 sessionStorage에 url, tag id class 저장
//
function selectId(){
  chrome.tabs.executeScript({
    code:`
    //IdClass 글로벌로 박아놔
    var IdClass = undefined;
    document.body.addEventListener('click',function(event){
      //alert(event.target.getAttribute('class'));
      tagClass = event.target.getAttribute('class');
      tagId = event.target.getAttribute('id');

      //클릭한 태그에 id or class를
      if(tagId != undefined){
        IdClass = "#" + tagId;
        this.removeEventListener("click", arguments.callee);
      }else if(tagClass != undefined){
        IdClass = "." + tagClass;
        this.removeEventListener("click", arguments.callee);
      }else {
        alert("error");
      }
      sessionStorage.setItem("IdOrClass",IdClass);
      sessionStorage.setItem("url",document.location.href);
    }, false);
    `
  });
}

//chrome storage에 url과 id 저장
function saveData(url, id){
  chrome.storage.sync.set({
    url:url,
    id:id
  });
}

//페이지가 로드될때 sessionStorage의 url id값을 chromStorage에 저장
function take_session (){
  chrome.tabs.executeScript({
    code:`
    var data = {
      url: sessionStorage.url,
      id: sessionStorage.IdOrClass}; data`
  }, function(result){
    saveData(result[0]["url"], result[0]["id"]);
    urlList = result;
    console.log(urlList);
  });
}


//tag의 class나 id를 input하면 표시해준다.
function createDiv(abt){
  chrome.tabs.executeScript({
    code:`
    var pad = 15;

    var popup = document.createElement("div");
    popup.setAttribute("id","layer_popup");
    popup.style.width="100%";
    popup.style.height="100%";
    popup.style.top="0px";
    popup.style.bottom="0px";
    popup.style.left="0px";
    popup.style.position="fixed";
    popup.style.zIndex="800";
    popup.style.backgroundColor="rgba(0,0,0, 0.6)";

    //타겟(메뉴버튼)을 찾고 그 절대위치를 구하는 법
    var target = document.querySelector("` + abt + `");
    var clientRect = target.getBoundingClientRect();
    var relativeTop = clientRect.top;
    var relativeLeft = clientRect.left;
    var scrolledTopLength = window.pageYOffset;
    var scrolledLeftLength = window.pageXOffset;

    //x좌표
    var absoluteLeft = scrolledLeftLength + relativeLeft;
    //y좌표
    var absoluteTop = scrolledTopLength + relativeTop;

    console.log(absoluteTop);
    console.log(clientRect);

    //메뉴표시 div
    var menudiv = document.createElement("div");
    menudiv.setAttribute("id", "menudiv");
    menudiv.style.width=clientRect.right - clientRect.left + pad * 2 + "px";
    menudiv.style.height=clientRect.height + pad * 2 + "px";
    menudiv.style.border="2px dashed #ffe066";
    menudiv.style.top= absoluteTop - pad + "px";
    menudiv.style.left= absoluteLeft - pad + "px";
    menudiv.style.position="absolute";
    menudiv.style.zIndex="900";

    document.body.appendChild(menudiv);
    document.body.appendChild(popup);

    //팝업레이어 이벤트
    function closeEvent(){
      document.body.removeChild(popup);
      document.body.removeChild(menudiv);
      clearInterval(interval);
    }
    popup.addEventListener("click", closeEvent);
    menudiv.addEventListener("click", closeEvent);

    //menudiv 테두리 깜빡이기
    var blinkTime = 0;
    interval = setInterval(function(){
      // 시간 인스턴스 생성

      if(blinkTime == 1){
        menudiv.style.border="2px dashed #ffe066";
        blinkTime = 0;
      }else{
        menudiv.style.border="";
        blinkTime = 1;
      }
    }, 300);
    `
  });
}
