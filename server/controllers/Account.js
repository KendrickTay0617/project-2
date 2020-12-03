const models = require('../models');

const { Account } = models;
//renders the login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// const signupPage = (req, res) => {
//  res.render('signup', { csrfToken: req.csrfToken() });
// };

// lets user sign out and go back to the default login page
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

//authenticate user by asking for username and password before logging in
const login = (request, response) => {
  const req = request;
  const res = response;

  // force cast to strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

// lets user sign up by inputting a unique username and password as well as retyping the password in case of typo error
const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'RAWR! Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });

      //catch errors
    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

//update user's account by changing usernames and passwords
const updateAccount = (request, response) => {
    const req = request;
    const res = response;
    
    // cast to strings to cover up some security flaws
    req.body.username = `${req.body.username}`;
    req.body.pass = `${req.body.pass}`;
    req.body.pass2 = `${req.body.pass2}`;
    
    if (!req.body.username || !req.body.pass || !req.body.pass2) {
        return res.status(400).json({ error: 'RAWR! All fields are required' });
    }

    if (req.body.pass !== req.body.pass2) {
        return res.status(400).json({ error: 'RAWR! Passwords do not match' });
    }
    
    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
        const accountData = {
            username: req.body.username,
            salt,
            password: hash,
        };

        Account.AccountModel.updateOne({_id: req.session.account._id}, accountData, function(err) {
            if (err) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            
            return res.status(200);
        });
        
        res.json({ redirect: '/maker' });
    });
}

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.updateAccount = updateAccount;
module.exports.getToken = getToken;
