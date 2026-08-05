export const saveUser = (data) => {

    localStorage.setItem(
        "token",
        data.access_token
    );


    localStorage.setItem(
        "role",
        data.role
    );


    localStorage.setItem(
        "user",
        JSON.stringify(data)
    );

};




export const getRole = () => {

    return localStorage.getItem("role");

};




export const getToken = () => {

    return localStorage.getItem("token");

};




export const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("user");

};
