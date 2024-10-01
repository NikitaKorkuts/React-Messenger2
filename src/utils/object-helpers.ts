export const updateObjectInArray = (items: any, itemId: number, objPropName: string, newObjProps: object) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps};
        }
        return u;
    });
};