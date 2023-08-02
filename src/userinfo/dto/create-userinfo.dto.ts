import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUserinfoDto {
     /**
   * El cliente en Odoo.
   */
     @IsNotEmpty()
     @IsString()
     name: string;
 
   /**
    * Serial de la Onu.
    */
   @IsNotEmpty()
   @IsString()
   username: string;
 
   /**
    * Nombre de la empresa asociada (Netcom o NC)
    */
   @IsNotEmpty()
   @IsString()
   firstname: string;
 
   /**
    * ID de Wisphub.
    */
   @IsNotEmpty()
   @IsString()
   lastname: string;
 
   /**
    * Usuario que realiza el ultimo update
    */
   @IsNotEmpty()
   @IsString()
   updateby: string;
 
   /**
    * Usuario que crea el registro
    */
   @IsNotEmpty()
   @IsString()
   creationby: string;
 
 
   /***********************************************************************
    *                                                                     *
    * CAMPOS OPCIONALES                                                   *
    * Se dejan estos campos para un posible uso futuro                    *
    *                                                                     *
    ***********************************************************************/
   @IsOptional()
   @IsString()
   email: string;
 
   @IsOptional()
   @IsString()
   department: string;
 
   @IsOptional()
   @IsString()
   company: string;
 
   @IsOptional()
   @IsString()
   workphone: string;
 
   @IsOptional()
   @IsString()
   homephone: string
   
   @IsOptional()
   @IsString()
   mobilephone: string;
 
   @IsOptional()
   @IsString()
   address: string;
 
   @IsOptional()
   @IsString()
   city: string;
 
   @IsOptional()
   @IsString()
   state: string;
 
   @IsOptional()
   @IsString()
   zip: string;
 
   @IsOptional()
   @IsString()
   notes: string;
 
   @IsOptional()
   @IsString()
   changeuserinfo: string;
 
   @IsOptional()
   @IsString()
   portalloginpassword: string;
 
   @IsOptional()
   @IsNumber()
   enableportallogin: number;
 
   // RADCHECK
   @IsOptional()
   @IsString()
   value: string;
 
   // RADUSERGROUP
    /**
    * Plan asignado al cliente
    */
    @IsNotEmpty()
    @IsString()
    groupname: string;
 
    /**
    * Prioridad del cliente
    */
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    priority: number;
}
