"use client";

import { FormEvent } from "react";

export type VerifyRegistrationFormValues = {
  code: string;
};

type VerifyRegistrationFormProps = {
  onFormSubmit: (values: VerifyRegistrationFormValues) => void;
};

export const RegistrationVerificationForm = (
  props: VerifyRegistrationFormProps
) => {
  const { onFormSubmit } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      code: { value: string };
    };

    const code = target.code.value;

    onFormSubmit({ code });
  };

  return (
    <div className="justify-center mt-12 grid justify-items-center md:mt-20">
      <div className="h-auto bg-blue-700 rounded-xl md:rounded-3xl w-80 md:w-96">
        <div className="p-6 md:p-8">
          <h1 className="mb-6 text-3xl font-light text-white">
            Verification Code
          </h1>
          <form onSubmit={submitHandler}>
            <input
              className="block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-blue-900 text-white caret-slate-700 focus:border-white"
              id="code"
              name="code"
            />

            <button
              className="w-full h-12 mb-6 text-sm font-light text-white hover:text-blue-900 hover:bg-white bg-slate-700 rounded-md"
              type="submit"
            >
              Complete sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
