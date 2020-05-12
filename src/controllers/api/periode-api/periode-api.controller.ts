import { Controller, Get, Request, Post, Body, BadRequestException, Headers } from '@nestjs/common';
import { PeriodeEntity } from '../../../modules/repository/periode/entities/periode.entity';
import { CreatePeriodeDTO } from '../../../shared/dto/periode/create-periode.dto';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { PeriodeService } from '../../../modules/periode/services/periode.service';

import * as log4js from 'log4js';
const logger = log4js.getLogger('PeriodeApiController');

@Controller('periode')
export class PeriodeApiController 
{
    constructor(
        private readonly authService: AuthService,
        private readonly periodeService: PeriodeService,
    ) {}

    @Get('periodes')
    async getAllPeriodes(@Request() req): Promise< PeriodeEntity[] >
    {
      return await this.periodeService.getAllPeriodes();
    }

    @Post('createPeriode')
    async createPeriode(@Request() req, @Headers() headers): Promise< PeriodeEntity >
    {
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        /*
        Creating periode using data {
            "periodeFormValue":
                {
                    "nom":"Test de période",
                    "description":"Une période pour vérifier la construction des entraînements et des stages",
                    "datesForm":
                        {
                            "dateDebut":"04/05/2020",
                            "dateFin":"30/06/2020"
                        },
                    "domainesForm":
                        {
                            "isForEntrainements":true,
                            "isForStages":true
                        }
                }
            }

        */
        

        const data=req.body.periodeFormValue;

        const createPeriodeDTO=new CreatePeriodeDTO();
        createPeriodeDTO.nom=data.nom;
        createPeriodeDTO.description=data.description;
        createPeriodeDTO.dateDebut=this.getDateFromString(data.datesForm.dateDebut);
        createPeriodeDTO.dateFin=this.getDateFromString(data.datesForm.dateFin);
        createPeriodeDTO.isForEntrainements=Boolean(data.domainesForm.isForEntrainements);
        createPeriodeDTO.isForStages=Boolean(data.domainesForm.isForStages);
        logger.debug(createPeriodeDTO);
        return await this.periodeService.createPeriode(createPeriodeDTO, connectedUser);
    }

    private getDateFromString(sDate: string): Date
    {
        const year = +sDate.substr(6, 4);
        const month = (+sDate.substr(3, 2) ) - 1;
        const day = +sDate.substr(0, 2);
        return new Date(year, month, day);
    }
}
