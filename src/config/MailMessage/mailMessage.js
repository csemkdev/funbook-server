module.exports = mailMessage = (mailBody) => {
    return `
        <div>
            <div style=" background: #005CE4; width:100%;">
                <div style=" padding: 20px 5px; ">
                    <div>
                        <div>
                            <div style="width: 100%; text-align: center;">
                                <img style="width: 240px;"
                                    src='${process.env.ICON_IMAGE}' />
                            </div>
                        </div>
                        <div>
                            <div style="background: #fff;
                            margin-top: 10px;
                            padding: 10px 20px;
                            border-radius: 10px;
                            text-align: center;">
                                <div style="min-height: 300px;">
                                    <div>${mailBody}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style="text-align: center; color: white; ">
                        <div>If you encounter any problem, please contact us at <strong><a href="mailto:${process.env.CONTACT_US}" target="_blank" style="
                        color: white;
                    ">${process.env.CONTACT_US}</a></strong> </div>
                        <br />
                        <div>©2021 ${process.env.APP_NAME}. All rights reserved.</div>
                        <div style="text-align: end; color: white; margin: 20px; font-size: 10px;">${Date.now()}</div>
                    </div>
                </div>
            </div>
        </div>
    `
}