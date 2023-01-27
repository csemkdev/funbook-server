module.exports = OTPMailMessage = (OTP) => {
    return (`
        <div>
            <div style="color: #353535;">
                <div style='height: 160px; margin-bottom: 40px;' }}>
                    <img style='width: 240px;'
                        src="https://res.cloudinary.com/mayurkamble/image/upload/v1632983921/icon/ofxp8e2ghdiodfggfe8e.gif"
                        alt='SendMail gif' />
                </div>
                <h3>Hi!</h3>
                <h2>One-Time PIN</h2>
                <p>Here is the confirmation code for your online form:</p>
                <h1>${OTP}</h1>
                <p>All you have to do is copy the confirmation code and paste it to your form to
                    complete the email verification process.</p>
            </div>
        </div>
    `)
}