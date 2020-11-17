function getToken(){
    return localStorage.getItem('token');
}
async function login(event){
    event.preventDefault();
    event.stopPropagation();

    const emailElement= document.querySelector('#email');
    const passwordElenent= document.querySelector('#password');

    try{
        const res = await axios.post('https://api.marktub.tv/v1/me',{
            email,
            password,
        });

        const {token}=res.data;
        if(token===undefined){
            return;
        }
        localStorage.setItem('token',token);
        location= '/';

    }catch(error){
        const data =error.response.data;
        if(data){
            const state= data.error;
            if(state==='user_not_exist'){
                alert('사용자가 존재하지 않습니다');
            }else if(state==='password_not_exixst'{
                alert('비밀번호가 틀렸습니다');
            }
        }
    }

}


function bindLoginButton(){
    const form=document.querySelector('#form-login');
    form.addEventListener('sumit',login);
}
function main(){
    //버튼에 이벤트 연결
    bindLoginButton();
    //토큰 체크
    const token= getToken();
    if(token != null){
        location.assign('/');
        return;
    }
}

document.addEventListener('DOMContentLoded',main);