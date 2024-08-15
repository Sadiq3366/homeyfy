import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import http from "../http";

const VerifyEmail = () =>{
    const location = useLocation();
    const queryParams  = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const hash = queryParams.get('hash');
    const expires = queryParams.get('expires');
    const signature = queryParams.get('signature');
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    useEffect(() => {

        if(id && hash && expires && signature){

            http.get('/email/verified?id='+id+'&hash='+hash+'&expires='+expires+'&signature='+signature).then(res=>{
                setSuccess(res.data.message);
                setError(null);
            }).catch(error=>{
                setError(error.message);
                setSuccess(null);
            })
        }

    }, [id,hash,expires,signature]);
    return(
        <div className="container mt-5 mb-5 col-md-8">
            {success ? (
                <div className="alert alert-success">
                    {success}
                </div>
            ) : error ? (
                <div className="alert alert-danger">
                    Your Verification is Expiry or Invalid
                </div>
            ) : (
                <div>
                    Email is Under Verification.....
                </div>
            )}
        </div>

    );
}

export default VerifyEmail
