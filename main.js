function validateForm(data) {
  let isValid = true;

  // ID 유효성 검사 (예: 최소 4자)
  if(data.id.length < 4) {
      document.getElementById("idWarning").textContent = "ID는 최소 4자 이상이어야 합니다.";
      document.getElementById("idWarning").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("idWarning").style.display = "none";
  }

  // 이메일 형식 검사
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  if(!emailRegex.test(data.email)) {
      document.getElementById("emailWarning").textContent = "유효하지 않은 이메일 형식입니다.";
      document.getElementById("emailWarning").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("emailWarning").style.display = "none";
  }

  return isValid;
}


document.getElementById("myFormAdd").addEventListener('submit', function(e) {
  e.preventDefault(); // 폼의 기본 제출 동작 방지
  const formData = new FormData(document.getElementById("myFormAdd"));
  const data = Object.fromEntries(formData.entries());
  if(validateForm(data)){
    async function fetchData(data){
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if(!response.ok){
          throw new Error('데이터 추가 실패');
        }
        const newData = await response.json();
        console.log('데이터 추가 성공',newData)
      } catch (error) {
        console.error('서버에러입니다.', error)
      }
    }
    fetchData(data);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const checkForm = document.getElementById('checkForm');
  const messageEle = document.getElementById('messageblock');
  checkForm.addEventListener('submit', function(e) {
      e.preventDefault(); // 폼 기본 제출 동작 방지
      const userId = document.getElementById('checkId').value;
      async function checkData(userId){
        const response = await fetch("http://localhost:3000/users");
        const jsonData = await response.json();
        const boolean = jsonData.find(user=>user.id === userId)
        if(boolean){
          messageEle.textContent = `${boolean.id}아이디는 존재합니다.`
          messageEle.style.color = 'green'
        }else{
          messageEle.textContent = `${userId} 아이디는 존재하지않습니다.`
          messageEle.style.color = 'red'
        }
        messageEle.style.display = 'block'
      }
      checkData(userId);
  });
});



// async function logJSONData() {
//   const response = await fetch("http://localhost:3000/users");
//   const jsonData = await response.json();
//   console.log(jsonData.user);
// }
// logJSONData();