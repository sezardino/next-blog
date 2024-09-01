"use client";

const LoginPage = () => {
  // const { isLoaded, signIn, setActive } = useSignIn();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();

  // // Handle the submission of the sign-in form
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   if (!isLoaded) {
  //     return;
  //   }

  //   // Start the sign-in process using the email and password provided
  //   try {
  //     const signInAttempt = await signIn.create({
  //       identifier: email,
  //       password,
  //     });

  //     // If sign-in process is complete, set the created session as active
  //     // and redirect the user
  //     if (signInAttempt.status === "complete") {
  //       await setActive({ session: signInAttempt.createdSessionId });
  //       router.push("/");
  //     } else {
  //       // If the status is not complete, check why. User may need to
  //       // complete further steps.
  //       console.error(JSON.stringify(signInAttempt, null, 2));
  //     }
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error(JSON.stringify(err, null, 2));
  //   }
  // };

  // Display a form to capture the user's email and password
  return (
    <>
      <h1>Sign in</h1>
      {/* <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
          />
        </div>
        <button type="submit">Sign in</button>
      </form> */}
    </>
  );
};

export default LoginPage;
