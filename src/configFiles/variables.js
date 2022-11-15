

export const variables =  process.env.NODE_ENV === 'production' ?
{
    BACKEND_URL:  "https://braedens-backend-development.azurewebsites.net/api/" ,
    // this key specifically can only be used by certain urls
    MAPBOX_ACCESS_TOKEN: "pk.eyJ1IjoidGltbXl0dXJuZXIxMDEiLCJhIjoiY2w5MG9idXF1MDBmejN1bXF3N200MzZsaiJ9.shZvkoIVU-ruhxwfGQ6d9w",
    // TODO: make sure this is fine to be public
    AZURE_AD_LOGIN_CLIENT_ID : "1e4aa098-20bc-41c4-b241-f7ea399f7961"
} :
{
    BACKEND_URL:  import.meta.env.VITE_BACKEND_URL ,
    MAPBOX_ACCESS_TOKEN:  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    AZURE_AD_LOGIN_CLIENT_ID : "1e4aa098-20bc-41c4-b241-f7ea399f7961"
}