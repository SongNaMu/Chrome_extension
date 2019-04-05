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
      }else{
        alert("no");
      }

    });
  });
}
function createDiv(){
  chrome.tabs.executeScript({
    //div객체를 생성후 body에 append
    code:`
    var popup = document.createElement("div");
    popup.setAttribute("id","layer_popup");
    popup.style.width="100%";
    popup.style.height="100%";
    popup.style.top="0px";
    popup.style.bottom="0px";
    popup.style.left="0px";
    popup.style.position="fixed";
    popup.style.zIndex="800";
    popup.style.backgroundColor="rgba(0,0,0, 0.7)";

    var target = document.querySelector("#PM_ID_btnServiceMore");
    target.style.position="relative";
    target.style.zIndex="999";

    popup.addEventListener("click", function(){
      document.body.removeChild(popup);
    });
    console.log(document.body.height)
    document.body.appendChild(popup);`

  });
}
