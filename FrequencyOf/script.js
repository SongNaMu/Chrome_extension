function matching(user){
  chrome.tabs.executeScript({
    code:'document.querySelector("body").innerText;'
  }, function(result){
    //위의 코드가 실행된 후에 이 함수를 호출해 주세요. 그때 결과 값을 result라는 변수에 담아주세요
    var bodyText = result[0];
    var bodyNum = bodyText.split(' ').length;
    var myNum = bodyText.match(new RegExp('\\b('+user+')\\b', 'gi')).length;
    var per = myNum / bodyNum * 100;
    //per라는 변수의 소수점을 원하는 자릿수로 고정
    per = per.toFixed(1);

    // id 값이 result인 태그에 결과를 추가한다.
    document.querySelector('#result').innerText = myNum + '/' + bodyNum + ' (' + per + '%)';
  });
}

//크롬 스토리지에 저장된 값을 가져오세요.
chrome.storage.sync.get(function(data){
  // #user의 값으로 data의 값을 입력해 주세요.
  document.querySelector('#user').value = data.userWords;
  //분석해서 그 결과를 result에 넣어주세요.
  matching(data.userWords);
});

//컨텐츠 페이지의 #usertextarea 입력된 값이 변경되었을 '때'
document.querySelector('#user').addEventListener('change', function(){
  //컨텐츠 페이지에 등장하는 몇개의 단어가 등장하는지 계산 해 주세요.
  var user = document.querySelector('#user').value;
  // 크롬 스토리지에 입력값을 저장한다.
  chrome.storage.sync.set({
    userWords:user
  });
  matching(user);
});



// 컨텐트 페이지 : 내가 보고있는 페이지
//팝업 페이지 : popup.html 즉 내가 만든 확장프로그램 페이지

//컨텐트 페이지의 모든 텍스트를 가져온다.
//그 결과를 bodyText 변수에 담는다.

//var bodyText = document.querySelector('body').innerText;
//alert(bodyText);

//크롬 확장의 기능 중에 tabs과 관련된 기능 중에 컨텐츠 페이지를 대상으로 코드를 실행해 주세요.
//크롬 확장만을 위한 객체 chrome
