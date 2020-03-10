import { Injectable } from '@nestjs/common';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';
import * as nodemailer from 'nodemailer';

import * as log4js from 'log4js';
const logger = log4js.getLogger('MailService');

@Injectable()
export class MailService 
{

    /*
        Adresse mail partagée:
        ctt.limal.wavre.site2@gmail.com
        Site2$2020
    */
    sendMailToUser(user: AuthUserEntity, message: string): void
    {
        logger.debug('sending mail to user:'+user.username, message);
        /*
        sendmail.sendmail({
            from: 'no-reply@liwa.be',
            to: 'guy.kaisin@gmail.com',
            subject: 'test sendmail',
            html: 'Mail of test sendmail: '+message,
          }, (err, reply) => {
            logger.debug(err && err.stack);
            logger.debug(reply);
        });
        */

        const mailTo='guy.kaisin@gmail.com';

        const transporter = nodemailer.createTransport({
            /*
            service: 'gmail',
            auth: {
            user: 'ctt.limal.wavre.site2@gmail.com',
            pass: 'Site2$2020',
            },
            */

           host: 'smtp.gmail.com',
           port: 465,
           secure: true,
           auth: {
               user: 'ctt.limal.wavre.site2@gmail.com',
               pass: 'Site2$2020',
           },
            
        });
        
        const mailOptions = {
            from: 'CTT Limal-Wavre <ctt.limal.wavre.site2@gmail.com>',
            to: mailTo,
            subject: 'Sending Email using Node.js',
            html: message,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(error);
            } else {
                logger.debug('Email sent: ' + info.response);
            }
        });

        transporter.close();
      
    }
}
