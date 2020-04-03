import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as log4js from 'log4js';
import * as soap from 'soap';
import { response } from 'express';
import { TeamListResponse } from '../../../shared/dto/admin/team-list-response.dto';

const logger = log4js.getLogger('SoapService');

enum SoapClientType
{
    AFTT,
    VTTL,
}

@Injectable()
export class SoapService 
{

    afttWsld: string=null;
    vttlWsdl: string=null;
    
    constructor()
    {
        this.loadWsdlFile();
    }

    loadWsdlFile()
    {
        const cwd = process.cwd();
        try {
            this.afttWsld = fs.readFileSync( cwd + '/config/wsdl/aftt.tabt.wsdl.xml', 'utf8');
            //logger.info(this.afttWsld);    
        } catch(e) {
            logger.error('Error:', e.stack);
        }

        try {
            this.vttlWsdl = fs.readFileSync( cwd + '/config/wsdl/vttl.tabt.wsdl.xml', 'utf8');
            //logger.info(this.vttlWsdl);    
        } catch(e) {
            logger.error('Error:', e.stack);
        }
    }

    getCredentials(): any
    {
        return {Account: 148858, Password: 2099};
    }

    /*

    function getTabtApiSaopClient()
    {
        $this->checkHttpProxyUsage();

        $url=self::WSDL_FILENAME;
        $endpoint= 'https://resultats.aftt.be/api';
        
        $options = array(
            'location'      => $endpoint,
            'keep_alive'    => true,
            'trace'         => true,
            //'local_cert'    => $certificate,
            //'passphrase'    => $password,
            'cache_wsdl'    => WSDL_CACHE_NONE
        );
        
        $tabt = new SoapClient( $url, $options );
        return $tabt;
    }
    */

    async getTeamList(stringify: boolean = false): Promise<any>
    {
        /*
        $Credentials = array('Account'  => self::VTTL_ACCOUNT_USER,
                'Password' =>self::VTTL_ACCOUNT_PSWD);
             
        $Response = $tabt->GetClubTeams(
            array('Credentials' => $this->getTabtCredentials(), 
                    'Club' => self::MY_CLUB_INDICE,
            ));
        */
        const credentials=this.getCredentials();
        const args={ Credentials: credentials, Club: 'bbw123'};
        const cwd = process.cwd();
        let url= cwd + '/config/wsdl/aftt.tabt.wsdl.xml';
        url='https://resultats.aftt.be/api/?wsdl';

        const p2=new Promise( (resolve, reject) => {
            soap.createClient(url /*this.afttWsld*/ , (err, client) => {
                if(client==null || client===undefined)
                {
                    logger.warn('client is null !', err);
                    resolve({data:null, err});
                }
                else
                {
                    client.GetClubTeams(args, (err1, result) => {
                        //logger.error('err?', err);
                        //logger.info(JSON.stringify(result) );
                        if(err1)
                        {
                            logger.warn('Error calling client.GetClubTeams', err1);
                            resolve({data:null, err: err1});
                        }
                        else
                        {
                            if(stringify)
                            {
                                const resp=JSON.stringify(result);
                                resolve({data: resp, err: null});
                            }
                            else
                            {
                                resolve({data: result, err: null});
                            }
                            
                        }
                    });
                }
            });
        });
        return p2;

    }

    async getDivisionList(stringify: boolean = false): Promise<any>
    {
        /*
        $Credentials = array('Account'  => self::VTTL_ACCOUNT_USER,
                'Password' =>self::VTTL_ACCOUNT_PSWD);
             
        $Response = $tabt->GetClubTeams(
            array('Credentials' => $this->getTabtCredentials(), 
                    'Club' => self::MY_CLUB_INDICE,
            ));
        */
        const credentials=this.getCredentials();
        const args={ Credentials: credentials, Club: 'bbw123'};
        const cwd = process.cwd();
        let url= cwd + '/config/wsdl/aftt.tabt.wsdl.xml';
        url='https://resultats.aftt.be/api/?wsdl';

        const p2=new Promise( (resolve, reject) => {
            soap.createClient(url /*this.afttWsld*/ , (err, client) => {
                if(client==null || client===undefined)
                {
                    logger.warn('client is null !', err);
                    resolve({data:null, err});
                }
                else
                {
                    client.GetDivisions(args, (err1, result) => {
                        //logger.error('err?', err);
                        //logger.info(JSON.stringify(result) );
                        if(err1)
                        {
                            logger.warn('Error calling client.GetDivisions', err1);
                            resolve({data:null, err: err1});
                        }
                        else
                        {
                            if(stringify)
                            {
                                const resp=JSON.stringify(result);
                                resolve({data: resp, err: null});
                            }
                            else
                            {
                                resolve({data: result, err: null});
                            }
                        }
                    });
                }
            });
        });
        return p2;

    }

    async getMatches(stringify: boolean = false): Promise<any>
    {
        const credentials=this.getCredentials();
        const args={ Credentials: credentials, Club: 'bbw123'};
        const cwd = process.cwd();
        let url= cwd + '/config/wsdl/aftt.tabt.wsdl.xml';
        url='https://resultats.aftt.be/api/?wsdl';

        const p2=new Promise( (resolve, reject) => {
            soap.createClient(url /*this.afttWsld*/ , (err, client) => {
                if(client==null || client===undefined)
                {
                    logger.warn('client is null !', err);
                    resolve({data:null, err});
                }
                else
                {
                    client.GetMatches(args, (err1, result) => {
                        if(err1)
                        {
                            logger.warn('Error calling client.GetMatches', err1);
                            resolve({data:null, err: err1});
                        }
                        else
                        {
                            if(stringify)
                            {
                                const resp=JSON.stringify(result);
                                resolve({data: resp, err: null});
                            }
                            else
                            {
                                resolve({data: result, err: null});
                            }
                        }
                    });
                }
            });
        });
        return p2;
    }

    async getMembres(playerCategory: number =1, stringify: boolean = false): Promise<any>
    {
        const credentials=this.getCredentials();
        const args={ Credentials: credentials, Club: 'bbw123', ExtendedInformation: '1', PlayerCategory: playerCategory};
        const cwd = process.cwd();
        let url= cwd + '/config/wsdl/aftt.tabt.wsdl.xml';
        url='https://resultats.aftt.be/api/?wsdl';

        const p2=new Promise( (resolve, reject) => {
            soap.createClient(url /*this.afttWsld*/ , (err, client) => {
                if(client==null || client===undefined)
                {
                    logger.warn('client is null !', err);
                    resolve({data:null, err});
                }
                else
                {
                    client.GetMembers(args, (err1, result) => {
                        if(err1)
                        {
                            logger.warn('Error calling client.GetMembers', err1);
                            resolve({data:null, err: err1});
                        }
                        else
                        {
                            if(stringify)
                            {
                                const resp=JSON.stringify(result);
                                resolve({data: resp, err: null});
                            }
                            else
                            {
                                resolve({data: result, err: null});
                            }
                        }
                    });
                }
            });
        });
        return p2;
    }

}
