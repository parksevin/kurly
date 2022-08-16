(function($){

  //입력값 규칙(정규표현식) 어긴경우 false
  var idOk=false;
  var pw1Ok=false;
  var pw2Ok=false;
  var pw3Ok=false;
  var pw4Ok=false;
  var emailOk=false;
  var ok = false;    //휴대폰 인증 확인 true 전역변수

////////////////////////////////////////////////////////////////////////////////////////////////////
//  1. 아이디 입력상자 시작
////////////////////////////////////////////////////////////////////////////////////////////////////
   
    // 1. 아이디 입력상자
    // 마우스가 입력상자에 클릭 다운되면 
    // 가이드 텍스 보이기(show())
    $('#inputId').on({
      mousedown: function(){
        $('.guide-id').show();
      }
    });

    //키보드가 내려가서 올라올때(keyup) 점검
    $('#inputId').on({
        keyup: function(event){
            event.preventDefault();
            var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)-_\=\+\\\{\}\[\]\?\/\.\,\>\<\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
            //var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+(?=.*[^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)-_\=\+\\\{\}\[\]\?\/\.\,\>\<\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
            var idValue = $(this).val().toString();

                if(idValue===''){ //입력값이 없으면 : 글자가 검정 기본값으로 설정
                  $('.guide-id p').eq(0).removeClass('error');
                  $('.guide-id p').eq(0).removeClass('success');
                  idOk=false;
                }
                else{ //입력값이 있으면 정규 표현식 비교 진위여부
                  if( regExp.test(idValue)===true ) {
                    $('.guide-id p').eq(0).addClass('success');
                    $('.guide-id p').eq(0).removeClass('error');
                    idOk=true;
                  }
                  else if( regExp.test(idValue)===false ) {
                    $('.guide-id p').eq(0).removeClass('success'); //클래스가 삭제되어야 에러가 표시
                    $('.guide-id p').eq(0).addClass('error')
                    idOk=false;
                  }
                }

        }
    });

    //아이디 중복 체크 함수
    function idDoubleCheck(){

        //아이디 중복을 체크한다.
        //1. 아이디 입력값
        //2. 로컬스토레이지에 저장된 데이터(데이터베이스) 가져오기
        //3. 가져온 데이터를 아이디만 추출하기        
        //4. 반복 비교하기 $('#inputId').val() === 로컬스토레이지.아이디
        //4-1 같다면 => 이미 등록된 아이디입니다 빨강 알림창 띄우기
        //4-2 다르면 => 사용가능한 아이디입니다 그린 알림창 띄우기
        
        //1. 아이디 입력값
        var inputId = $('#inputId').val();
        // console.log('입력된 글자 ',  inputId );
        var ok = false; //중복확인 변수
        //2. 로컬스토레이지에 저장된 데이터(데이터베이스) 가져오기
        for(let i=0; i<localStorage.length; i++){
            // console.log( localStorage.key(i) );  //key 가져오기
            // console.log( localStorage.getItem(localStorage.key(i)) ); //value 가져오기
            // console.log( JSON.parse(localStorage.getItem(localStorage.key(i))).아이디 ); //JSON 객체변환
            if(JSON.parse(localStorage.getItem(localStorage.key(i))).아이디===inputId){
              ok = true;  //중복이다.
            }
        }

        //반복비교가 끝나고 결과를 가지고 비교한다.
        if(ok===true){
          alert('이미 등록된 아이디입니다.');
          idOk=false;
          $('.guide-id p').eq(1).addClass('error');
          $('.guide-id p').eq(1).removeClass('success');
        }
        else{
          alert('사용가능한 아이디입니다.');
          idOk=true;
          $('.guide-id p').eq(1).removeClass('error');
          $('.guide-id p').eq(1).addClass('success');
        }

    }


    //아이디 버튼 클릭 이벤트
    $('.id-double-btn').on({
      click: function(e){
        e.preventDefault();
        var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)-_\=\+\\\{\}\[\]\?\/\.\,\>\<\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
        var idValue = $('#inputId').val().toString();

            if(idValue===''){ //입력값이 없으면 : 글자가 검정 기본값으로 설정
                $('.guide-id p').eq(0).removeClass('error');
                $('.guide-id p').eq(0).removeClass('success');
                modal('아이디를 입력해주세요.'); //모달창 띄우기
                idOk=false;
                return;
            }
            else{ //입력값이 있으면 정규 표현식 비교 진위여부
                if( regExp.test(idValue)===true ) {
                  $('.guide-id p').eq(0).addClass('success');
                  $('.guide-id p').eq(0).removeClass('error');
                 

                  //중복체크 함수 호출 실행
                  idDoubleCheck();


                }
                else if( regExp.test(idValue)===false ) {
                  $('.guide-id p').eq(0).removeClass('success');
                  $('.guide-id p').eq(0).addClass('error')
                  modal('6자 이상의 영문 혹은 영문과 숫자를 조합만 가능합니다.'); //모달창 띄우기
                  idOk=false;
                  return;
                }
            }
      }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////
//  1. 아이디 입력상자 끝
////////////////////////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////////////////////
//  2. 비밀번호 입력상자 시작
////////////////////////////////////////////////////////////////////////////////////////////////////
    //가이드 텍스트 보이기: 마우스 다운하면
    $('#inputPw').on({
        mousedown: function(){
          $('.guide-pw').show();
        }
    });

    // 3. 동일한 숫자 3개이상 연속 사용 불가
    $('#inputPw').on({
        keyup: function(e){
          e.preventDefault();
          var regExp1 = /.{10,}/; 
          var regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
          var regExp3 = /(.)\1\1/; //긍정문:  숫자 연속사용 3개이상 \1\1
          var pwValue = $(this).val().toString();


              //1. 10자이상 
              if(pwValue===''){
                $('.guide-pw p').eq(0).removeClass('error');
                $('.guide-pw p').eq(0).removeClass('success');
                pw1Ok=false;

              }
              else{
                if(regExp1.test(pwValue)===true){
                  $('.guide-pw p').eq(0).removeClass('error');
                  $('.guide-pw p').eq(0).addClass('success');
                  pw1Ok=true;
                }
                else{
                  $('.guide-pw p').eq(0).removeClass('success');
                  $('.guide-pw p').eq(0).addClass('error');
                  pw1Ok=false;
                }
              }

              //2. 영문필수+(숫자또는특수문자)+ => 2가지 이상 조함
              if(pwValue===''){
                $('.guide-pw p').eq(1).removeClass('error');
                $('.guide-pw p').eq(1).removeClass('success');
                pw2Ok=false;
              }
              else{
                if(regExp2.test(pwValue)===true){
                  $('.guide-pw p').eq(1).removeClass('error');
                  $('.guide-pw p').eq(1).addClass('success');
                  pw2Ok=true;
                }
                else{
                  $('.guide-pw p').eq(1).removeClass('success');
                  $('.guide-pw p').eq(1).addClass('error');
                  pw2Ok=false;
                }
              }
              

              //3. 숫자 3개이상 연속 사용 금지(동일한 숫자 3개 연소 사용 불가)
              if(pwValue===''){
                $('.guide-pw p').eq(2).removeClass('error');
                $('.guide-pw p').eq(2).removeClass('success');
                pw3Ok=false;
              }
              else{
                if(regExp3.test(pwValue)===true){ // 숫자가 연속 3개이상 사용했다면
                  $('.guide-pw p').eq(2).removeClass('success');
                  $('.guide-pw p').eq(2).addClass('error');
                  pw3Ok=false;
                }
                else{ //정상 연속 사용 안함
                  $('.guide-pw p').eq(2).removeClass('error');
                  $('.guide-pw p').eq(2).addClass('success');
                  pw3Ok=true;
                }
              }

        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////
//  2-1. 비밀번호 입력상자 끝
////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////
//  2-2. 비밀번호확인 입력상자 시작
////////////////////////////////////////////////////////////////////////////////////////////////////
// 이전에 입력된 비밀번호와 비교해서 값이 다르면 오류 공백이면 ''공백 아니면(error) 정상(success)
$('#inputPwConfirm').on({
    keyup: function(){

        if($(this).val()===''){
            $('.guide-password-confirm').hide();
            $('.guide-password-confirm p').removeClass('error');
            $('.guide-password-confirm p').removeClass('success');
            pw4Ok=false;
        }
        else{
            // 비밀번호===비밀번호확인 비교
            $('.guide-password-confirm').show();
            if( $('#inputPw').val() === $(this).val() ){
              $('.guide-password-confirm p').removeClass('error');
              $('.guide-password-confirm p').addClass('success');
              pw4Ok=true;
            }
            else{
              $('.guide-password-confirm p').removeClass('success');
              $('.guide-password-confirm p').addClass('error');
              pw4Ok=false;
            }
        }
    }
});




////////////////////////////////////////////////////////////////////////////////////////////////////
//  2-2. 비밀번호확인 입력상자 끝
////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////
//  3. 이름 입력상자 시작
////////////////////////////////////////////////////////////////////////////////////////////////////

$('#inputName').on({
  keyup: function(){

      //영문, 한글, 공백만 입력 나머진 모두 삭제
      $(this).val(   $(this).val().toString().replace(/[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '')   );

  }
});





////////////////////////////////////////////////////////////////////////////////////////////////////
//  4. 이름 입력상자 끝
////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////
//  4. 이메일 입력상자 시작
////////////////////////////////////////////////////////////////////////////////////////////////////
    //입력이 완료되면
    //우측 중복확인 버튼을 클릭하여 
    //입력정보데이터를 정규표현식으로 진위여부를 판단하고
    //입력 데이터 오류가 있으면 알림창을 모달창으로 띄운다.

    //그리고 오류가 없으면(로컬스토레이지에 저장데이터 구현한 후 작업)
    //저장된 데이터 전체와 입력데이터를 비교하여 중복확인한다. \
    
    //이메일 중복 체크 함수
    function emailDoubleCheck(){
      //1. 이메일 입력데이터
      //2. 저장된 로컬스토레이지(데이터) 가져오기
      //3. 가져온데이터에서 이메일 추출 비교 변수 저장
      //4. 저장된 변수 값 비교 중복체크 경고창 뜨우기
      var inputEmail = $('#inputEmail').val();
      var ok = false; 

          for(let i=0; i<localStorage.length; i++){
              if(  JSON.parse(localStorage.getItem( localStorage.key(i) )).이메일 === inputEmail  ){
                  ok=true;
              }
          }

          //중복체크
          if(ok===true){
            alert('중복된 이메일 입니다.');
            emailOk=false;
          }
          else{
            alert('사용가능한 이메일 입니다.');
            emailOk=true;
          }
      
    };




    $('.email-double-btn').on({ //중복확인버튼
      click: function(e){
        e.preventDefault();
        
        var inputEmailValue = $('#inputEmail').val(); //이메일 입력상자
        var inputEmail = $('#inputEmail'); //이메일 입력상자
        var regExpEmail = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        var message = '';    

            //버튼 클릭시 초기화
            inputEmail.removeClass('error');

            if( inputEmailValue ==='' ){ //입력값이 없으면 알림창 띄우기
              message='이메일 주소를 입력해주세요.'; //알림창 만들기   
              modal(message);  //모달함수 전달인자(아규먼트)  
              emailOk=false;       
            }
            else{ //아니면  정규표현식 검증
              if( regExpEmail.test( inputEmailValue ) === false ){
                  inputEmail.addClass('error');
                  inputEmail.focus();
                  message='잘못된 이메일 형식입니다.'; //알림창 만들기
                  modal(message); //모달함수 전달인자(아규먼트)   
                  emailOk=false;
              }
              else{ //정상
                  inputEmail.removeClass('error'); 
                    
                  //이메일 중복 체크 함수 호출 실행
                  emailDoubleCheck();
                  
              }
            }
      }
    });
    
////////////////////////////////////////////////////////////////////////////////////////////////////
//  4. 이메일 입력상자 끝
////////////////////////////////////////////////////////////////////////////////////////////////////
    



    


////////////////////////////////////////////////////////////////////////////////////////////////////
//  5. 휴대폰 번호 입력상자 시작
////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#inputPhone').on({
        keyup: function(e){
          var PhoneValue = $(this).val();
          var regExp1 = /[^0-9]/g;

              //숫자가 아니면 모두 자동 삭체
              $('#inputPhone').val( PhoneValue.replace(regExp1, '') ); //숫자 아닌것 삭제

              if(PhoneValue===''){
                $(this).removeClass('error');
                $('.phone-btn').removeClass('on');
              }
              else{
                
                  if(PhoneValue.length>=10){
                    $('.phone-btn').addClass('on');
                  }
                  else{
                    $('.phone-btn').removeClass('on');
                  }
              }
        }
    });



    //휴대폰 인증번호 받기 클릭이벤트
    $('.phone-btn').eq(0).on({
        click: function(e){
            e.preventDefault();

            var PhoneValue = $('#inputPhone').val();
            var regExp2 = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/;  //10~11 휴대폰
  

                //휴대폰번호에 입력값이 없으면 
                //클릭은 무시한다.
                if( $('#inputPhone').val() < 10 ){
                  return;  //리턴값 없다.
                }

                if(regExp2.test(PhoneValue)===false){                    
                  $('#inputPhone').addClass('error');
                  //알리창 띄우기
                  modal('잘못된 휴대폰 번호 입니다. 확인후 다시 시도해 주세요');
                }
                else{
                  modal('휴대폰으로 인증번호가 전송되었습니다.');
                  $('#inputPhone').removeClass('error');
                  $('#inputPhoneok, .phone-ok-btn, .count-timer').show();
                  //카운트타이머함수 호출실행
                  countTimer();
                }
        }
    });
    var seteId = 0;

    //카운트타이머함수
    function countTimer(){
        //타이머는 3분 
        var seconds = 60;
        var minutes = 2;


            seteId = setInterval(function(){
                seconds--; //초
                if(seconds<0){
                    minutes--; //분
                    seconds=59; //초: 초기화(59~00)
                    if(minutes<0){ 
                      clearInterval(seteId); //타이머종료
                      $('#inputPhoneok, .phone-ok-btn').prop('disabled', true);
                      $('#inputPhoneok, .phone-ok-btn').addClass('ok');                                            
                      modal('인증 제한 시간이 지났습니다.');
                      $('.count-timer').html('');
                      return;
                    }
                }                
                $('.count-timer').html(  minutes + ':' + ( seconds < 10 ? ('0'+seconds) : seconds )  );                

            }, 1000);
    }

    // 인증번호 확인 버튼 클릭 이벤트
    $('.phone-btn').eq(1).on({
        click: function(e){
          e.preventDefault();
          var okkey = '348642';          
          if($('#inputPhoneok').val()===okkey){
             clearInterval(seteId); //타이머종료
             $('#inputPhoneok, .phone-ok-btn').prop('disabled', true);
             $('#inputPhoneok, .phone-ok-btn').addClass('ok');                                            
             $('.count-timer').html('');
             $('#inputPhoneok').val('');
             modal('인증이 확인 되었습니다.');
             ok=true;
             return;
          }
          else{
              modal('다시 한번 인증을 시도해 주세요.');
              return;
          }
        }
    });




////////////////////////////////////////////////////////////////////////////////////////////////////
//  5. 휴대폰 번호 입력상자 끝
////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////
//  6. 주소검색 시작
////////////////////////////////////////////////////////////////////////////////////////////////////

  //주소검색 버튼 클릭 이벤트
  $('#addressBtn').on({
    click:  function(e){
      e.preventDefault();
      $('.address input').show();
      var txt ='';
      var str = '';
          
      
      //주소검색 카카오(다움) 구현

      new daum.Postcode({
        oncomplete: function(data) {
          
          // console.log( data );
          // console.log( data.zonecode ); //우편번호
          // console.log( data.address ); //도로명주소
          // console.log( data.roadAddress ); //도로명주소 국문
          // console.log( data.roadAddressEnglish ); //도로명주소 영문
          // console.log( data.jibunAddress );//지번주소

          $('#inputAddress1').val(`${data.zonecode} ${data.address}`);
          $('#inputAddress2').focus(); //커서 깜박감박 거린다. 입력대기
          $('.guide-transfer').addClass('on');
          //샛별배송|택배배송|배송불가


          str = $('#inputAddress1').val(); //검색 후 데이터 값
           //검색정보 값이 없으면 -1
          //있으면 글자 시작위치의 인덱스 번호          

          if(  str.indexOf('서울') >=0 ){
            txt ='샛별배송';
            $('.guide-transfer h4').removeClass('not')          
          }
          else if( str.indexOf('경기') >=0 ) {
            txt ='샛별배송';
            $('.guide-transfer h4').removeClass('not')          
          }                    
          else if( str.indexOf('제주') >=0 ) {
            txt ='배송불가';
            $('.guide-transfer h4').addClass('not')
          }          
          else if( str.indexOf('제주') >=0 ) {
            txt ='배송불가';
            $('.guide-transfer h4').addClass('not')
          }          
          else if( str.indexOf('울릉') >=0 ) {
            txt ='배송불가';
            $('.guide-transfer h4').addClass('not')
          }
          else if( str.indexOf('독도') >=0 ) {
            txt ='배송불가';
            $('.guide-transfer h4').addClass('not')
          }
          else {              
            txt ='택배배송';
            $('.guide-transfer h4').removeClass('not')         
          }

          $('.guide-transfer h4').text( txt );
          $('#addressBtn').removeClass('address-btn');
          $('.address-text').text('재검색');

        }
      }).open();         

    }
  });
////////////////////////////////////////////////////////////////////////////////////////////////////
//  6. 주소검색 끝
////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////
//  7. 성별 시작
////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////
//  7. 성별 끝
////////////////////////////////////////////////////////////////////////////////////////////////////









////////////////////////////////////////////////////////////////////////////////////////////////////
//  8. 생년월일 구현 알고리즘  시작
////////////////////////////////////////////////////////////////////////////////////////////////////


  // 키업(keyup) 상태 글자단위 확인 삭제 :
  // 생년월일의 입력상자의 값이 숫자가 아니면 모두 제거하는 함수
  function inputBoxRegExpCheck(value){
      var regExp = /[^0-9]/g;
      return value.trim().replace(regExp,'');
  }

  // 생년월일 입력상자 체크함수 
  function birthdayCheck(){
      //현재 년월일 데이터
      var nowYear = new Date().getFullYear(); //년 4자리
      var nowMonth = new Date().getMonth()+1; //월 0~11
      var nowDate = new Date().getDate(); //일
      var nowDay = new Date().getDay(); //요일(0~6) 일요일(0) ~ 토요일(6)
      var nowHours = new Date().getHours(); //시
      var nowMinuts = new Date().getMinutes(); //분
      var nowSeconds = new Date().getSeconds(); //초

      // 현재 년월일
      var today = new Date( nowYear, nowMonth, nowDate );


      // 생년월일 데이터
      var  year  = $('#year').val().trim().toString();  
      var  month = $('#month').val().trim().toString();  
      var  date  = $('#date').val().trim().toString();  

      var  birthLastDate = new Date(year, month, 0); //생년월일-월의마지막날: 말일

      //1. 모두빈값이면 아무 반응안한다.
      if($('#year').val()==='' && $('#month').val()==='' && $('#date').val()===''){
          return;
      }
      else{
              //year
              /* if(/^(?:19\d\d|2\d\d\d)$/g.test(value)===false){ //가이드텍스트 보이기(show()) */
              if(!/^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g.test(year)){ //가이드텍스트 보이기(show())
                  $('.guide-birthday-confirm p').show().text('태어난 년도 4자리를 정확하게 입력해주세요.');
                  return;
              }
              else{  //year 정상                  
                  $('.guide-birthday-confirm p').hide();

                  //month 
                  if(!/^(?:0?[1-9]|1[0-2])$/g.test(month)){
                      $('.guide-birthday-confirm p').show().text('태어난 월을 정확하게 입력해주세요.');                
                      return;
                  }
                  else{   //month 정상
                      $('.guide-birthday-confirm p').hide();
                      
                      //date  
                      //추가항목 : 태어난 월의 말일을 찾아서 본인 생일의 날짜랑 비교 
                      //생일이크면 잘못 입력된 날짜
                      //console.log(date)  //31
                      //console.log(birthLastDate) 
                      //console.log(birthLastDate.getFullYear()) //년
                      //console.log(birthLastDate.getMonth()+1) //월+1 0-11 그래서 더히기 1을 한다.
                      //console.log(birthLastDate.getDate()) //마지막 날(일) 30
                      if(!/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(date)  ||  date > birthLastDate.getDate() ){
                          $('.guide-birthday-confirm p').show().text('태어난 일을 정확하게 입력해주세요.');
                          return; 
                      }
                      else{ //date 정상                          
                          $('.guide-birthday-confirm p').hide();

                          //일까지 모두 정상이면
                          //14세미만
                          // 14세 미만
                          //현재 년도의 년,월,일
                          const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);  //14세 미만 변수
                          const nowYear14 = new Date(nowYear-14, nowMonth, nowDate);  //14세 미만 변수
                          const birthDay  = new Date(year, month, date);  //생년월일


                          //생년월일 모두 입력완료 된 후에 처리할 내용 3가지 : 미래, 14세미만, 120세초과

                          //미래: 오늘 보다 더큰 날짜 는  미래
                          if( birthDay > today ){
                              $('.guide-birthday-confirm p').show().text('생년월일이 미래로 입력되었어요.');
                              return; 
                          }
                          else{
                              $('.guide-birthday-confirm p').hide();
                          }

                          // 14세 미만 체크 확인
                          //  birthDay > nowYear14 14세미만
                          // console.log( nowYear14 );  //2022-14 = 2008
                          // console.log( birthDay );   //2009                           
                          if( birthDay > nowYear14 ){
                              $('.guide-birthday-confirm p').show().text('만 14세 미만은 가입이 불가 합니다.');
                              return; 
                          }
                          else{
                              $('.guide-birthday-confirm p').hide();
                          }                          

                          //120세 초과
                          if( birthDay < nowYear120 ){  //120세 초과 나이 120살 넘는 분들
                              $('.guide-birthday-confirm p').show().text('생년월일을 다시한번 확인해주세요.');
                              return; 
                          }
                          else{
                              $('.guide-birthday-confirm p').hide();
                          }

                      } //date
                  } //month 
              }//year
      } //하나이상 빈칸이 있으면 else
    } // 모두 빈칸인 경우 if

  // 년도 입력상자 이벤트 : keyup, focusin, focusout
  $('#year').on({
      keyup: function(){        
        $(this).val(inputBoxRegExpCheck($(this).val()));
      },
      focusout: function(){
        birthdayCheck();
      }
  });
  // 월 입력상자 이벤트
  $('#month').on({
        keyup: function(){
          $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
          birthdayCheck();
        },
        focusin: function(){
          birthdayCheck();
        }
  });
  // 일 입력상자 이벤트
  $('#date').on({
        keyup: function(){
          $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
          birthdayCheck();
        },
        focusin: function(){
          birthdayCheck();
        }
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //  생년월일 구현 알고리즘  끝
  ////////////////////////////////////////////////////////////////////////////////////////////////////
   







////////////////////////////////////////////////////////////////////////////////////////////////////
//  9. 추가 입력 사항  시작
////////////////////////////////////////////////////////////////////////////////////////////////////
$('.add-radio').on({
    change: function(){
      console.log( $(this).val() )
      $('.add-input-box').show();
      if($(this).val()==='추천인 아이디'){
        //Attribute(어트리뷰트)  속성
        $('#inputAdd').attr("placeholder",'추천인 아이디를 입력해주세요.');
      }
      else{
        $('#inputAdd').attr("placeholder",'참여 이벤트명을 입력해주세요.');
      }
    }
});




  

////////////////////////////////////////////////////////////////////////////////////////////////////
//  9. 추가 입력 사항  끝
////////////////////////////////////////////////////////////////////////////////////////////////////
$('.add-input-box')

  





////////////////////////////////////////////////////////////////////////////////////////////////////
//  10. 약관등록  시작
////////////////////////////////////////////////////////////////////////////////////////////////////

  //체크4 누르면 체크5, 체크6 체크상태 변경
  $('#chk4').on({
    change: function(){
        
        if( $(this).is(':checked') ){  //true
          $('#chk5').prop('checked', true);
          $('#chk6').prop('checked', true);
        }
        else{ //false
          $('#chk5').prop('checked', false);
          $('#chk6').prop('checked', false);
        }
    }
  });



  // 체크5와 체크6 변화따라 체크4의 체크상태 변경
  $('#chk5').on({
    change: function(){
      if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
        $('#chk4').prop('checked', false);
      }
      else{  //모두 true
        $('#chk4').prop('checked', true);
      }
    }
  });

  $('#chk6').on({
    change: function(){
      if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
        $('#chk4').prop('checked', false);
      }
      else{  //모두 true
        $('#chk4').prop('checked', true);
      }
    }
  });



  // 부분체크한 모든 내용은 위에 코딩하고
  // 여기에서는 전체 체크상태를 확인 그리고 카운트 체크하여
  // 변경사항을 반영한다.

  // 체크박스 이벤트
  // .chkbox-btn 7개 반복처리 - each() 메서드 사용
  
  var chkboxBtn = $('.chkbox-btn');

  chkboxBtn.each(function(idx){
      // console.log( idx );
      $(this).on({
        change: function(){
        // click: function(){
          //console.log( idx );  //선택한 체크박스 인덱스 번호
          //console.log( $(this).is(':checked') ); //체크 상태 확인
          //console.log( $(this).val() );  //선택 항목의 값

          var cnt=0;  //카운트 체크박스 체크된것만 전체갯수 증가하는 변수
          for(var i=0; i<chkboxBtn.length; i++){
            if(chkboxBtn.eq(i).is(':checked')===true){ //7개를 반복 확인
              cnt++;
            }
          }
          //선택된 체크박스 갯수 확인
          // console.log( cnt );
          if(cnt===7){
            $('#chkAll').prop('checked', true);  //전체선택(chkAll)을 선택 체크  true 한다.
          }
          else{
            $('#chkAll').prop('checked', false);  //전체선택(chkAll)을 선택 체크 해제 false 한다.
          }
        }
      });
  });


  //모두 체크하는 chkAll 버튼 이벤트
  $('#chkAll').on({
    change: function(){
      
      if( $(this).is(':checked') ){ //chkAll 체크가 true 이면        
        $('.chkbox-btn').prop('checked', true); //7개 모두를 체크 하세요
      }
      else{   //chkAll 체크가 false 이면  
        $('.chkbox-btn').prop('checked', false);//7개 모두를 체크 해제 하세요
      }
    }
  })

////////////////////////////////////////////////////////////////////////////////////////////////////
// 10.  약관등록  끝
////////////////////////////////////////////////////////////////////////////////////////////////////











////////////////////////////////////////////////////////////////////////////////////////////////////
//  10. 모달창[중복확인 버튼 이벤트, 인증번호받기 버튼 이벤트]  시작
////////////////////////////////////////////////////////////////////////////////////////////////////

  //모달창 이벤트 함수
  function modal(m){
    $('.modal-message').text( m );
    $('#modal').addClass('show');       
  }

  $('.modal-close').on({
    click: function(){
      $('#modal').removeClass('show'); 
    }
  });


////////////////////////////////////////////////////////////////////////////////////////////////////
//  모달창  끝
////////////////////////////////////////////////////////////////////////////////////////////////////




  //전송버튼 클릭 이벤트
  $('.submit-btn').on({
      click: function(e){
        e.preventDefault();  //submit() 기능을 막는다.

        var idVal = $('#inputId').val();        //1. 아이디(필수)
        var pwVal = $('#inputPw').val();        //2. 비밀번호(필수)
        var nameVal = $('#inputName').val();    //3. 이름(필수)
        var emailVal = $('#inputEmail').val();  //4. 이메일(필수)
        var phoneVal = $('#inputPhone').val();  //5. 휴대폰(필수)
        var addressVal = $('#inputAddress1').val() + ' ' + $('#inputAddress2').val(); //6. 주소(필수)
        var genderVal = '';                      //7. 성별(선택)
        var birthDayVal = $('#year').val()+'-'+$('#month').val()+'-'+$('#date').val() ;//8. 생년월일
        var addInputVal = '';                    //9. 추가입력 사항(선택)
        var serviceVal = [];  //누적보관          //10. 약관등록(선택)  

        //7. 성별 
        if($('#male').is(':checked')){
          genderVal = $('#male').val();
        }
        else if($('#female').is(':checked')){
          genderVal = $('#female').val();
        }
        else{
          genderVal = $('#none').val();
        }

        //9. 추가입력
        if($('#add1').is(':checked')){
          addInputVal = $('#add1').val();
        }
        else{
          addInputVal = $('#add2').val();
        }


        //10. 약관동의        
        // serviceVal.push('누적할 체크박스값');
        //반복문 사용하여 체크상자가 선택된 값을 배열에 저장한다.
        $('.chkbox-btn').each(function(idx){
            if( $(this).is(':checked') === true ){              
              serviceVal.push( $(this).val() );
            }
        });


        //필수 입력사항 ==============================================================
        //반드시 입력되어야 하는 사항
        //만약 하나라도 필수 입력사항이 빠지면
        //전송 취소 그리고 입력 대기
        //약관동의는 필수 선택사항

        //체크박스 필수 항목 체크 카운트 3개필수
        var cnt=0;
        for(var i=0; i<serviceVal.length; i++){
          if( serviceVal[i].indexOf('필수') !==-1 ){ //3개 필수
              cnt++;
          }
        }

        if(idVal==='' || pwVal==='' || nameVal==='' || emailVal==='' || phoneVal==='' || addressVal==='' || cnt<3 || ok === false ||  $('#inputAddress2').val()==='' ){          
          
            if(idVal===''){
              alert('아이디를 입력하세요.')
            }
            else if(pwVal===''){
              alert('비밀번호를 입력하세요.')
            }
            else if(nameVal===''){
              alert('이름을 입력하세요.')
            }
            else if(emailVal===''){
              alert('이메일을 입력하세요.')
            }
            else if(phoneVal===''){
              alert('휴대폰 번호를 입력하세요.')
            }
            else if(addressVal===''){
              alert('주소를 입력하세요.')
            }
            else if($('#inputAddress2').val()===''){
              alert('나머지 주소를 입력하세요.')
            }
            else if(cnt<3){
              alert('필수 약관동의를 선택하세요.')
            }
            else if(ok===false){
              alert('휴대폰 인증을 하세요.')
            }

            return; //전송취소
        }
        else if(idOk===false || pw1Ok===false || pw2Ok===false || pw3Ok===false || pw4Ok===false ||emailOk===false){          
            if(idOk===false){
              alert('아이디를 확인하세요.');
            }
            else if(pw1Ok===false){
              alert('비밀번호는 10자 이상입니다.');
            }
            else if(pw2Ok===false){
              alert('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합 하세요.');
            }
            else if(pw3Ok===false){
              alert('동일한 숫자 3개 이상 연속 사용 불가 합니다.');
            }
            else if(pw4Ok===false){
              alert('동일한 비밀번호를 입력해주세요.');
            }          
            else if(emailOk===false){
              alert('이메일을 확인하세요.');
            }
            return; //전송취소
        }
        else{
        
            //저장할 데이터 확인
            //저장데이터를 최종 객체(Object)로 변환후 그리고            
            //스트링(JSON.stingfy())으로 변환 로컬스토레이지에 저장
            // console.log( idVal, pwVal, nameVal, emailVal, phoneVal, addressVal, birthDayVal, addInputVal, serviceVal);
            //정형화된 객체로 저장
            var 회원가입 = {
                아이디:idVal,
                비밀번호:pwVal,
                이름:nameVal,
                이메일:emailVal,
                휴대폰:phoneVal,
                주소:addressVal,
                생년월일:birthDayVal,
                추가입력사항:addInputVal,
                이용약관:serviceVal
            }

            //로컬스테레이지 저장
            //localStorage.setItem( key , value); //
            localStorage.setItem(회원가입.아이디, JSON.stringify(회원가입)); //
            format(); //초기화 호출 실행
           
        }

        function format(){
            //초기화
            $('#inputId').val('');
            $('#inputPw').val('');
            $('#inputPwConfirm').val('');
            $('#inputName').val('');
            $('#inputEmail').val('');
            $('#inputPhone').val('');
            $('#inputAddress1').val('');
            $('#inputAddress2').val('');
            $('#year').val('');
            $('#month').val('');
            $('#date').val('');
            serviceVal = [];

            //라이오 버튼 초기화
            //성별 
            $('#male').prop('checked', false);
            $('#female').prop('checked', false);
            $('#none').prop('checked', false);
            //추가입력
            $('#add1').prop('checked', false);
            $('#add2').prop('checked', false);
            //체크박스 초기화
            //약관동의
            //전체
            $('#chkAll').prop('checked', false);
            //7개 체크
            $('.chkbox-btn').each(function(){
                $(this).prop('checked', false);
            });
            //모든 입력제한으로 인한 클래스 지정 속성들 초기화
            
            $('.guide-text').hide();
            $('.guide-id p').removeClass('error');
            $('.guide-id p').removeClass('success');
            $('.guide-pw p').removeClass('error');
            $('.guide-pw p').removeClass('success');
            $('.guide-password-confirm').hide();
            $('.guide-password-confirm p').removeClass('error');
            $('.guide-password-confirm p').removeClass('success');        
            $('#inputEmail').removeClass('error');              
            $('.phone-btn').removeClass('on'); 
            $('#inputPhone').removeClass('error');
            $('.guide-birthday-confirm p').hide();

            $('.address input').hide();            
            $('#addressBtn').addClass('address-btn');
            $('.address-text').text('검색');
            
            $('#inputPhoneok, .phone-ok-btn, .count-timer').hide();
            $('#inputPhoneok, .phone-ok-btn').prop('disabled', false); //Enabled
            $('#inputPhoneok, .phone-ok-btn').removeClass('ok');     
            
            //$('#inputId').focus(); //아이디 입력상자 위치에서 커서 깜빡깜빡 포커스
            
          }
            
      }
  }); //전송버튼 클릭 이벤트 끝.


})(jQuery);