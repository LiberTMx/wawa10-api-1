import { Injectable } from '@nestjs/common';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';
import * as nodemailer from 'nodemailer';
import * as sendmail from 'sendmail';

import * as log4js from 'log4js';
import { MessageDTO } from '../../../../shared/dto/contact/message.dto';
import { EmailDestinationType } from '../../types/email-destination-type.enum';
const logger = log4js.getLogger('MailService');

enum MailTranportType
{
    sendmail,
    nodemailer,
}

@Injectable()
export class MailService 
{

    //mailTranportType: MailTranportType = MailTranportType.nodemailer;
    //mailTranportType: MailTranportType = MailTranportType.sendmail;

    /*
        Adresse mail partagée:
        ctt.limal.wavre.site2@gmail.com
        Site2$2020
    */

    /*
   sendMailToUser(user: AuthUserEntity, messageDTO: MessageDTO): void
   {
        const env = process.env.site2_env;
        logger.debug('Sending message by email - env: '+env);

        logger.debug('Received user message to be relayed: ', messageDTO);

        let mailTo='guy.kaisin@gmail.com';
        mailTo+=', secretariat@liwa.be';

        const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        //port: 587,
        //secure: false,
        auth: {
            user: 'ctt.limal.wavre.site2@gmail.com',
            pass: 'Site2$2020',
        },
        });

        const mailOptions = {
            from: 'CTT Limal-Wavre - Contact <ctt.limal.wavre.site2@gmail.com>',
            to: mailTo,
            subject: 'Test Contact nouveau site: '+messageDTO.subject,
            html: messageDTO.message,
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

    sendMailToUser_old(user: AuthUserEntity, message: string): void
    {
        switch(this.mailTranportType)
        {
            case MailTranportType.nodemailer: 
                this.nodemailer_sendMailToUser(user, message);
                break;
            case MailTranportType.sendmail:
                this.sendmail__sendMailToUser(user, message);
                break;
        }
    }

    private sendmail__sendMailToUser(user: AuthUserEntity, message: string): void
    {
        const env = process.env.site2_env;
        logger.debug('Sending message by email - env: '+env);

        logger.debug('Received user message to be relayed: ', user, message);

        let mailTo='guy.kaisin@gmail.com';
        mailTo+=', secretariat@liwa.be';

        sendmail.sendmail({
            from: 'liwanuop@90plan.ovh.net',
            //from: 'CTT Limal-Wavre - Contact <liwanuop@90plan.ovh.net>',
            to: mailTo,
            //replyTo: 'jason@yourdomain.com',
            subject: 'CTT Limal-Wavre - Info',
            html: message,
          }, (err, reply) => {
            logger.error(err && err.stack);
            logger.debug(reply);
        });
    }

    private nodemailer_sendMailToUser(user: AuthUserEntity, message: string): void
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
        * /

        const mailTo='guy.kaisin@gmail.com';

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            //port: 587,
            //secure: false,
            auth: {
                user: 'ctt.limal.wavre.site2@gmail.com',
                pass: 'Site2$2020',
            },
         });
        
        /*
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'art40@ethereal.email',
                pass: 'kHKY2KRX4338xwCvGq',
            },
        });
        * /
        
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
    */

    /*
    sendMessage(messageDTO: MessageDTO): void
    {
        switch(this.mailTranportType)
        {
            case MailTranportType.nodemailer: 
                this.nodemailer_sendMessage(messageDTO);
                break;
            case MailTranportType.sendmail:
                this.sendmail_sendMessage(messageDTO);
                break;
            default:
                logger.error('transport type not supported!', this.mailTranportType);
        }
    }
    /*

    private /*nodemailer_sendMessage*/ sendMessage(messageDTO: MessageDTO): void
    {
        const env = process.env.site2_env;
        logger.debug('Sending message by email - env: '+env);

        logger.debug('Received user message to be relayed: ', messageDTO);

        let mailTo='guy.kaisin@gmail.com';
        mailTo+=', secretariat@liwa.be';

        if(messageDTO.destinationType === EmailDestinationType.TO_USER)
        {
            logger.debug('Prepare message for user', mailTo, messageDTO.email);
            mailTo=messageDTO.email;
            // messageDTO.message='USER message intercepté';
        }

        const transporter = nodemailer.createTransport({
           service: 'gmail',
           /*
           host: 'smtp.gmail.com',
           port: 465,
           secure: true,
           //port: 587,
           //secure: false,
           */
           auth: {
               user: 'ctt.limal.wavre.site2@gmail.com',
               pass: 'Site2$2020',
           },
        });

        const mailOptions = {
            from: 'CTT Limal-Wavre <ctt.limal.wavre.site2@gmail.com>',
            to: mailTo,
            subject: messageDTO.subject,
            html: this.buildMessageAsHtml(messageDTO),
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(error);
            } else {
                logger.debug('Email sent: ' + info.response);
            }
        });

        //transporter.close();
    }

    buildMessageAsHtml(message: MessageDTO): string
    {
        switch(message.destinationType)
        {
            case EmailDestinationType.TO_CLUB:
                return this.buildMessageAsHtmlForClub(message);
            default: 
                return message.message;
        }
    }

    buildMessageAsHtmlForClub(message: MessageDTO): string
    {
        return '<html> '+
            '<head> '+
            '   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> '+
            '   <title>CTT Limal-Wavre - Message Externe</title> '+
            '</head> '+
            '<body> '+
            '<h3>Message</h3>'+
            message.message +
            '<br/> '+
            '<h3>Origine</h3>'+
            '<p>Nom: '+message.name+'</p>'+
            '<br/> '+
            '</body> '+
            '</html> ';
    }

    /*
    private sendmail_sendMessage(messageDTO: MessageDTO): void
    {
        const env = process.env.site2_env;
        logger.debug('Sending message by email - env: '+env);

        logger.debug('Received user message to be relayed: ', messageDTO);

        let mailTo='guy.kaisin@gmail.com';
        mailTo+=', secretariat@liwa.be';

        sendmail({
            from: 'liwanuop@90plan.ovh.net',
            //from: 'CTT Limal-Wavre - Contact <liwanuop@90plan.ovh.net>',
            to: mailTo,
            //replyTo: 'jason@yourdomain.com',
            subject: 'Test Contact nouveau site: '+messageDTO.subject,
            html: messageDTO.message,
          }, (err, reply) => {
            logger.error(err && err.stack);
            logger.debug(reply);
        });
    }
    */
}
