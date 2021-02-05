import React, { FormEvent } from 'react';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import successIcon from '../img/success.png';

interface IFormNewsletter {
    email: string;
    emailProvider: string;
    dateCreated: number;
    check: any;
}

const FormNewsletter: React.FC = () => {
    
    const [isVisible, setIsVisible] = useState(false)

    const { register, handleSubmit, errors, formState } = useForm<IFormNewsletter>();

    const onSubmit = (data: IFormNewsletter) => {

        data.emailProvider = data.email.split('@')[1];
        data.dateCreated = Math.round((new Date()).getTime() / 1000);

        axios.post('http://localhost/mb-backend/api/create', {
            email: data.email,
            emailProvider: data.emailProvider,
            dateCreated: data.dateCreated
          })
          .then(() => {
            setIsVisible(true)
          }, (error) => {
            console.log(error);
          });
    };

    const submitForm = () => {
        
    }
    
    return (

        <React.Fragment>
            <div className="success-div" style={{ display: isVisible ? "block" : "none" }}>
                <img src={successIcon} alt=""/>

                <h1 className="h1-thanks">Thanks for subscribing!</h1>
                <div className="intro-text intro-success">
                    You have successfully subscribed to our email listing. Check your email for the discount code.
                </div>
            </div>

            <div className="form-div" style={{ display: isVisible ? "none" : "block" }}>
                <h1>Subscribe to newsletter</h1>
                <div className="intro-text">
                    Subscribe to our newsletter and get 10% discount on pineapple glasses.
                </div>

                <div className="form-box">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="input-box">

                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <div className="error-box">{message}</div>}
                            />

                            <input ref={register({
                                required: "Email is required",
                                pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                                }
                            })}
                            className="newsletter"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Type your email address here…" />
                            <button disabled={formState.isSubmitting} type="submit" className="submit" name="submit" id="submit"><BsArrowRight className="submit-arrow" /></button>
                        </div>


                        <div className="tos-box">
                            <ErrorMessage
                                errors={errors}
                                name="tos"
                                render={({ message }) => <div className="error-box">{message}</div>}
                            />
                            <label className="check-container">
                                <input id="myCheck" name="tos" type="checkbox" ref={register({
                                    required: "You have to accept the terms of service"
                                })} />
                                <span className="checkmark"></span>
                            </label>
                            <span className="tos-label">I agree to <a href="#">terms of service</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FormNewsletter;