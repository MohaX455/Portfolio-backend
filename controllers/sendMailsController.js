import nodemailer from 'nodemailer'

export const sendMail = async (req, res) => {

    const { name, email, subject, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            replyTo: email,
            subject: `Nouveau message: ${subject}`,
            html: `
            <h3>Vous avez reçu un message depuis le formulaire de contact :</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
        `
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({ message: 'Message envoyé avec succès !' })
        console.log('Message envoyé avec succès à l\'admin !')
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erreur lors de l\' envoi de l\'email' })
    }

}