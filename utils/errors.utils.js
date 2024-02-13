module.exports.signUpErrors = (err)=>{
    let errors = {pseudo:'',email:'',password:'mauvais password'}

    if(err.message.includes('pseudo')){
        errors.pseudo = "Invalid or already taken username"
    }

    if(err.message.includes('email')){
        errors.email = "Invalid email"
    }

    if(err.message.includes('password')){
        errors.password = 'The password must be at least 6 characters long'
    }

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')){
        errors.pseudo = 'This username is already registered'
    }

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')){
        errors.email = 'This email is already registered'
    }
    
    return errors
}

module.exports.signInErrors = (err)=>{
    let errors = { email:'',password:''}

    if(err.message.includes('email'))
        errors.email = 'Unknown email'
    

    if(err.message.includes('password'))
        errors.password = 'The password is incorrect.'
    
    return errors
}

module.exports.uploadErrors = (err)=>{
    let errors = {format:'',maxSize:''}

    if(err.message.includes('invalid file')){
        errors.format = "Incompatible format"
    }

    if(err.message.includes('max size')){
        errors.format = "The file exceeds 500 kB"
    }
    return errors
}