import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LoginContext } from '../App';
import { useHistory } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import Image from "../assets/koya-logo.svg";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const LoginStatus = useContext(LoginContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const onSubmit = () => {
    fetch("http://localhost:3001/api/user/login", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.message === "user match") {
          LoginStatus.setLogStatus(true);
          LoginStatus.setUserEmail(email);
          console.log(LoginStatus.EmailUser);
          history.push("/admin");
        } else {
          console.log("erreur");
        }
      });

  };
  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>

                <input placeholder="Enter you email" type="email" {...register("email", { required: true, onChange: (e) => setEmail(e.target.value), pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}/>
                {errors.email && <span>Votre adresse email n'est pas valide</span>}
                <input placeholder="Enter your password" type="password" {...register("password", { required: true, onChange: (e) => setPassword(e.target.value) })} />
                {errors.password && <span>Votre mot de passe est trop court</span>}
                <button className="button" type="submit">Se connecter</button>
            </form> */}
      {/* New form */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={Image}
              alt="Koya"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            </p>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input {...register("email", { required: true, onChange: (e) => setEmail(e.target.value), pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && <span>Votre adresse email n'est pas valide</span>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input {...register("password", { required: true, onChange: (e) => setPassword(e.target.value) })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && <span>Votre mot de passe est trop court</span>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                /> */}
                {/* <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label> */}
              </div>

              {/* <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div> */}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;