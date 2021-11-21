module.exports = {
    badLoginOrPassword: {
        code : 401,
        message: 'Invalid login or password.'
    },
    loginOrEmailExists: {
        code : 401,
        message: 'That login or email exists.'   
    },

    registered: {
        code : 200,
        message : 'Registered succesfully'
    },
    loggedIn: {
        code : 200,
        message : 'Logged in succesfully'
    },
    modalStyle : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    
};