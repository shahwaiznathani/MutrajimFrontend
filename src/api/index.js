import axios from "axios";
const BASE_URL = 'http://localhost:12107/api/';

export const ENDPOINTS = {
    LOGIN: 'ApplicationUser/Login',
    REGISTER: 'ApplicationUser/UserRegister',
    PROJECT: 'Project',
    FILEUPLOAD: 'FileUpload/upload',
    TRANSLATION: 'Translation',
    KEYDISPLAY : 'FileUpload/extract?subDirectory=FileStorage',
    FILEDATAPUT : 'Translation/NewKeyValue?subDirectory=FileStorage',
    UPDATEDFILE : 'Translation/Serialize?subDirectory=FileStorage',
    DOWNLOAD : 'FileUpload/download?subDirectory=FileStorage',
    DELETE:'Translation/DeleteTable',
    EMAIL: 'Email/Send'
}


export const createApiEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';
    return{
        fetchAll : () => axios.get(url),
        fetchById : id => axios.get(url + id),
        create : newRecord => axios.post(url , newRecord),
        update : (id, updateRecord) => axios.put(url + id , updateRecord),
        delete : id => axios.delete(url + id),
        deleteAll : () => axios.delete(url)  
    }

}