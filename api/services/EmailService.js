module.exports = {
  sendCode(obj) {
    sails.hooks.email.send(
      'codeEmail',
      {
        Name: obj.name,
        code: obj.code,
        accessToken: obj.accessToken,
      },
      {
        to: obj.email,
        subject: 'Código de Verificação',
      },
      (err) => {
        if (err) {
          console.info('Email not send sucessfully-', err);
        } else {
          console.info('Email send sucessfully');
        }
      },
    );
  },
  sendPass(obj) {
    sails.hooks.email.send(
      'passEmail',
      {
        Name: obj.name,
        password: obj.password,
        accessToken: obj.accessToken,
      },
      {
        to: obj.email,
        subject: 'Recuperação de senha Be safe!',
      },
      (err) => {
        if (err) {
          console.info('Email not send sucessfully-', err);
        } else {
          console.info('Email send sucessfully');
        }
      },
    );
  },
};
