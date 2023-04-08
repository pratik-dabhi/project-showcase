function validate(){
    let pass1 = document.getElementById('pass-1').value;
    let pass2 = document.getElementById('pass-2').value;
    
    
    if(pass1 != pass2 && pass1.length < 6){
         window.alert('Password is not matched');
        return false;
    }
    else{
        // alert('Password is matched')
        return true;
    }
}