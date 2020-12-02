function sendEmail() {
Email.send({
    Host : "smtp.mailtrap.io",
    Username : "<Mailtrap username>",
    Password : "<Mailtrap password>",
    To : 'gitiklar@gmail.com',
    From : "gitiklar@gmail.com",
    Subject : "Test email",
    Body : "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
}).then(
  message => alert(message)
);
}