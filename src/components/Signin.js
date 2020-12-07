import React, { useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';

const Signin = () => {
  const { handleSignin, inputs, setInputs, errors } = useContext(firebaseAuth);
  console.log(handleSignin);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    handleSignin();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(inputs);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Sign in
        {/* make inputs  */}
        <input
          onChange={handleChange}
          name="email"
          placeholder="email"
          value={inputs.email}
        />
        <input
          onChange={handleChange}
          name="password"
          placeholder="password"
          value={inputs.password}
        />
        <button>sign in</button>
        {errors.length > 0
          ? errors.map((error) => <p style={{ color: 'red' }}>{error}</p>)
          : null}
      </form>
    </div>
  );
};

export default Signin;
