//페이지가 로드될때

window.onload = function(){
  var fbt = document.getElementById('fbt');
  document.createElement('div');
  //버튼을 클릭했을때
  fbt.addEventListener('click', function test(){
    chrome.tabs.executeScript({
      //크롬에서 현재 페이지의 url을 가져와
      code:'document.location.href;'
    }, function(data){
      var Curl = data;
      //현재 페이지가 네이버라면
      if(Curl == 'https://www.naver.com/'){
        createDiv();
        self.close();
      }else{
        saveData(data, 132)
        alert("no");
      }
    });
  });
}

function saveData(url, id){
  chrome.storage.sync.set({
    :"id"
  });
}


function createDiv(){
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

    //타겟(메뉴버튼)을 찾고 그 상대위치를 구하는 법
    var target = document.querySelector("#PM_ID_btnServiceMore");
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
