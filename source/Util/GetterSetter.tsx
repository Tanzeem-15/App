let userDetails: { [key: string]: string } = {};

export const _setUserInfo = (data: { [key: string]: string }) => {
    userDetails = data;
}

export const _getUserInfo = () => {
    return userDetails;
}