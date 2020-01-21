
//@Entity({name: 'auth_user'})
export class AuthUserEntity {
    //@PrimaryGeneratedColumn()
    id: number;

    //@Column({name: 'username'})
    username: string;

    //@Column({name: 'firstname'})
    firstname: string;

    //@Column({name: 'lastname'})
    lastname: string;

    //@Column({name: 'email'})
    email: string;

    //@Column({name: 'password'})
    password: string;

    //@Column({name: 'enabled'})
    enabled: boolean;

    //@OneToOne((type) => AuthUserGroupEntity, (authUserGroupEntity) => authUserGroupEntity.authUser)
    //authUserGroup: AuthUserGroupEntity;

}
