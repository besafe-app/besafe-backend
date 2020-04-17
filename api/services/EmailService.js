module.exports={
    sendCode : function(obj) {
        sails.hooks.email.send(
            "codeEmail",
            {
                Name: obj.name,
                code: obj.code,
                accessToken: obj.accessToken
            },
            {
                to: obj.email,
                subject: "Código de Verificação"
            },
            function(err) {
                if(err)
                {
                  console.log('Email not  send sucessfully-',err);
                }
                else
                {
                  console.log('Email send sucessfully');
                }
            }
        )
    },
    sendPass : function(obj) {
        sails.hooks.email.send(
            "passEmail",
            {
                Name: obj.name,
                password: obj.password,
                accessToken: obj.accessToken
            },
            {
                to: obj.email,
                subject: "Recuperação de senha Be safe!"
            },
            function(err) {
                if(err)
                {
                  console.log('Email not  send sucessfully-',err);
                }
                else
                {
                  console.log('Email send sucessfully');
                }
            }
        )
    }
};