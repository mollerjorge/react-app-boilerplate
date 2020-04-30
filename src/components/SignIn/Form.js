import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';

import { signIn } from 'actions/auth';
import Form from 'components/Form';

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = object().shape({
  email: string().email('Invalid email').required('Required'),
  password: string().required('Required'),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const [hasErrors, setHasErrors] = useState(false);
  const intl = useIntl();

  const { handleSubmit, register, errors } = useForm({
    validationSchema,
    defaultValues,
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(signIn(values));
    } catch (error) {
      setHasErrors(true);
    }
  };

  return (
    <Form data-testid="signin-form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        id="email"
        error={errors.email}
        name="email"
        type="email"
        data-testid="email-input"
        ref={register}
      />
      <Form.Input
        id="password"
        error={errors.password}
        name="password"
        type="password"
        helpLinkPath="/forgot-password"
        helpMessage={intl.messages['common.forgotPassword']}
        data-testid="password-input"
        ref={register}
      />
      <Form.Button text={intl.messages['common.signIn']} />
      {hasErrors && (
        <p>
          <FormattedMessage id="common.errorMessage" />
        </p>
      )}
    </Form>
  );
};

export default SignInForm;
