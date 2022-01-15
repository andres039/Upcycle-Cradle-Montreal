import React, { useState } from "react";
// import Button from "components/Button";


const LoginForm = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // const validate = () => {
  //   if (email === "") {
  //     setError("Please Enter Email");
  //     return;
  //   }
  //   if (password === "") {
  //     setError("Please Enter Password");
  //     return;
  //   }
  //   setError("");
  //   props.onSave(email, password);
  // };


  // const reset = () => {
  //   setStudent("");
  //   setInterviewer("");
  //   props.onCancel();
  // };

  // const cancel = () => {
  //   reset();
  //   setError("");
  //   return <Form />;
  // };


  const handleSubmit = event => {
    event.preventDefault();
  }

  return (

    <main>
      <section className="login">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email: </label>
          <input
            className=""
            name="username"
            type="email"
            placeholder="email"


            value={email}
            onChange={(event) => setEmail(event.target.value)}

          />

          <label>Password: </label>
          <input
            className=""
            name="password"
            type="password"
            placeholder="password"


            value={password}
            onChange={(event) => setPassword(event.target.password)}
          />
        </form>

      </section>
      <section className="">
        <section className="">

          {/* <Button onClick={validate}{ your code goes here }>Login</Button> */}
          <button>Login</button>

        </section>
      </section>
    </main>
  );
};

export default LoginForm;