export class AppUtils
{
    public static stringToEnum(enumType: object, val: string): object 
    {
        // return AppUtils.keys(enumType).find( key => enumType[key] === val);

        const entries = Object.entries(enumType);
        for (const entry of entries)
        {
            if(typeof entry[1] ===  'string')
            {
                const ev: string = entry[1];
                if(ev === val)
                {
                    return entry;
                }
            }
        }
        return null;
    }
}
