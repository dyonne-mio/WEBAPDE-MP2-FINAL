var signUpForm = $('#sign-up-form');
var signUpBtn = $('#sign-up-btn');


signUpBtn.click(function(){
	var formData = signUpForm.getFormData();
	//formData.birth_date = new Date(formData.birth_date);

	var hasEmpty = false;

	signUpForm.find('input').each(function(){
		if(!$(this).val()){
			console.log(1);
			$(this).focus();
			hasEmpty = true;
			return false;
		}
	})

	if(hasEmpty) return;

	if(formData.password !== formData.r_password){
		error('Error', 'Password Mismatch.');
		return;
	}

	xhrj(
		'/user/sign-up',
		formData,
		function(response){
			if(response.status === 0){
				success('Sign up successful!', 'You have successfully created an account!', function(){
					window.location.href = "/user/dashboard/";
				});
			}else{
				error('Error', 'Sign up failed :(');
			}
		}
	)
});

//xhrj('/login', {data}, callback, callback_failed);